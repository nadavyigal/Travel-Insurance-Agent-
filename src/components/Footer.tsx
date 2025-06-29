import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Shield className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-alef font-bold">דקלה</span>
            </div>
            <p className="text-gray-300 font-alef mb-6 max-w-md">
              {t('footerTagline')}
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@dikla-insurance.co.il</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-alef font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors font-alef text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-400 transition-colors font-alef text-sm">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary-400 transition-colors font-alef text-sm">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-300 hover:text-primary-400 transition-colors font-alef text-sm">
                  {t('legal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Telegram */}
          <div>
            <h3 className="font-alef font-semibold mb-4">יצירת קשר</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>03-1234567</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>תל אביב, ישראל</span>
              </div>
              <a
                href="https://t.me/dikla_insurance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 space-x-reverse text-sm text-primary-400 hover:text-primary-300 transition-colors mt-4"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.896 6.728-1.268 8.368-1.268 8.368-.159.708-.589.708-.589.708s-1.009-.159-2.677-1.059c-.918-.496-1.635-.918-1.943-1.268-.159-.159-.318-.318-.159-.636.318-.636 2.677-2.677 4.351-4.351.636-.636.318-1.009-.318-.636-2.677 1.635-5.513 3.589-6.289 4.032-.636.318-1.268.159-1.268.159s-1.427-.477-3.104-1.059c-1.677-.636-3.104-1.059-3.104-1.059s-.477-.318.318-.636c.795-.318 8.686-3.589 8.686-3.589s3.589-1.427 4.351-1.635c.636-.159 1.427-.318 1.427.636z"/>
                </svg>
                <span>{t('telegramLink')}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm font-alef text-center md:text-right">
              {t('copyright')}
            </p>
            <p className="text-gray-400 text-xs font-alef text-center md:text-right max-w-md">
              {t('legalText')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;