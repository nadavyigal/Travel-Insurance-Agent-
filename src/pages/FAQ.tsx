import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: "מה כולל ביטוח הנסיעות?",
      answer: "ביטוח הנסיעות המקיף שלנו כולל חירומים רפואיים, ביטול נסיעה, אובדן מזוודות, עיכובי טיסות ומספק סיוע חירום 24/7 בכל העולם. פרטי הכיסוי הספציפיים תלויים בתוכנית שתבחרו."
    },
    {
      question: "כמה מהר אני יכול לקבל כיסוי?",
      answer: "תוכלו לקבל כיסוי מיידי תוך דקות מרכישת הפוליסה. הפלטפורמה הדיגיטלית שלנו מאפשרת לכם לרכוש ולקבל את מסמכי הפוליסה מיד באימייל."
    },
    {
      question: "מה העלות הממוצעת של הכיסוי?",
      answer: "הפרמיה הממוצעת שלנו היא ₪45, מה שהופך אותנו לאחת האפשרויות הזולות ביותר בישראל. העלות המדויקת תלויה ביעד שלכם, משך הנסיעה, גיל ורמת הכיסוי שנבחרת."
    },
    {
      question: "האם אתם מכסים מצבים רפואיים קיימים?",
      answer: "כן, אנו מציעים כיסוי למצבים רפואיים קיימים בתוכניות המקיפות שלנו. עליכם להצהיר על מצבים אלה בעת הרכישה וייתכן שיידרש תיעוד נוסף."
    },
    {
      question: "איך מגישים תביעה?",
      answer: "ניתן להגיש תביעות דרך האפליקציה הנייד שלנו, האתר או בטלפון לקו החם 24/7. אנו מעבדים את רוב התביעות תוך 5-7 ימי עסקים ומספקים עדכונים שוטפים על סטטוס התביעה."
    },
    {
      question: "האם ספורט אתגרי מכוסה?",
      answer: "ספורט אתגרי בסיסי כמו טיולי רגל ושנורקלינג מכוסה. לפעילויות בסיכון גבוה כמו צניחה או טיפוס הרים, תזדקקו לתוספת כיסוי ספורט אתגרי שלנו."
    },
    {
      question: "האם אני יכול לבטל את הפוליסה שלי?",
      answer: "כן, תוכלו לבטל את הפוליסה תוך 14 יום מהרכישה לקבלת החזר מלא (אם עדיין לא נסעתם). לאחר תקופה זו, תנאי הביטול משתנים בהתאם לסוג הפוליסה."
    },
    {
      question: "האם אתם מכסים הוצאות הקשורות לקורונה?",
      answer: "כן, הפוליסות שלנו כוללות כיסוי קורונה לטיפול רפואי, הוצאות בידוד והפרעה לנסיעה עקב בעיות הקשורות לקורונה, בכפוף לתנאי הפוליסה."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-alef font-bold text-gray-900 mb-4">
            שאלות נפוצות
          </h1>
          <p className="text-lg text-gray-600 font-alef max-w-2xl mx-auto">
            מצאו תשובות לשאלות נפוצות על פוליסות ביטוח הנסיעות והשירותים שלנו.
          </p>
        </div>

        {/* FAQ Items */}
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

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-alef font-bold text-gray-900 mb-4">
            עדיין יש לכם שאלות?
          </h2>
          <p className="text-gray-600 font-alef mb-6">
            צוות שירות הלקוחות הידידותי שלנו כאן לעזור לכם 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:03-1234567"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors font-alef"
            >
              התקשרו: 03-1234567
            </a>
            <a
              href="mailto:info@dikla-insurance.co.il"
              className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors font-alef"
            >
              תמיכה באימייל
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;