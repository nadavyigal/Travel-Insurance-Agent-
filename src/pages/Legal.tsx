import React from 'react';
import { Scale, AlertTriangle, FileCheck, Info } from 'lucide-react';

const Legal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
            <Scale className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-alef font-bold text-gray-900 mb-4">
            הודעה משפטית
          </h1>
          <p className="text-lg text-gray-600 font-alef">
            תנאי שירות ומידע משפטי
          </p>
        </div>

        {/* Legal Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Company Information */}
          <section>
            <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
              <h2 className="text-2xl font-alef font-bold text-gray-900">
                מידע על החברה
              </h2>
              <Info className="w-6 h-6 text-primary-600" />
            </div>
            <div className="bg-gray-50 rounded-lg p-6 space-y-2 text-gray-700 font-alef text-right">
              <p><strong>שם החברה:</strong> דקלה ביטוח נסיעות בע"מ</p>
              <p><strong>מספר רישום:</strong> 514123456</p>
              <p><strong>מורשה על ידי:</strong> רשות שוק ההון, הביטוח והחיסכון</p>
              <p><strong>מספר רישיון:</strong> INS-2024-789</p>
              <p><strong>כתובת:</strong> שדרות רוטשילד 123, תל אביב, ישראל</p>
              <p><strong>טלפון:</strong> 03-1234567</p>
              <p><strong>אימייל:</strong> legal@dikla-insurance.co.il</p>
            </div>
          </section>

          {/* Terms of Service */}
          <section>
            <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
              <h2 className="text-2xl font-alef font-bold text-gray-900">
                תנאי שירות
              </h2>
              <FileCheck className="w-6 h-6 text-primary-600" />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-alef font-semibold text-gray-900 mb-2 text-right">
                  1. קבלת התנאים
                </h3>
                <p className="text-gray-600 font-alef leading-relaxed text-right">
                  על ידי גישה ושימוש באתר ובשירותים שלנו, אתם מקבלים ומסכימים להיות מחויבים לתנאים והוראות של הסכם זה. תנאים אלה חלים על כל משתמשי האתר, כולל דפדפנים, ספקים, לקוחות, סוחרים ותורמי תוכן.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-alef font-semibold text-gray-900 mb-2 text-right">
                  2. רישיון שימוש
                </h3>
                <p className="text-gray-600 font-alef leading-relaxed text-right">
                  ניתן רישיון לגשת זמנית לאתר שלנו לצפייה אישית, לא מסחרית וזמנית בלבד. זהו מתן רישיון, לא העברת בעלות, ותחת רישיון זה אינכם רשאים:
                </p>
                <ul className="list-disc list-inside text-gray-600 font-alef mt-2 space-y-1 text-right">
                  <li>לשנות או להעתיק את החומרים</li>
                  <li>להשתמש בחומרים למטרות מסחריות או לתצוגה ציבורית</li>
                  <li>לנסות להנדס לאחור תוכנה הכלולה באתר שלנו</li>
                  <li>להסיר הודעות זכויות יוצרים או קנייניות מהחומרים</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-alef font-semibold text-gray-900 mb-2 text-right">
                  3. שירותי ביטוח
                </h3>
                <p className="text-gray-600 font-alef leading-relaxed text-right">
                  מוצרי הביטוח שלנו מבוטחים על ידי חברות ביטוח מורשות. כל הכיסוי כפוף לתנאים, התניות והחרגות המפורטות בפוליסת הביטוח בפועל. אתר זה מספק מידע כללי בלבד ואינו מהווה ייעוץ או המלצה לרכישת מוצר ביטוח מסוים.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-alef font-semibold text-gray-900 mb-2 text-right">
                  4. פרטיות והגנת מידע
                </h3>
                <p className="text-gray-600 font-alef leading-relaxed text-right">
                  הפרטיות שלכם חשובה לנו. האיסוף והשימוש שלנו במידע אישי כפוף למדיניות הפרטיות שלנו, המשולבת בהפניה בתנאי שירות אלה.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-alef font-semibold text-gray-900 mb-2 text-right">
                  5. הגבלת אחריות
                </h3>
                <p className="text-gray-600 font-alef leading-relaxed text-right">
                  בשום מקרה לא יהיו דקלה ביטוח נסיעות בע"מ או ספקיה אחראים לכל נזק (כולל, ללא הגבלה, נזקים בגין אובדן נתונים או רווח, או עקב הפרעה לעסק) הנובע מהשימוש או חוסר היכולת להשתמש בחומרים באתר שלנו, גם אם אנו או נציגנו המורשה הודענו בעל פה או בכתב על האפשרות לנזק כזה.
                </p>
              </div>
            </div>
          </section>

          {/* Regulatory Information */}
          <section>
            <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
              <h2 className="text-2xl font-alef font-bold text-gray-900">
                מידע רגולטורי
              </h2>
              <AlertTriangle className="w-6 h-6 text-accent-600" />
            </div>
            <div className="bg-accent-50 rounded-lg p-6">
              <p className="text-gray-700 font-alef leading-relaxed mb-4 text-right">
                דקלה ביטוח נסיעות בע"מ מורשית ומפוקחת על ידי רשות שוק ההון, הביטוח והחיסכון. הרישיון שלנו מאפשר לנו למכור מוצרי ביטוח נסיעות בישראל ולספק שירותים לתושבי ישראל הנוסעים לחו"ל.
              </p>
              <p className="text-gray-700 font-alef leading-relaxed text-right">
                אם יש לכם תלונות על השירותים שלנו, תוכלו לפנות לרשות שוק ההון, הביטוח והחיסכון בכתובת:
              </p>
              <div className="mt-4 space-y-1 text-gray-700 font-alef text-right">
                <p><strong>אתר:</strong> www.insurance.gov.il</p>
                <p><strong>טלפון:</strong> *6552</p>
                <p><strong>אימייל:</strong> complaints@insurance.gov.il</p>
              </div>
            </div>
          </section>

          {/* Contact for Legal Matters */}
          <section className="bg-primary-50 rounded-lg p-6">
            <h2 className="text-2xl font-alef font-bold text-gray-900 mb-4 text-right">
              פניות משפטיות
            </h2>
            <p className="text-gray-600 font-alef leading-relaxed mb-4 text-right">
              לכל שאלה או דאגה משפטית בנוגע לתנאים אלה או לשירותים שלנו, אנא צרו קשר עם המחלקה המשפטית שלנו:
            </p>
            <div className="space-y-2 text-gray-600 font-alef text-right">
              <p>אימייל: legal@dikla-insurance.co.il</p>
              <p>טלפון: 03-1234567</p>
              <p>דואר: המחלקה המשפטית, דקלה ביטוח נסיעות בע"מ, שדרות רוטשילד 123, תל אביב, ישראל</p>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-alef">
              הודעה משפטית זו עודכנה לאחרונה ב-15 בינואר, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;