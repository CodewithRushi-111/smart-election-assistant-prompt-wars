import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import LanguageModal from './LanguageModal';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Smart Election Assistant</h1>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">{t('home')}</Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">{t('dashboard')}</Link>
          <Link to="/candidates" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">{t('candidates')}</Link>
          <Link to="/booth" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">{t('booth_finder')}</Link>
          
          <button 
            onClick={() => setIsLangModalOpen(true)}
            className="ml-4 px-3 py-1 text-sm font-semibold border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
          >
            <Globe size={14} />
            {i18n.language.toUpperCase()}
          </button>
        </nav>
      </div>
      <LanguageModal 
        isOpen={isLangModalOpen} 
        onClose={() => setIsLangModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
