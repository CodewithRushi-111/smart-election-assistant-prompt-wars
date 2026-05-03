import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', script: 'English' },
  { code: 'hi', label: 'Hindi', script: 'हिंदी' },
  { code: 'bn', label: 'Bengali', script: 'বাংলা' },
  { code: 'te', label: 'Telugu', script: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', script: 'தமிழ்' }
];

const LanguageModal = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();

  const handleLanguageSelect = (code) => {
    i18n.changeLanguage(code);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-3xl shadow-2xl z-[70] overflow-hidden"
          >
            <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Select Language</h3>
                  <p className="text-sm text-indigo-100">Choose your preferred tongue</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`flex flex-col items-start p-4 rounded-2xl border-2 transition-all ${
                    i18n.language === lang.code 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-100 hover:border-indigo-200 bg-white'
                  }`}
                >
                  <span className="text-sm text-gray-500 mb-1">{lang.label}</span>
                  <span className={`text-lg font-bold ${
                    i18n.language === lang.code ? 'text-indigo-600' : 'text-gray-900'
                  }`}>
                    {lang.script}
                  </span>
                </motion.button>
              ))}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-gray-500 font-medium">More languages coming soon...</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LanguageModal;
