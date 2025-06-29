import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FAQAccordion: React.FC = () => {
  const { t } = useLanguage();
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: "מה כולל ביטוח הנסיעות?",
      answer: "ביטוח הנסיעות שלנו כולל כיסוי רפואי מקיף, ביטול נסיעה, אובדן מזוודות, עיכובי טיסות ותמיכה 24/7 בכל העולם. הכיסוי המדויק תלוי בתוכנית שתבחרו."
    },
    {
      question: "כמה זמן לוקח לקבל כיסוי?",
      answer: "תוכלו לקבל כיסוי מיידי תוך דקות מרכישת הפוליסה. הפלטפורמה הדיגיטלית שלנו מאפשרת לכם לרכוש ולקבל את מסמכי הפוליסה מיד באימייל."
    },
    {
      question: "מה העלות הממוצעת של הכיסוי?",
      answer: "הפרמיה הממוצעת שלנו היא ₪45, מה שהופך אותנו לאחת האפשרויות הזולות ביותר בישראל. העלות המדויקת תלויה ביעד, משך הנסיעה, גיל ורמת הכיסוי שנבחרת."
    },
    {
      question: "האם אתם מכסים מצבים רפואיים קיימים?",
      answer: "כן, אנו מציעים כיסוי למצבים רפואיים קיימים בתוכניות המקיפות שלנו. יש להצהיר על מצבים אלה בעת הרכישה וייתכן שיידרש תיעוד נוסף."
    },
    {
      question: "איך מגישים תביעה?",
      answer: "ניתן להגיש תביעות דרך האפליקציה שלנו, האתר או בטלפון לקו החם 24/7. אנו מעבדים את רוב התביעות תוך 3-5 ימי עסקים ומספקים עדכונים שוטפים על סטטוס התביעה."
    },
    {
      question: "האם ספורט אתגרי מכוסה?",
      answer: "פעילויות ספורט בסיסיות כמו טיולי רגל ושנורקלינג מכוסות. לפעילויות בסיכון גבוה כמו צניחה או טיפוס הרים, תזדקקו לתוספת כיסוי ספורט אתגרי שלנו."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-alef font-bold text-gray-900 mb-4">
            {t('faqTitle')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-right flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 ml-4">
                  {openItem === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary-600" />
                  )}
                </div>
                <h3 className="font-alef font-semibold text-gray-900 text-right">
                  {faq.question}
                </h3>
              </button>
              
              {openItem === index && (
                <div className="px-6 pb-5 animate-fade-in">
                  <p className="text-gray-600 font-alef leading-relaxed text-right">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;