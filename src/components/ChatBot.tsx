import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../utils/openai';
import { logChatToSheets } from '../utils/googleSheets';

interface ChatBotProps {
  leadUuid?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ leadUuid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'שלום! אני דקלה, הסוכנת הדיגיטלית שלכם לביטוח נסיעות. איך אוכל לעזור לכם היום?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to chat
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);

    try {
      // Get AI response
      const response = await sendChatMessage([
        ...messages.filter(m => m.role !== 'system'),
        { role: 'user', content: userMessage }
      ]);

      // Add AI response to chat
      const updatedMessages: ChatMessage[] = [
        ...newMessages,
        { role: 'assistant', content: response }
      ];
      setMessages(updatedMessages);

      // Log to Google Sheets
      try {
        await logChatToSheets(userMessage, response, leadUuid);
      } catch (logError) {
        console.error('Failed to log chat:', logError);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = 'מצטער, אירעה שגיאה. אנא נסה שוב או צור קשר בטלפון 03-1234567';
      setMessages([
        ...newMessages,
        { role: 'assistant', content: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="פתח צ'אט עם דקלה"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="font-alef font-medium text-sm hidden sm:block">Ask Dikla</span>
          <span className="text-lg">🤖</span>
          <MessageCircle className="w-5 h-5" />
        </div>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-t-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="font-alef font-semibold">דקלה - סוכנת ביטוח</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <div className="flex-1">
                      <p className="text-sm font-alef leading-relaxed text-right">
                        {message.content}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-gray-300' : 'bg-white/20'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-3 h-3 text-gray-600" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-3 rounded-2xl">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="flex space-x-1 space-x-reverse">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm font-alef">דקלה כותבת...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-2 rounded-lg hover:from-primary-700 hover:to-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="שאל אותי על ביטוח נסיעות..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;