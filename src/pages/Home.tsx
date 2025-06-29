import React, { useState } from 'react';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ComparisonTable from '../components/ComparisonTable';
import BlogSection from '../components/BlogSection';
import SocialProofCarousel from '../components/SocialProofCarousel';
import FAQAccordion from '../components/FAQAccordion';
import QuoteForm from '../components/QuoteForm';
import QuoteWidget from '../components/QuoteWidget';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [isQuoteWidgetOpen, setIsQuoteWidgetOpen] = useState(false);

  const openQuoteWidget = () => setIsQuoteWidgetOpen(true);
  const closeQuoteWidget = () => setIsQuoteWidgetOpen(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-alef font-bold text-gray-900 leading-tight mb-6 text-right">
                {t('heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-alef mb-8 leading-relaxed text-right">
                {t('heroSubtitle')}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 font-alef">
                    {t('monthlyQuotes')}
                  </div>
                  <div className="text-sm text-gray-600 font-alef">{t('monthlyQuotesLabel')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent-600 font-alef">
                    {t('conversionRate')}
                  </div>
                  <div className="text-sm text-gray-600 font-alef">{t('conversionLabel')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600 font-alef">
                    {t('avgPremium')}
                  </div>
                  <div className="text-sm text-gray-600 font-alef">{t('avgPremiumLabel')}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={openQuoteWidget}
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse group"
                >
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-alef">{t('getQuote')}</span>
                </button>
                <Link
                  to="/faq"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-600 hover:text-white transition-all duration-200 text-center font-alef"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in order-1 lg:order-2">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 animate-float">
                <div className="flex items-center space-x-3 space-x-reverse mb-6">
                  <div className="text-right">
                    <h3 className="font-alef font-bold text-gray-900">הגנה על הנסיעה</h3>
                    <p className="text-sm text-gray-600 font-alef">כיסוי מקיף</p>
                  </div>
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <div className="space-y-3">
                  {['חירום רפואי', 'ביטול נסיעה', 'אובדן מזוודות', 'תמיכה 24/7'].map((item) => (
                    <div key={item} className="flex items-center space-x-2 space-x-reverse justify-end">
                      <span className="text-sm text-gray-700 font-alef">{item}</span>
                      <CheckCircle className="h-4 w-4 text-primary-600" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-50 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Blog Section */}
      <BlogSection />

      {/* Social Proof Carousel */}
      <SocialProofCarousel />

      {/* FAQ Accordion */}
      <FAQAccordion />

      {/* Quote Form */}
      <QuoteForm />

      {/* Quote Widget Modal */}
      <QuoteWidget isOpen={isQuoteWidgetOpen} onClose={closeQuoteWidget} />
    </div>
  );
};

export default Home;