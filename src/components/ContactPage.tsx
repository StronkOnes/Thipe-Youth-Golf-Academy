

import React, { useState } from 'react';
import { WhatsAppIcon } from './icons';

const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Contact form submitted:', formState);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="py-20 bg-tyga-light dark:bg-black transition-colors duration-300 animate-fade-in">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in-down">
                    <h1 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-5xl">Get In Touch</h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">We'd love to hear from you. Reach out with any questions or inquiries.</p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        {isSubmitted ? (
                             <div className="flex items-center justify-center h-full p-4 text-center bg-green-50 dark:bg-green-900/50 rounded-lg" role="alert">
                                <div>
                                    <h2 className="text-2xl font-bold font-display mb-2 text-green-800 dark:text-green-300">Message Sent!</h2>
                                    <p className="text-green-700 dark:text-green-400">Thank you for contacting us. We will get back to you shortly.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <input type="text" name="name" id="name" required value={formState.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-tyga-primary focus:border-tyga-primary p-3 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" name="email" id="email" required value={formState.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-tyga-primary focus:border-tyga-primary p-3 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                                    <input type="text" name="subject" id="subject" required value={formState.subject} onChange={handleChange} className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-tyga-primary focus:border-tyga-primary p-3 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <textarea name="message" id="message" rows={5} required value={formState.message} onChange={handleChange} className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-tyga-primary focus:border-tyga-primary p-3 bg-gray-50 dark:bg-gray-800 dark:text-white"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-tyga-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tyga-primary transition-colors button-glow">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    {/* Info Block */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-6 bg-tyga-light dark:bg-gray-800 rounded-lg shadow-md">
                           <h3 className="text-xl font-bold font-display text-tyga-dark dark:text-white mb-4 border-b dark:border-gray-700 pb-2">Contact Information</h3>
                           <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> Zodwa Khoza Centre, Soweto, South Africa</p>
                           <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> info@tygachamps.co.za</p>
                           <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> (123) 456-7890</p>
                            <a href="https://wa.me/27123456789" target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-500 hover:bg-green-600 transition-colors">
                                <WhatsAppIcon className="h-6 w-6" />
                                <span>Message on WhatsApp</span>
                            </a>
                        </div>
                         <div className="p-6 bg-tyga-light dark:bg-gray-800 rounded-lg shadow-md">
                           <h3 className="text-xl font-bold font-display text-tyga-dark dark:text-white mb-2">Find Us</h3>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.579047970866!2d27.8541603150289!3d-26.14519598346395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a1a10d9a6c7b%3A0x6b2b5f5b6a7b2e3c!2sZodwa%20Khoza%20Foundation!5e0!3m2!1sen!2sus!4v1689882930987!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="dark:grayscale dark:invert"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;