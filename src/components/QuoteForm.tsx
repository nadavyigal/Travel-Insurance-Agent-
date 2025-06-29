import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const QuoteForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDates: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('תודה! ניצור איתך קשר תוך 24 שעות עם הצעת מחיר מותאמת אישית.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Right Side - Form Info */}
          <div className="animate-slide-up order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-alef font-bold text-gray-900 mb-6">
              {t('formTitle')}
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-right">
                  <h3 className="font-alef font-semibold text-gray-900">עיבוד מיידי</h3>
                  <p className="text-gray-600 text-sm">קבלו הצעת מחיר תוך דקות</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-accent-600" />
                </div>
                <div className="text-right">
                  <h3 className="font-alef font-semibold text-gray-900">שירות אישי</h3>
                  <p className="text-gray-600 text-sm">כיסוי מותאם לצרכים שלכם</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-primary-600">150+</div>
                <div className="text-sm text-gray-600 font-alef">{t('monthlyQuotesLabel')}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-accent-600">22%</div>
                <div className="text-sm text-gray-600 font-alef">{t('conversionLabel')}</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-primary-600">₪45</div>
                <div className="text-sm text-gray-600 font-alef">{t('avgPremiumLabel')}</div>
              </div>
            </div>
          </div>

          {/* Left Side - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                  {t('name')}
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right"
                    placeholder="יוחנן ישראלי"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                  {t('email')}
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right"
                    placeholder="yohanan@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                  {t('phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right"
                    placeholder="050-1234567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                  {t('destination')}
                </label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right"
                    placeholder="אירופה, אסיה, ארה״ב..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="travelDates" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                  {t('travelDates')}
                </label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="travelDates"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    required
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right"
                    placeholder="15 בדצמבר - 25 בדצמבר, 2024"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 px-6 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-alef">{t('submit')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;