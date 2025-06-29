import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'he';
type Direction = 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  he: {
    // Navigation
    home: 'בית',
    faq: 'שאלות נפוצות',
    privacy: 'מדיניות פרטיות',
    legal: 'הודעה משפטית',
    
    // Hero Section
    heroTitle: 'ביטוח נסיעות בראש שקט',
    heroSubtitle: 'הגנה מקיפה על המסע שלך מנתב"ג. כיסוי רפואי, ביטול נסיעה, אובדן מזוודות ותמיכה 24/7 בכל העולם.',
    getQuote: 'קבל הצעת מחיר',
    learnMore: 'למד עוד',
    
    // Stats
    monthlyQuotes: '150+',
    monthlyQuotesLabel: 'הצעות חודשיות',
    conversionRate: '22%',
    conversionLabel: 'שיעור המרה',
    avgPremium: '₪45',
    avgPremiumLabel: 'פרמיה ממוצעת',
    
    // Comparison
    comparisonTitle: 'השוואת מבטחים',
    coverage: 'כיסוי רפואי',
    price: 'מחיר',
    support: 'תמיכה',
    claims: 'תביעות',
    rating: 'דירוג',
    
    // Social Proof
    socialProofTitle: 'מה הלקוחות שלנו אומרים',
    
    // FAQ
    faqTitle: 'שאלות נפוצות',
    
    // Form
    formTitle: 'קבל הצעת מחיר מותאמת אישית',
    name: 'שם מלא',
    email: 'כתובת אימייל',
    phone: 'מספר טלפון',
    destination: 'יעד הנסיעה',
    travelDates: 'תאריכי נסיעה',
    submit: 'שלח בקשה',
    
    // Footer
    footerTagline: 'נסע חכם. נסע מוגן.',
    copyright: '© 2025 דקלה ביטוח נסיעות. כל הזכויות שמורות.',
    legalText: 'דקלה ביטוח נסיעות בע"מ מורשית ומפוקחת על ידי רשות שוק ההון, הביטוח והחיסכון.',
    telegramLink: 'הצטרף לערוץ הטלגרם שלנו',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language] = useState<Language>('he');
  const direction: Direction = 'rtl';

  const toggleLanguage = () => {
    // Keep Hebrew only as requested
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['he']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      <div dir={direction} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};