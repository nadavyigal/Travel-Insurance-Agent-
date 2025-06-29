import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  content: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'ski-japan-2025',
    title: 'המדריך השלם לביטוח סקי ביפן 2025',
    description: 'כל מה שצריך לדעת על ביטוח סקי ביפן – עלויות, כיסויים, וטיפים לחוויה בטוחה בהאקובה וניסקו.',
    keywords: ['ביטוח סקי יפן', 'ביטוח חורף יפן', 'חרמון יפן', 'הרחבת סקי'],
    date: '2025-01-15',
    readTime: '5 דקות קריאה',
    content: `
# המדריך השלם לביטוח סקי ביפן 2025

> **TL;DR:** יפן היא חלום לסקי – אבל גם לבית-חולים יקר. אל תמריאו בלי פוליסה מותאמת *סקי וחורף*.

## למה בכלל צריך ביטוח סקי ביפן?
- **הוצאות רפואיות גבוהות** – אמבולנס-אויר להוקאידו ≈ ¥1,400,000  
- **הפרשי זמן**: תמיכה 24/7 בעברית מצמצמת לחץ  
- **פינוי מהרכבלים** עשוי לחייב חילוץ בהליקופטר

## עלויות ממוצעות 2025

| סוג כיסוי | עלות יומית (₪) | השתתפות עצמית |
|-----------|----------------|----------------|
| בסיסי (ללא סקי) | 6-8 | ₪0 |
| **סקי-סטנדרט** | 15-22 | ₪0-250 |
| פרימיום (Off-Piste + ציוד) | 28-35 | ₪0 |

> **טיפ חיסכון:** הזמינו עד 30 יום מראש – רוב החברות מעניקות 10%-15% הנחה.

## מה לבדוק לפני שסוגרים פוליסה

### 1. תקרות חירום רפואי
חפשו מינימום €500k; פציעות ברגיל עולות כ-€40k.

### 2. הגבלת "Off-Piste"
מתכוונים ל-**ניסקו Backcountry**? ודאו שאין החרגה לרכבי שלג.

### 3. כיסוי ציוד אישי
- סקי / סנובורד עד ₪5,000  
- מצלמות GoPro וכו' – הרחבה ייעודית

### 4. ביטול השתתפות-עצמית בהשכרת סקי
חשוב כששוכרים דרך SkiJapan או Rhythm.

## צ'ק-ליסט יום-לפני-הטיסה
- צילום דרכון + פוליסה ב-WhatsApp
- סריקה QR של מרפאות בהאקובה
- עדכון *"Nadav Travel Bot"* עם תאריכים

## סיכום ו-CTA
> רוצים הצעת מחיר מיידית? **לחצו כאן** או שלחו "סקי יפן" ל-WhatsApp bot ותקבלו 3 חלופות מותאמות תוך 30 שניות.
    `
  },
  {
    id: 'digital-nomad-portugal',
    title: 'Digital Nomad בפורטוגל? כך בוחרים ביטוח נסיעות שנתי',
    description: 'מדריך לנודדים דיגיטליים בפורטוגל – כיסויים הכרחיים, ביטוח מחשוב, וסוגיות מס.',
    keywords: ['ביטוח נסיעות שנתי', 'digital nomad ביטוח', 'ביטוח נוודים פורטוגל'],
    date: '2025-01-12',
    readTime: '4 דקות קריאה',
    content: `
# Digital Nomad בפורטוגל? כך בוחרים ביטוח שנתי

פורטוגל היא ה-Mecca של הנודדים הדיגיטליים: ויזה D8, קהילות בליסבון ו-Porto.io, ואינטרנט 1 Gbps.  
אבל מה עם **ביטוח רפואי וציוד** לשנה שלמה בחו"ל?

## כיסויים מיוחדים לנודד דיגיטלי

### בריאות מתמשכת
- רופא אונליין 24/7 (עברית/אנגלית)  
- ביקור חירום עד €1M  
- COVID-19 עדיין נדרש ב-ויזה D8 (2025)

### ביטוח מחשוב ו-Electronics

| פריט | תקרה מומלצת (₪) |
|------|-----------------|
| MacBook Pro 14" | 10,000 |
| iPhone 15 Pro | 5,000 |
| DJI Mini 4 Pro | 4,000 |

### אחריות מקצועית
הרחבה פרו-בונו לפרילנסרים מול לקוחות EU.

## מחשבון מס-ישראל ⇄ פורטוגל
בדקו *Non-Habitual Resident* – ייתכן פטור חלקי והכרח תעודה A1 (ביטוח לאומי).

## איך משווים פוליסות שנתיות?
1. הגדירו *Days-Per-Trip* – לרוב 90 ימים ברצף  
2. דרשו **"חזרה לארץ" בלתי-מוגבלת**  
3. ודאו כיסוי ציוד ≥ ₪25k

## סיכום
> הזינו את פרטי הנוודות ב-Form החכם ("Digital Nomad") וקבלו מחיר שנתי תוך 3 שניות – או השיבו "נודד" לבוט.
    `
  },
  {
    id: 'credit-card-gaps',
    title: '5 פערים בפוליסות חינם של כרטיסי אשראי – ומה עושים',
    description: 'למה ביטוח נסיעות חינם בכרטיס אשראי לא תמיד מספיק? חמש דוגמאות אמיתיות ופתרונות.',
    keywords: ['ביטוח נסיעות חינם', 'כרטיס אשראי ביטוח', 'פערי כיסוי נסיעות'],
    date: '2025-01-10',
    readTime: '3 דקות קריאה',
    content: `
# 5 פערים בפוליסות "חינם" של כרטיסי אשראי

כולם אוהבים חינם, אבל כשמדובר בבריאות מעבר לים – ⚠️ זה עלול לעלות ביוקר.

## 1. תקרות רפואיות נמוכות
כרטיסים רבים מגבילים ל-$50k; פציעה בארה״ב יכולה להגיע ל-$180k.

## 2. **קורונה**? לא כלול
רוב הפוליסות החינמיות מקזזות --> נדרש Upgrade בתשלום.

## 3. ספורט וסקי – מוחרג
לילות בחרמון? אין החזר עבור פינוי Heli.

## 4. גילאי 65+ – השתתפות עצמית גבוהה
עד $2,500 השתתפות + הפרמיה קופצת פי 3.

## 5. ביטול טיסה מסיבה רפואית
נחשב "Extra" בלבד – 4% מערך הכרטיס.

### פתרון מהיר

| צורך | הרחבה בתשלום (₪) |
|------|-----------------|
| ספורט/סקי | 18-30 ליום |
| קורונה | 6-9 ליום |
| ביטול נסיעה | 3% מסך חופשה |

## השוואת-על: חינם VS. פרימיום

| פרמטר | חינם (Visa) | פרימיום (PassportCard) |
|--------|-------------|-------------------------|
| תקרת רפואה | $50k | *ללא הגבלה* |
| השתתפות עצמית | $50 | 0 |
| תשלום מהרשפון | החזר | כרטיס מיידי |

> עדיין מתלבטים? השאירו פרטים בטופס החכם וקבלו טבלת השוואה אישית PDF ישירות ל-WhatsApp.
    `
  },
  {
    id: 'family-insurance-savings',
    title: 'ביטוח נסיעות למשפחה מרובת-ילדים – איך לחסוך 30%',
    description: 'טיפים והרחבות למחירי ביטוח נסיעות כשנוסעים עם 3 ילדים ויותר.',
    keywords: ['ביטוח נסיעות משפחה', 'ביטוח לילדים', 'הנחות משפחתיות'],
    date: '2025-01-08',
    readTime: '4 דקות קריאה',
    content: `
# ביטוח נסיעות למשפחה מרובת-ילדים – איך לחסוך 30%

נוסעים 5 נפשות? כל שקל חשוב. הנה שיטות 2025 לחתוך עלויות בלי להתפשר על כיסוי.

## השוואת תעריפים – דוגמה עדכנית

| חברה | זוג + 2 | זוג + 4 | פער ₪ |
|------|---------|---------|-------|
| AIG משפחתי | 148 | 230 | 82 |
| PassportCard "+Child" | 162 | 212 | **50** |
| הראל "קידס" | 155 | 260 | 105 |

## טריקים בקופות החולים
- כללית / מכבי מעניקות 10%-12% הנחה לחבילות משפחתיות  
- קוד קופון *family2025* בשירות on-line מקזז ₪25

## "ילד רביעי חינם" – איפה זה עובד?
בדקו סעיף *Free Child* עד גיל 18; בחלק מהפוליסות זה ילד 3 בלבד.

## הרחבות חשובות למשפחות
1. **ביטול טיסה עקב מחלת ילד**  
2. עיכוב מטען × 5  
3. coverage ל-Baby-Sitter חירום

## Check-List לפני רכישה
- איחוד תאריכי יציאה/חזרה – חוסך ₪40-60  
- צילום מרשמים קבועים ב-WhatsApp  
- סריקת דרכונים ב-Bot להסרת טעויות-איות

> לקבלת הצעת מחיר משפחתית ב-30 שניות – שלחו "משפחה" לבוט או מלאו יעד+תאריכים בטופס.
    `
  },
  {
    id: 'extreme-sports-insurance',
    title: 'ספורט אקסטרים? אלו הרחבות חובה לפני הטיסה',
    description: 'מדריך מהיר לביטוח ספורט קיצוני – סקי, צלילה חופשית, טיפוס הרים ועוד.',
    keywords: ['ביטוח ספורט אקסטרים', 'הרחבת ביטוח סקי', 'צלילה ביטוח'],
    date: '2025-01-05',
    readTime: '3 דקות קריאה',
    content: `
# ספורט אקסטרים? אלו הרחבות חובה לפני הטיסה

אקסטרים = **סיכון** + **חיוך גדול**. בלי הרחבה מתאימה – עלול להיגמר בחוב אסטרונומי.

## חרמון VS. האלפים – מדד סיכון

| יעד | פינוי Heli (€) | ביטוח אקסטרים (€) |
|-----|----------------|-------------------|
| חרמון | 3,500 | 18 ליום |
| שאמוני | 6,500 | 28 ליום |
| ניסקו (יפן) | 7,800 | 32 ליום |

## הרחבות קריטיות
1. **Search & Rescue** – כיסוי עד €50k  
2. **Third-Party Liability** – נזק לצד ג' בעת צלילה/גלישה  
3. **ציוד אקסטרים** – אופניים/גלשן עד ₪12k

## איך מחשבים עלות?

כשבוחרים ביטוח ספורט אקסטרים, העלות תלויה ברמת הסיכון:
- **רמת סיכון גבוהה**: €30-35 ליום
- **רמת סיכון בינונית**: €18-25 ליום
- **רמת סיכון נמוכה**: €10-15 ליום

> לקבלת הצעת מחיר מותאמת לספורט האקסטרים שלכם – השאירו פרטים בטופס או שלחו "אקסטרים" לבוט.
    `
  }
];

const Blog: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown parser for the blog content
    let html = content;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 font-alef">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 font-alef">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 font-alef">$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/\*(.*)\*/g, '<em class="italic">$1</em>');
    
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2">• $1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-r-4 border-primary-500 pr-4 my-4 text-gray-700 italic">$1</blockquote>');
    
    // Tables
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(cell => cell.trim());
      const isHeader = cells.some(cell => cell.includes('---'));
      if (isHeader) return '';
      
      const cellHtml = cells.map(cell => `<td class="border px-4 py-2">${cell.trim()}</td>`).join('');
      return `<tr>${cellHtml}</tr>`;
    });
    
    // Wrap tables
    html = html.replace(/(<tr>.*<\/tr>)/gs, '<table class="min-w-full border-collapse border border-gray-300 my-4">$1</table>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">');
    html = '<p class="mb-4 text-gray-700 leading-relaxed">' + html + '</p>';
    
    return html;
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 mb-8 transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-alef">חזרה לכל הפוסטים</span>
          </button>
          
          <article className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-alef mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                <span className="flex items-center space-x-1 space-x-reverse">
                  <Calendar className="h-4 w-4" />
                  <span className="font-alef">{formatDate(selectedPost.date)}</span>
                </span>
                <span className="font-alef">{selectedPost.readTime}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedPost.keywords.map(keyword => (
                  <span key={keyword} className="flex items-center space-x-1 space-x-reverse bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    <Tag className="h-3 w-3" />
                    <span className="font-alef">{keyword}</span>
                  </span>
                ))}
              </div>
            </div>
            
            <div 
              className="prose max-w-none text-right font-alef"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedPost.content) }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 font-alef mb-4">בלוג ביטוח נסיעות</h1>
          <p className="text-xl text-gray-600 font-alef">מדריכים, טיפים ומידע חשוב לנוסעים</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 font-alef mb-3 hover:text-primary-600 transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-600 font-alef mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span className="font-alef">{formatDate(post.date)}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-alef">{post.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.keywords.slice(0, 2).map(keyword => (
                    <span key={keyword} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-alef">
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200">
                  <span className="font-alef">קרא עוד</span>
                  <ArrowRight className="h-4 w-4 mr-2" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 