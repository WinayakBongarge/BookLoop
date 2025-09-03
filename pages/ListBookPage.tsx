
import React, { useState } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';

const ListBookPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const steps = ['Book Info', 'Pricing & Photos', 'Review & Publish'];

    const nextStep = () => setStep(s => Math.min(s + 1, steps.length));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input {...props} className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface placeholder-gray-400" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-surface p-4 sm:p-8 rounded-xl shadow-xl">
            <h1 className="text-3xl font-montserrat font-bold text-center mb-2">List a New Book</h1>
            <p className="text-center text-gray-500 mb-8">Follow the steps to get your book listed for others to rent.</p>

            <div className="w-full px-4 sm:px-8 mb-8">
              <div className="flex items-center">
                {steps.map((s, index) => (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > index + 1 ? 'bg-primary text-white' : step === index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {step > index + 1 ? <Icon name="check" /> : index + 1}
                      </div>
                      <p className={`mt-2 text-xs text-center ${step >= index + 1 ? 'text-primary font-semibold' : 'text-gray-500'}`}>{s}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-1 h-1 ${step > index + 1 ? 'bg-primary' : 'bg-gray-200'}`}></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {step === 1 && (
                <div className="animate-fade-in">
                    <div className="space-y-4">
                        <InputField label="ISBN, Title, or Author" type="text" placeholder="e.g., 978-0143450932" />
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea id="description" placeholder="A brief summary of the book..." rows={4} className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface placeholder-gray-400"></textarea>
                        </div>
                        <div>
                           <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                            <select id="condition" className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface">
                                <option>Select Condition</option>
                                <option>New</option>
                                <option>Like New</option>
                                <option>Good</option>
                                <option>Acceptable</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-right mt-6">
                        <Button onClick={nextStep}>Next: Pricing</Button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="animate-fade-in">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price per day</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                <input type="number" placeholder="20" className="w-full p-3 pl-7 border border-neutral-medium rounded-lg bg-surface text-on-surface placeholder-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Security Deposit (Optional)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                <input type="number" placeholder="100" className="w-full p-3 pl-7 border border-neutral-medium rounded-lg bg-surface text-on-surface placeholder-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                <Icon name="cloud_upload" className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600"><p className="pl-1">Upload a file or drag and drop</p></div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button onClick={prevStep} variant="secondary">Back</Button>
                        <Button onClick={nextStep}>Next: Publish</Button>
                    </div>
                </div>
            )}
             {step === 3 && (
                <div className="animate-fade-in">
                    <div className="text-center p-8 bg-neutral-light rounded-lg">
                        <Icon name="check_circle_outline" className="text-primary text-6xl mx-auto mb-4" />
                        <h2 className="text-2xl font-montserrat font-semibold mb-2">You're All Set!</h2>
                        <p className="text-gray-700">Review your listing details and publish to make it available for others to rent.</p>
                         <div className="mt-4 flex items-center justify-center">
                            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the <a href="#" className="font-medium text-primary hover:underline">Lender Terms</a>.
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button onClick={prevStep} variant="secondary">Back</Button>
                        <Button onClick={() => alert('Book Listed!')}>Publish Listing</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListBookPage;
