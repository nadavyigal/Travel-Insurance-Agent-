# Chatbot Customization Guide

This guide explains how to customize Dikla, your AI-powered travel insurance chatbot.

## Quick Start

The chatbot's behavior is controlled by two main components in `src/utils/openai.ts`:

1. **SYSTEM_PROMPT** - Defines Dikla's personality and behavior
2. **FAQ_KNOWLEDGE** - Pre-loaded knowledge base

## 1. Modifying Chatbot Personality

Edit the `SYSTEM_PROMPT` in `src/utils/openai.ts`:

```typescript
const SYSTEM_PROMPT = `You are Dikla, a licensed Israeli travel-insurance agent. Answer in concise Hebrew...`;
```

### Examples of Personality Changes:

#### More Friendly and Casual:
```typescript
const SYSTEM_PROMPT = `You are Dikla, a friendly travel insurance advisor who speaks in warm, conversational Hebrew. Use emojis occasionally 😊. Be approachable and make insurance feel less intimidating...`;
```

#### More Professional and Formal:
```typescript
const SYSTEM_PROMPT = `You are Dikla, a senior travel insurance consultant. Maintain a professional tone in formal Hebrew. Always address customers respectfully using "אדון/גברת"...`;
```

#### Bilingual Support (Hebrew/English):
```typescript
const SYSTEM_PROMPT = `You are Dikla, a bilingual travel insurance agent. Detect the language of the question and respond in the same language (Hebrew or English). Default to Hebrew if unclear...`;
```

## 2. Adding Knowledge to the Chatbot

Edit the `FAQ_KNOWLEDGE` section to add more information:

```typescript
const FAQ_KNOWLEDGE = `
שאלות נפוצות על ביטוח נסיעות:

// Add new questions here:
7. האם יש הנחות למשפחות?
כן, אנו מציעים הנחות משפחתיות של עד 20% עבור 3 נוסעים או יותר.

8. מה לגבי ביטוח לנשים בהריון?
אנו מכסים נשים בהריון עד שבוע 32, כולל סיבוכי הריון בלתי צפויים.

9. האם אפשר לשנות תאריכים אחרי הרכישה?
כן, ניתן לשנות תאריכי נסיעה עד 24 שעות לפני היציאה ללא עלות נוספת.
`;
```

## 3. Changing Initial Greeting

Edit the initial message in `src/components/ChatBot.tsx`:

```typescript
const [messages, setMessages] = useState<ChatMessage[]>([
  {
    role: 'assistant',
    content: 'שלום! אני דקלה, הסוכנת הדיגיטלית שלכם לביטוח נסיעות. איך אוכל לעזור לכם היום?'
  }
]);
```

### Alternative Greetings:

```typescript
// Warmer greeting
content: 'היי! 👋 אני דקלה, והיום אני כאן כדי לעזור לכם למצוא את ביטוח הנסיעות המושלם. לאן אתם טסים?'

// Professional greeting
content: 'ברוכים הבאים לשירות הייעוץ לביטוח נסיעות. אני דקלה, היועצת שלכם. במה אוכל לסייע?'

// Time-based greeting
content: new Date().getHours() < 12 ? 
  'בוקר טוב! אני דקלה. איך אוכל לעזור לכם עם ביטוח הנסיעות?' : 
  'ערב טוב! אני דקלה. איך אוכל לעזור לכם עם ביטוח הנסיעות?'
```

## 4. Advanced Customizations

### A. Adding Context Awareness

To make Dikla aware of lead information:

```typescript
export async function sendChatMessage(messages: ChatMessage[], leadInfo?: any): Promise<string> {
  const contextPrompt = leadInfo ? `
    Customer Information:
    - Name: ${leadInfo.full_name}
    - Destination: ${leadInfo.destination}
    - Travel Dates: ${leadInfo.departure_date} to ${leadInfo.return_date}
    Use this information to personalize responses.
  ` : '';

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT + contextPrompt + '\n\n' + FAQ_KNOWLEDGE },
      ...messages
    ],
    // ... rest of config
  });
}
```

### B. Adding Specific Response Templates

Add templates for common scenarios:

```typescript
const RESPONSE_TEMPLATES = `
Response Templates:

FOR PRICE QUESTIONS:
"המחיר המדויק תלוי במספר גורמים כמו יעד, משך הנסיעה וגיל הנוסעים. הפרמיה הממוצעת שלנו היא ₪45. אשמח לתת לכם הצעת מחיר מדויקת - מלאו את הטופס ונחזור אליכם תוך דקות."

FOR COVERAGE QUESTIONS:
"הביטוח שלנו כולל: [list relevant coverage]. רוצים לשמוע עוד פרטים על כיסוי ספציפי?"

FOR CLAIM QUESTIONS:
"להגשת תביעה: 1) היכנסו לאפליקציה/אתר 2) מלאו טופס תביעה 3) צרפו מסמכים 4) נטפל תוך 48 שעות. צריכים עזרה? התקשרו 03-1234567"
`;
```

### C. Adjusting Response Length and Style

```typescript
// For shorter responses
max_tokens: 200,  // Instead of 500
temperature: 0.5, // More focused responses

// For more creative responses
temperature: 0.9, // More varied responses
```

### D. Adding Custom Commands

You can add special commands that trigger specific responses:

```typescript
// In sendChatMessage function, before API call:
if (userMessage.toLowerCase().includes('מחיר') || userMessage.toLowerCase().includes('עלות')) {
  return 'הפרמיה הממוצעת שלנו היא ₪45 לנסיעה. למחיר מדויק, מלאו את הטופס למעלה ונחזור אליכם עם הצעה אישית תוך דקות ספורות.';
}

if (userMessage.toLowerCase().includes('emergency') || userMessage.includes('חירום')) {
  return '🚨 למקרי חירום בחו"ל: +972-3-1234567 (24/7). שמרו את המספר הזה!';
}
```

## 5. Testing Your Changes

After making changes:

1. Save the file
2. Refresh your browser
3. Open the chatbot and test with relevant questions
4. Check the browser console for any errors

## 6. Best Practices

1. **Keep responses concise** - Users prefer quick, clear answers
2. **Use Hebrew primarily** - Your target audience is Israeli
3. **Include CTAs** - Guide users to fill the form when appropriate
4. **Test edge cases** - Try questions in English, typos, etc.
5. **Monitor chat logs** - Review Google Sheets logs to improve responses

## 7. Common Customizations

### Adding Company-Specific Information:
```typescript
const COMPANY_INFO = `
Company Details:
- Phone: 03-1234567
- Email: info@dikla-insurance.co.il
- Hours: Sunday-Thursday 9:00-18:00
- Emergency Line: Available 24/7
- License: Israeli Insurance License #12345
`;
```

### Adding Seasonal Promotions:
```typescript
const CURRENT_PROMOTIONS = `
Current Promotions:
- 15% discount for bookings made 30+ days in advance
- Family package: 20% off for 3+ travelers
- Student discount: 10% off with valid student ID
`;
```

### Adding Destination-Specific Advice:
```typescript
const DESTINATION_ADVICE = `
Popular Destinations:
- Thailand: Recommend comprehensive medical coverage due to motorbike risks
- USA: Emphasize high medical costs, minimum $1M coverage recommended
- Europe: Mention EHIC card but stress additional coverage needed
- South America: Highlight adventure sports coverage options
`;
```

## 8. Troubleshooting

### Chatbot not responding:
1. Check OpenAI API key in `.env` file
2. Verify API key has sufficient credits
3. Check browser console for errors

### Responses in wrong language:
- Add language detection to SYSTEM_PROMPT
- Explicitly state "Answer in Hebrew" in prompt

### Responses too long/short:
- Adjust `max_tokens` parameter
- Modify SYSTEM_PROMPT to request "concise" or "detailed" answers

### Chatbot giving incorrect information:
- Update FAQ_KNOWLEDGE with correct information
- Add clarifications to SYSTEM_PROMPT
- Consider adding fact-checking instructions

## Need Help?

For additional customization support:
- Review OpenAI documentation: https://platform.openai.com/docs
- Check the chat logs in Google Sheets for user patterns
- Test changes incrementally to identify what works best 