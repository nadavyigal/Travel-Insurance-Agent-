import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ComparisonTable: React.FC = () => {
  const { t } = useLanguage();

  const insurers = [
    {
      name: 'אליאנץ',
      logo: 'A',
      coverage: '€50,000',
      price: '₪89',
      support: '9-17',
      claims: '14 ימים',
      rating: 3.5,
      recommended: false,
    },
    {
      name: 'דקלה',
      logo: 'ד',
      coverage: '€100,000',
      price: '₪45',
      support: '24/7',
      claims: '3 ימים',
      rating: 4.8,
      recommended: true,
    },
    {
      name: 'פספורט קארד',
      logo: 'P',
      coverage: '€75,000',
      price: '₪67',
      support: '8-20',
      claims: '7 ימים',
      rating: 4.1,
      recommended: false,
    },
    {
      name: 'הראל',
      logo: 'ה',
      coverage: '€60,000',
      price: '₪78',
      support: '9-18',
      claims: '10 ימים',
      rating: 3.8,
      recommended: false,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-alef font-bold text-gray-900 mb-4">
            {t('comparisonTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto"></div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {insurers.map((insurer, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
                insurer.recommended
                  ? 'border-primary-500 ring-2 ring-primary-100'
                  : 'border-gray-200'
              } relative`}
            >
              {insurer.recommended && (
                <div className="absolute -top-3 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-alef font-medium">
                  מומלץ
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                    insurer.recommended ? 'bg-primary-600' : 'bg-gray-600'
                  }`}>
                    {insurer.logo}
                  </div>
                  <div>
                    <h3 className="font-alef font-bold text-lg text-gray-900">{insurer.name}</h3>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      {renderStars(insurer.rating)}
                      <span className="text-sm text-gray-600 mr-1">{insurer.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{insurer.price}</div>
                  <div className="text-sm text-gray-600">לחודש</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 mb-1">{t('coverage')}</div>
                  <div className="font-medium text-gray-900">{insurer.coverage}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">{t('support')}</div>
                  <div className="font-medium text-gray-900">{insurer.support}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">{t('claims')}</div>
                  <div className="font-medium text-gray-900">{insurer.claims}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-alef font-semibold text-gray-900">
                    מבטח
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-alef font-semibold text-gray-900">
                    {t('coverage')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-alef font-semibold text-gray-900">
                    {t('price')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-alef font-semibold text-gray-900">
                    {t('support')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-alef font-semibold text-gray-900">
                    {t('claims')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-alef font-semibold text-gray-900">
                    {t('rating')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {insurers.map((insurer, index) => (
                  <tr
                    key={index}
                    className={`${
                      insurer.recommended
                        ? 'bg-primary-50 border-r-4 border-primary-500'
                        : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${
                          insurer.recommended ? 'bg-primary-600' : 'bg-gray-600'
                        }`}>
                          {insurer.logo}
                        </div>
                        <div>
                          <div className="font-alef font-semibold text-gray-900 flex items-center">
                            {insurer.name}
                            {insurer.recommended && (
                              <span className="mr-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs">
                                מומלץ
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">
                      {insurer.coverage}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-bold text-lg text-gray-900">{insurer.price}</div>
                      <div className="text-sm text-gray-600">לחודש</div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">
                      {insurer.support}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900">
                      {insurer.claims}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1 space-x-reverse mb-1">
                        {renderStars(insurer.rating)}
                      </div>
                      <div className="text-sm text-gray-600">{insurer.rating}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;