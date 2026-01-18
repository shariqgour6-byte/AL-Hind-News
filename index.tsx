import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
  isRTL: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, isRTL }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            {item.source}
          </span>
          <span className="bg-emerald-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-tight flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {item.timestamp || 'Breaking Now'}
        </div>
        
        <h3 className={`text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors ${isRTL ? 'font-arabic text-2xl' : 'font-sans'}`}>
          {item.title}
        </h3>
        
        <p className={`text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 ${isRTL ? 'font-arabic text-base opacity-90' : 'font-sans'}`}>
          {item.summary}
        </p>
        
        <div className="mt-auto">
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-emerald-600 font-bold text-sm group-hover:gap-4 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isRTL ? 'إقرأ المزيد' : 'Read Full Story'}
            <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
