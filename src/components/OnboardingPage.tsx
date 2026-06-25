import React, { useState } from 'react';
import { MOCK_PACKAGES } from '../constants';

const OnboardingPage: React.FC = () => {
  const [wizardStarted, setWizardStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentAddress: '',
    studentName: '',
    studentAge: '',
    studentGrade: '',
    studentPhoto: null as File | null,
    packageId: '',
    prefersNotifications: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, studentPhoto: e.target.files[0] }));
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
  };
  
  if (!wizardStarted) {
    return (
      <div className="relative py-20 bg-tyga-light dark:bg-black flex items-center justify-center min-h-[80vh] animate-fade-in">
         <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <img src="https://images.unsplash.com/photo-1575429323133-c75b8e4e7e4a?q=80&w=1740&auto=format&fit=crop" alt="Youth golf training" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative container mx-auto px-6 text-center max-w-4xl z-20">
          <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md p-12 rounded-2xl shadow-2xl animate-fade-in-down">
            <h1 className="text-4xl font-bold font-display tracking-tight text-tyga-dark dark:text-white sm:text-5xl mb-6">
              Begin Your Journey
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              Our training program is designed to build not just great golfers, but great individuals. Join a community focused on excellence, discipline, and sportsmanship.
            </p>
            <button
              onClick={() => setWizardStarted(true)}
              className="bg-tyga-secondary text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 button-glow"
            >
              Start Onboarding
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="py-20 flex items-center justify-center bg-tyga-light dark:bg-black min-h-[70vh] animate-fade-in">
        <div className="text-center bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-xl max-w-lg">
          <svg className="mx-auto h-16 w-16 text-tyga-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold font-display text-tyga-dark dark:text-white mt-4">Thank You for Registering!</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">We're excited to have you join the TYGA family. We'll be in touch within 24 hours to confirm the next steps.</p>
        </div>
      </div>
    );
  }

  const selectedPackage = MOCK_PACKAGES.find(p => p.id === formData.packageId);

  return (
    <div className="py-16 bg-tyga-light dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12">
          <h1 className="text-3xl font-bold font-display text-center text-tyga-dark dark:text-white mb-2">TYGA Onboarding</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Complete the steps below to get started.</p>
          
          <div className="mb-10">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between text-xs">
                    <div className={`${step >= 1 ? 'text-tyga-primary dark:text-tyga-secondary' : 'text-gray-400'}`}>Parent</div>
                    <div className={`${step >= 2 ? 'text-tyga-primary dark:text-tyga-secondary' : 'text-gray-400'}`}>Student</div>
                    <div className={`${step >= 3 ? 'text-tyga-primary dark:text-tyga-secondary' : 'text-gray-400'}`}>Package</div>
                    <div className={`${step >= 4 ? 'text-tyga-primary dark:text-tyga-secondary' : 'text-gray-400'}`}>Review</div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                    <div style={{ width: `${(step / 4) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-tyga-secondary transition-all duration-500"></div>
                </div>
              </div>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-semibold font-display text-tyga-dark dark:text-white">Step 1: Parent/Guardian Details</h2>
                <input type="text" name="parentName" placeholder="Full Name" value={formData.parentName} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-tyga-primary focus:border-tyga-primary" required />
                <input type="email" name="parentEmail" placeholder="Email Address" value={formData.parentEmail} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-tyga-primary focus:border-tyga-primary" required />
                <input type="tel" name="parentPhone" placeholder="Phone Number" value={formData.parentPhone} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-tyga-primary focus:border-tyga-primary" />
                <input type="text" name="parentAddress" placeholder="Home Address" value={formData.parentAddress} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-tyga-primary focus:border-tyga-primary" />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-semibold font-display text-tyga-dark dark:text-white">Step 2: Student Details</h2>
                <input type="text" name="studentName" placeholder="Student's Full Name" value={formData.studentName} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700" required />
                <input type="number" name="studentAge" placeholder="Age" value={formData.studentAge} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700" required />
                <input type="text" name="studentGrade" placeholder="Grade" value={formData.studentGrade} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700" required />
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student Photo (Optional)</label>
                    <input type="file" name="studentPhoto" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-tyga-primary/10 file:text-tyga-primary hover:file:bg-tyga-primary/20 dark:file:bg-tyga-secondary/20 dark:file:text-tyga-secondary"/>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-semibold font-display text-tyga-dark dark:text-white">Step 3: Package Selection</h2>
                <select name="packageId" value={formData.packageId} onChange={handleInputChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700" required>
                  <option value="" disabled>Select a package...</option>
                  {MOCK_PACKAGES.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>{pkg.name} - {pkg.lessonsPerMonth} lessons/month (${pkg.price})</option>
                  ))}
                </select>
                {selectedPackage && (
                    <div className="p-4 bg-tyga-light dark:bg-gray-800 rounded-md border-l-4 border-tyga-secondary">
                        <h3 className="font-bold text-tyga-dark dark:text-white">{selectedPackage.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{selectedPackage.description}</p>
                    </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-2xl font-semibold font-display text-tyga-dark dark:text-white">Step 4: Review & Submit</h2>
                <div className="p-6 bg-tyga-light dark:bg-gray-800 rounded-lg space-y-4 text-gray-800 dark:text-gray-200">
                    <h3 className="font-bold text-lg text-tyga-dark dark:text-white border-b dark:border-gray-700 pb-2 mb-4">Confirm Your Information</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <strong className="text-gray-500 dark:text-gray-400">Parent Name:</strong> <span>{formData.parentName}</span>
                        <strong className="text-gray-500 dark:text-gray-400">Student Name:</strong> <span>{formData.studentName}</span>
                        <strong className="text-gray-500 dark:text-gray-400">Email:</strong> <span>{formData.parentEmail}</span>
                        <strong className="text-gray-500 dark:text-gray-400">Student Age:</strong> <span>{formData.studentAge}</span>
                        <strong className="text-gray-500 dark:text-gray-400">Package:</strong> <span className="font-semibold text-tyga-primary dark:text-tyga-secondary">{selectedPackage?.name}</span>
                        <strong className="text-gray-500 dark:text-gray-400">Monthly Cost:</strong> <span className="font-semibold text-tyga-primary dark:text-tyga-secondary">${selectedPackage?.price}</span>
                    </div>
                    <div className="pt-4 space-y-3">
                        <div className="flex items-start">
                            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-tyga-secondary focus:ring-tyga-secondary border-gray-300 rounded mt-1" required />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">I agree to the terms and conditions of TYGA.</label>
                        </div>
                        <div className="flex items-start">
                            <input id="prefersNotifications" name="prefersNotifications" type="checkbox" checked={formData.prefersNotifications} onChange={handleCheckboxChange} className="h-4 w-4 text-tyga-secondary focus:ring-tyga-secondary border-gray-300 rounded mt-1" />
                            <label htmlFor="prefersNotifications" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">I would like to receive important updates via WhatsApp.</label>
                        </div>
                    </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex justify-between items-center">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white font-bold py-2 px-6 rounded-full transition-colors">
                  Back
                </button>
              ) : <div />}
              {step < 4 && (
                <button type="button" onClick={nextStep} className="bg-tyga-primary hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full ml-auto transition-colors">
                  Next
                </button>
              )}
              {step === 4 && (
                <button type="submit" className="bg-tyga-secondary hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full ml-auto transition-colors button-glow">
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;