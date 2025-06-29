import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-alef font-bold text-gray-900 mb-4">
            מדיניות פרטיות
          </h1>
          <p className="text-lg text-gray-600 font-alef">
            עודכן לאחרונה: ינואר 2025
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-alef font-bold text-gray-900 mb-4 text-right">
              מבוא
            </h2>
            <p className="text-gray-600 font-alef leading-relaxed text-right">
              בדקלה ביטוח נסיעות ("אנחנו", "שלנו" או "אותנו"), אנו מחויבים להגן על הפרטיות והמידע האישי שלכם. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, חושפים ומגנים על המידע שלכם כאשר אתם מבקרים באתר שלנו או משתמשים בשירותים שלנו.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
              <h2 className="text-2xl font-alef font-bold text-gray-900">
                מידע שאנו אוספים
              </h2>
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-alef font-semibold text-gray-900 mb-2 text-right">
                  מידע אישי
                </h3>
                <p className="text-gray-600 font-alef leading-relaxed text-right">
                  אנו אוספים מידע אישי שאתם מספקים לנו ישירות, כגון:
                </p>
                <ul className="list-disc list-inside text-gray-600 font-alef mt-2 space-y-1 text-right">
                  <li>שם, כתובת אימייל ומספר טלפון</li>
                  <li>תאריכי נסיעה ויעדים</li>
                  <li>מידע תשלום (מעובד בצורה מאובטחת על ידי ספקי צד שלישי)</li>
                  <li>מידע רפואי הרלוונטי לכיסוי הביטוח שלכם</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-alef font-semibold text-gray-900 mb-2 text-right">
                  מידע שנאסף אוטומטית
                </h3>
                <p className="text-gray-600 font-alef leading-relaxed text-right">
                  אנו אוספים אוטומטית מידע מסוים על המכשיר והשימוש שלכם, כולל:
                </p>
                <ul className="list-disc list-inside text-gray-600 font-alef mt-2 space-y-1 text-right">
                  <li>כתובת IP וסוג דפדפן</li>
                  <li>מידע מכשיר ומערכת הפעלה</li>
                  <li>נתוני שימוש באתר וניתוחים</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
              <h2 className="text-2xl font-alef font-bold text-gray-900">
                כיצד אנו משתמשים במידע שלכם
              </h2>
              <Eye className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-gray-600 font-alef leading-relaxed mb-4 text-right">
              אנו משתמשים במידע שאנו אוספים כדי:
            </p>
            <ul className="list-disc list-inside text-gray-600 font-alef space-y-2 text-right">
              <li>לספק ולשפר את שירותי הביטוח שלנו</li>
              <li>לעבד את בקשות הביטוח והתביעות שלכם</li>
              <li>לתקשר איתכם לגבי הפוליסות והשירותים שלכם</li>
              <li>לעמוד בדרישות חוקיות ורגולטוריות</li>
              <li>לזהות ולמנוע הונאה</li>
              <li>לשלוח לכם תקשורת שיווקית (בהסכמתכם)</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center space-x-3 space-x-reverse mb-4 justify-end">
              <h2 className="text-2xl font-alef font-bold text-gray-900">
                אבטחת מידע
              </h2>
              <Lock className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-gray-600 font-alef leading-relaxed text-right">
              אנו מיישמים אמצעי אבטחה טכניים וארגוניים מתאימים כדי להגן על המידע האישי שלכם מפני גישה לא מורשית, שינוי, חשיפה או הרס. אמצעים אלה כוללים הצפנה, שרתים מאובטחים והערכות אבטחה קבועות.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-alef font-bold text-gray-900 mb-4 text-right">
              הזכויות שלכם
            </h2>
            <p className="text-gray-600 font-alef leading-relaxed mb-4 text-right">
              על פי חוק הפרטיות הישראלי, יש לכם זכות:
            </p>
            <ul className="list-disc list-inside text-gray-600 font-alef space-y-2 text-right">
              <li>לגשת למידע האישי שלכם</li>
              <li>לתקן מידע לא מדויק או לא שלם</li>
              <li>למחוק את המידע האישי שלכם (בכפוף לדרישות חוקיות)</li>
              <li>להתנגד או להגביל פעילויות עיבוד מסוימות</li>
              <li>לבטל הסכמה כאשר העיבוד מבוסס על הסכמה</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="bg-primary-50 rounded-lg p-6">
            <h2 className="text-2xl font-alef font-bold text-gray-900 mb-4 text-right">
              צרו קשר
            </h2>
            <p className="text-gray-600 font-alef leading-relaxed mb-4 text-right">
              אם יש לכם שאלות על מדיניות פרטיות זו או ברצונכם לממש את זכויותיכם, אנא צרו איתנו קשר:
            </p>
            <div className="space-y-2 text-gray-600 font-alef text-right">
              <p>אימייל: privacy@dikla-insurance.co.il</p>
              <p>טלפון: 03-1234567</p>
              <p>כתובת: תל אביב, ישראל</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;