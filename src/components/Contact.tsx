import React, { useState, useRef} from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

console.log('Environment Variables:',
  '\nService ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID,
  '\nTemplate ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  '\nPublic Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY!);
console.log('EmailJS initialized');

interface FormData {
  name: string;
  email: string;
  organization: string;
  services: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    services: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      console.error('Validation error: Name is required');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      console.error('Validation error: Valid email is required');
      return false;
    }
    if (!formData.message.trim()) {
      console.error('Validation error: Message is required');
      return false;
    }
    console.log('Form validation passed');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    console.log('Form submission started');

    try {
      console.log('Sending form data:', formData);
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        form.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );
      console.log('EmailJS success:', result.text);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', organization: '', services: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      console.log('Form submission ended');
    }
  };

  // Remove the testEmailJS call from here
  

  // Function to test EmailJS configuration
  
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let's start a project together!
        </motion.h2>
        
        <motion.form 
          ref={form}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">01 What's your name?</label>
            <input type="text" name="name" id="name" required
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
              value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">02 What's your email?</label>
            <input type="email" name="email" id="email" required
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
              value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-400">03 What's the name of your organization?</label>
            <input type="text" name="organization" id="organization"
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
              value={formData.organization} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="services" className="block text-sm font-medium text-gray-400">04 What services are you looking for?</label>
            <input type="text" name="services" id="services"
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
              value={formData.services} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400">05 Your message</label>
            <textarea name="message" id="message" rows={4} required
              className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white"
              value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div>
            <button type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {submitStatus === 'success' && (
            <div className="text-green-500 text-center">Message sent successfully!</div>
          )}
          {submitStatus === 'error' && (
            <div className="text-red-500 text-center">
              Failed to send message. Please check your input and try again.
              {!formData.name.trim() && <div>Name is required.</div>}
              {(!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) && <div>Valid email is required.</div>}
              {!formData.message.trim() && <div>Message is required.</div>}
            </div>
          )}
        </motion.form>
       
      </div>
    </div>
  );
};

export default ContactSection;