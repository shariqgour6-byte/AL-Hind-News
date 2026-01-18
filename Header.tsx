import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  onRefresh: () => void;
  isRTL: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentLang, setLang, onRefresh, isRTL }) => {
  const languages = [
    { code: Language.ENGLISH, label: 'English', native: 'English' },
    { code: Language.HINDI, label: 'Hindi', native: 'हिन्दी' },
    { code: Language.ARABIC, label: 'Arabic', native: 'العربية' },
    { code: Language.URDU, label: 'Urdu', native: 'اردو' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg text-white shadow-lg shadow-emerald-200">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
              Al Hind <span className="text-emerald-600">News</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] -mt-1">
              Global Truth
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  currentLang === l.code 
                    ? 'bg-white text-emerald-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {l.native}
              </button>
            ))}
          </div>
          
          {/* Mobile Lang Selector */}
          <select 
            className="md:hidden bg-slate-100 border-none rounded-lg text-sm px-2 py-1"
            value={currentLang}
            onChange={(e) => setLang(e.target.value as Language)}
          >
            {languages.map(l => <option key={l.code} value={l.code}>{l.native}</option>)}
          </select>

          <button 
            onClick={onRefresh}
            className="p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            title="Refresh News"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
