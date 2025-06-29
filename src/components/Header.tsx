import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import QuoteWidget from './QuoteWidget';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteWidgetOpen, setIsQuoteWidgetOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: 'בלוג', href: '/blog' },
    { name: t('faq'), href: '/faq' },
    { name: t('privacy'), href: '/privacy' },
    { name: t('legal'), href: '/legal' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const openQuoteWidget = () => {
    setIsQuoteWidgetOpen(true);
    setIsMenuOpen(false);
  };

  const closeQuoteWidget = () => setIsQuoteWidgetOpen(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-alef font-bold text-gray-900">דקלה</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 space-x-reverse">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-alef font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <button
                onClick={openQuoteWidget}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-alef font-medium hover:bg-primary-700 transition-colors"
              >
                {t('getQuote')}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-primary-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pb-3 pt-2 animate-fade-in">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-alef font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={openQuoteWidget}
                  className="block w-full mt-4 bg-primary-600 text-white px-3 py-2 rounded-md text-base font-alef font-medium hover:bg-primary-700 transition-colors text-center"
                >
                  {t('getQuote')}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Quote Widget Modal */}
      <QuoteWidget isOpen={isQuoteWidgetOpen} onClose={closeQuoteWidget} />
    </>
  );
};

export default Header;