import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, MapPin, Plane } from 'lucide-react';
import { submitLeadToSheets, startRetryMechanism } from '../utils/googleSheets';
import Toast from './Toast';

interface QuoteWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  full_name: string;
  phone: string;
  email: string;
  departure_date: string;
  return_date: string;
  destination: string;
  consent: boolean;
}

interface FormErrors {
  full_name?: string;
  phone?: string;
  email?: string;
  departure_date?: string;
  return_date?: string;
  destination?: string;
  consent?: string;
}

const QuoteWidget: React.FC<QuoteWidgetProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone: '',
    email: '',
    departure_date: '',
    return_date: '',
    destination: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  }>({
    message: '',
    type: 'success',
    isVisible: false,
  });

  // Start retry mechanism on component mount
  useEffect(() => {
    startRetryMechanism();
  }, []);

  // Listen for N8N webhook failures
  useEffect(() => {
    const handleN8NFailure = (event: CustomEvent) => {
      setToast({
        message: event.detail.message,
        type: 'success', // Still show as success since the lead was saved
        isVisible: true
      });
    };

    window.addEventListener('n8n_webhook_failed', handleN8NFailure as EventListener);
    
    return () => {
      window.removeEventListener('n8n_webhook_failed', handleN8NFailure as EventListener);
    };
  }, []);

  // Phone number validation pattern
  const phonePattern = /^05\d{8}$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'שם מלא הוא שדה חובה';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'מספר טלפון הוא שדה חובה';
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון חייב להיות בפורמט 05XXXXXXXX';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'כתובת אימייל היא שדה חובה';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    if (!formData.departure_date) {
      newErrors.departure_date = 'תאריך יציאה הוא שדה חובה';
    }

    if (!formData.return_date) {
      newErrors.return_date = 'תאריך חזרה הוא שדה חובה';
    }

    if (formData.departure_date && formData.return_date) {
      const departureDate = new Date(formData.departure_date);
      const returnDate = new Date(formData.return_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (departureDate < today) {
        newErrors.departure_date = 'תאריך יציאה חייב להיות בעתיד';
      }

      if (returnDate <= departureDate) {
        newErrors.return_date = 'תאריך חזרה חייב להיות אחרי תאריך היציאה';
      }
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'יעד הנסיעה הוא שדה חובה';
    }

    if (!formData.consent) {
      newErrors.consent = 'יש לאשר העברת פרטים';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLeadToSheets(formData);
      
      if (result.success) {
        setToast({
          message: 'מעולה! נחזור אליך תוך שעה',
          type: 'success',
          isVisible: true
        });
        
        // Reset form
        setFormData({
          full_name: '',
          phone: '',
          email: '',
          departure_date: '',
          return_date: '',
          destination: '',
          consent: false,
        });
        
        // Close modal after short delay
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setToast({
          message: 'הבקשה נשמרה ותישלח בהקדם האפשרי',
          type: 'success',
          isVisible: true
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setToast({
        message: 'אירעה שגיאה. אנא נסו שוב מאוחר יותר',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-xl font-alef font-bold text-gray-900">
              קבל הצעת מחיר
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                שם מלא *
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right ${
                    errors.full_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="יוחנן ישראלי"
                  disabled={isSubmitting}
                />
              </div>
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-600 font-alef text-right">{errors.full_name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                מספר טלפון *
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0501234567"
                  disabled={isSubmitting}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 font-alef text-right">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                כתובת אימייל *
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="yohanan@example.com"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 font-alef text-right">{errors.email}</p>
              )}
            </div>

            {/* Departure Date */}
            <div>
              <label htmlFor="departure_date" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                תאריך יציאה *
              </label>
              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  id="departure_date"
                  name="departure_date"
                  value={formData.departure_date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right ${
                    errors.departure_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              {errors.departure_date && (
                <p className="mt-1 text-sm text-red-600 font-alef text-right">{errors.departure_date}</p>
              )}
            </div>

            {/* Return Date */}
            <div>
              <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                תאריך חזרה *
              </label>
              <div className="relative">
                <Plane className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  id="return_date"
                  name="return_date"
                  value={formData.return_date}
                  onChange={handleInputChange}
                  min={formData.departure_date || new Date().toISOString().split('T')[0]}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right ${
                    errors.return_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              {errors.return_date && (
                <p className="mt-1 text-sm text-red-600 font-alef text-right">{errors.return_date}</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2 font-alef text-right">
                יעד הנסיעה *
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className={`w-full pr-10 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-alef text-right ${
                    errors.destination ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="אירופה, אסיה, ארה״ב..."
                  disabled={isSubmitting}
                />
              </div>
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600 font-alef text-right">{errors.destination}</p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                <span className={`text-sm font-alef text-right flex-1 ${
                  errors.consent ? 'text-red-600' : 'text-gray-700'
                }`}>
                  אני מסכים/ה להעברת פרטיי לדקלה *
                </span>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className={`w-4 h-4 text-primary-600 border-2 rounded focus:ring-primary-500 ${
                    errors.consent ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
              </label>
              {errors.consent && (
                <p className="mt-1 text-sm text-red-600 font-alef text-right">{errors.consent}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-3 px-6 rounded-lg font-medium hover:from-primary-700 hover:to-accent-700 transition-all duration-200 font-alef disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'שולח...' : 'שלח בקשה'}
            </button>
          </form>
        </div>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </>
  );
};

export default QuoteWidget;