import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'ski-japan-2025',
    title: 'המדריך השלם לביטוח סקי ביפן 2025',
    description: 'כל מה שצריך לדעת על ביטוח סקי ביפן – עלויות, כיסויים, וטיפים לחוויה בטוחה',
    date: '2025-01-15',
    readTime: '5 דקות'
  },
  {
    id: 'digital-nomad-portugal',
    title: 'Digital Nomad בפורטוגל? כך בוחרים ביטוח שנתי',
    description: 'מדריך לנודדים דיגיטליים בפורטוגל – כיסויים הכרחיים וסוגיות מס',
    date: '2025-01-12',
    readTime: '4 דקות'
  },
  {
    id: 'credit-card-gaps',
    title: '5 פערים בפוליסות חינם של כרטיסי אשראי',
    description: 'למה ביטוח נסיעות חינם בכרטיס אשראי לא תמיד מספיק?',
    date: '2025-01-10',
    readTime: '3 דקות'
  },
  {
    id: 'family-insurance-savings',
    title: 'ביטוח נסיעות למשפחה – איך לחסוך 30%',
    description: 'טיפים והרחבות למחירי ביטוח נסיעות כשנוסעים עם 3 ילדים ויותר',
    date: '2025-01-08',
    readTime: '4 דקות'
  },
  {
    id: 'extreme-sports-insurance',
    title: 'ספורט אקסטרים? הרחבות חובה לפני הטיסה',
    description: 'מדריך מהיר לביטוח ספורט קיצוני – סקי, צלילה, טיפוס הרים ועוד',
    date: '2025-01-05',
    readTime: '3 דקות'
  }
];

const BlogSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-alef mb-4">
            מדריכים וטיפים לביטוח נסיעות
          </h2>
          <p className="text-lg text-gray-600 font-alef">
            כל המידע שאתם צריכים כדי לטוס בראש שקט
          </p>
        </div>

        <div className="overflow-x-auto pb-6 -mx-4 px-4">
          <div className="flex space-x-6 space-x-reverse w-max">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to="/blog"
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="h-8 w-8 text-primary-600" />
                    <span className="text-sm text-gray-500 font-alef">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-alef mb-3 group-hover:text-primary-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 font-alef mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center space-x-1 space-x-reverse">
                      <Calendar className="h-4 w-4" />
                      <span className="font-alef">
                        {new Date(post.date).toLocaleDateString('he-IL', { 
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </span>
                    <span className="text-primary-600 group-hover:text-primary-700 transition-colors duration-200 flex items-center space-x-1 space-x-reverse">
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      <span className="font-alef text-sm">קרא עוד</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 space-x-reverse bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-alef">לכל המדריכים והטיפים</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 