import React, { useState, useEffect, useCallback } from 'react';
import { Language, NewsItem, CATEGORIES, SUPPORTED_SOURCES } from './types';
import { fetchAutomatedNews } from './services/geminiService';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.ENGLISH);
  const [category, setCategory] = useState<string>('World');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [groundingLinks, setGroundingLinks] = useState<any[]>([]);

  const isRTL = lang === Language.ARABIC || lang === Language.URDU;

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAutomatedNews(lang, category);
      setNews(data.news);
      setGroundingLinks(data.sources);
    } catch (err) {
      setError("Failed to fetch news. Please check your connection or API key.");
    } finally {
      setLoading(false);
    }
  }, [lang, category]);

  useEffect(() => {
    loadNews();
    // Refresh news every 15 minutes automatically
    const interval = setInterval(loadNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, category]);

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 transition-all duration-300 ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header 
        currentLang={lang} 
        setLang={setLang} 
        onRefresh={loadNews}
        isRTL={isRTL}
      />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Categories */}
        <Sidebar 
          activeCategory={category} 
          setCategory={setCategory} 
          isRTL={isRTL}
          lang={lang}
        />

        {/* Main Feed */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b-4 border-emerald-600 pb-1">
              {category}
            </h2>
            <div className="text-sm text-slate-500 italic">
              Sources: {SUPPORTED_SOURCES.join(', ')}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {[1, 2, 4, 5].map(i => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-8 rounded-xl text-center border border-red-200">
              <p className="text-xl font-semibold mb-2">Error</p>
              <p>{error}</p>
              <button 
                onClick={loadNews}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {news.map((item) => (
                  <NewsCard key={item.id} item={item} isRTL={isRTL} />
                ))}
              </div>
              
              {/* Grounding Attribution Section */}
              {groundingLinks.length > 0 && (
                <section className="mt-16 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-700 mb-4">Verification Sources</h3>
                  <div className="flex flex-wrap gap-4">
                    {groundingLinks.map((chunk, idx) => (
                      chunk.web && (
                        <a 
                          key={idx}
                          href={chunk.web.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-900 text-sm underline decoration-emerald-200 hover:decoration-emerald-500 transition-all"
                        >
                          {chunk.web.title || `Source ${idx + 1}`}
                        </a>
                      )
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-emerald-500 mb-4 tracking-wider">AL HIND NEWS</h1>
          <p className="max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            AI-Powered News Aggregation from BBC, Al Jazeera, NYT, and more. 
            Delivering unbiased global perspectives in multiple languages.
          </p>
          <div className="text-xs uppercase tracking-widest opacity-50">
            &copy; {new Date().getFullYear()} Al Hind News Network. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
