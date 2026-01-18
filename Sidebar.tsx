import React from 'react';
import { CATEGORIES, Language } from '../types';

interface SidebarProps {
  activeCategory: string;
  setCategory: (cat: string) => void;
  isRTL: boolean;
  lang: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setCategory, isRTL, lang }) => {
  // Translations for sidebar labels
  const getCategoryLabel = (cat: string) => {
    const translations: any = {
      [Language.ARABIC]: {
        'World': 'عالمي', 'Politics': 'سياسة', 'Technology': 'تكنولوجيا', 
        'Business': 'أعمال', 'Sports': 'رياضة', 'Entertainment': 'ترفيه'
      },
      [Language.URDU]: {
        'World': 'عالمی', 'Politics': 'سیاست', 'Technology': 'ٹیکنالوجی', 
        'Business': 'کاروبار', 'Sports': 'کھیل', 'Entertainment': 'تفریح'
      },
      [Language.HINDI]: {
        'World': 'दुनिया', 'Politics': 'राजनीति', 'Technology': 'तकनीक', 
        'Business': 'व्यापार', 'Sports': 'खेल', 'Entertainment': 'मनोरंजन'
      }
    };
    return translations[lang]?.[cat] || cat;
  };

  const menuLabel = {
    [Language.ENGLISH]: 'Categories',
    [Language.HINDI]: 'श्रेणियाँ',
    [Language.ARABIC]: 'الفئات',
    [Language.URDU]: 'اقسام'
  }[lang] || 'Categories';

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-28">
        <h3 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-6 flex items-center gap-2">
          <span className="w-4 h-[2px] bg-emerald-500"></span>
          {menuLabel}
        </h3>
        <nav className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeCategory === cat ? 'bg-white' : 'bg-slate-300'}`}></span>
              {getCategoryLabel(cat)}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <div className="bg-slate-900 rounded-xl p-4 text-white">
            <p className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Live Update</p>
            <p className="text-xs text-slate-300">New content is generated automatically every 15 minutes.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
