import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// System prompt for Dikla
const SYSTEM_PROMPT = `You are Dikla, a licensed Israeli travel-insurance agent. Answer in concise Hebrew, cite Israeli Ministry of Health links when discussing medical coverage. You are knowledgeable about travel insurance, Israeli regulations, and helping customers understand their coverage options.

Key information to reference:
- Israeli Ministry of Health travel health guidelines: https://www.health.gov.il/English/Topics/Pregnancy/Vaccination_of_infants/Pages/travel.aspx
- Travel insurance is especially important for Israeli travelers due to high medical costs abroad
- Always recommend appropriate coverage based on destination and traveler profile
- Be helpful, professional, and concise in Hebrew`;

// Pre-seeded FAQ knowledge base
const FAQ_KNOWLEDGE = `
שאלות נפוצות על ביטוח נסיעות:

1. מה כולל ביטוח הנסיעות?
ביטוח הנסיעות המקיף שלנו כולל חירומים רפואיים, ביטול נסיעה, אובדן מזוודות, עיכובי טיסות ומספק סיוע חירום 24/7 בכל העולם.

2. כמה מהר אני יכול לקבל כיסוי?
תוכלו לקבל כיסוי מיידי תוך דקות מרכישת הפוליסה.

3. מה העלות הממוצעת של הכיסוי?
הפרמיה הממוצעת שלנו היא ₪45, מה שהופך אותנו לאחת האפשרויות הזולות ביותר בישראל.

4. האם אתם מכסים מצבים רפואיים קיימים?
כן, אנו מציעים כיסוי למצבים רפואיים קיימים בתוכניות המקיפות שלנו.

5. איך מגישים תביעה?
ניתן להגיש תביעות דרך האפליקציה הנייד שלנו, האתר או בטלפון לקו החם 24/7.

6. האם ספורט אתגרי מכוסה?
ספורט אתגרי בסיסי כמו טיולי רגל ושנורקלינג מכוסה. לפעילויות בסיכון גבוה תזדקקו לתוספת כיסוי.
`;

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + '\n\n' + FAQ_KNOWLEDGE },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || 'מצטער, לא הצלחתי לענות על השאלה. אנא נסה שוב.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('שגיאה בחיבור לשירות הצ\'אט. אנא נסה שוב מאוחר יותר.');
  }
}