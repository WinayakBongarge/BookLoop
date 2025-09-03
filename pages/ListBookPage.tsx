
import React, { useState, useContext } from 'react';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { AppContext } from '../contexts/AppContext';

const ListBookPage: React.FC = () => {
    const context = useContext(AppContext);
    const [step, setStep] = useState(1);
    const steps = ['Book Info', 'Pricing & Photos', 'Review & Publish'];

    // Form state
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('Like New');
    const [pricePerDay, setPricePerDay] = useState('15');

    const nextStep = () => setStep(s => Math.min(s + 1, steps.length));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const handlePublish = () => {
        if (!title || !author || !synopsis || !category || !pricePerDay) {
            alert('Please go back and fill all required fields in Step 1 and 2.');
            return;
        }
        context?.addBook({
            title,
            author,
            synopsis,
            category,
            isbn,
            pricePerDay: parseInt(pricePerDay, 10),
            condition,
            coverUrl: `https://picsum.photos/seed/${isbn || title}/400/600`,
        });
        alert('Your book has been listed successfully!');
        context?.navigate('myBooks');
    };

    const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input {...props} className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface placeholder-gray-400" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-surface p-4 sm:p-8 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-2">List a New Book</h1>
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
                <div className="animate-fade-in space-y-4">
                    <InputField label="Title" type="text" placeholder="e.g., The Psychology of Money" value={title} onChange={e => setTitle(e.target.value)} required />
                    <InputField label="Author" type="text" placeholder="e.g., Morgan Housel" value={author} onChange={e => setAuthor(e.target.value)} required />
                    <InputField label="ISBN (Optional)" type="text" placeholder="e.g., 9780857197689" value={isbn} onChange={e => setIsbn(e.target.value)} />
                    <InputField label="Category" type="text" placeholder="e.g., Finance, Self-Help" value={category} onChange={e => setCategory(e.target.value)} required />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Synopsis</label>
                        <textarea id="description" placeholder="A brief summary of the book..." rows={4} className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface placeholder-gray-400" value={synopsis} onChange={e => setSynopsis(e.target.value)} required></textarea>
                    </div>
                    <div className="text-right mt-6">
                        <Button onClick={nextStep}>Next: Pricing</Button>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="animate-fade-in space-y-4">
                     <div>
                       <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Book Condition</label>
                        <select id="condition" value={condition} onChange={e => setCondition(e.target.value)} className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface">
                            <option>New</option>
                            <option>Like New</option>
                            <option>Good</option>
                            <option>Acceptable</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per day</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                            <input type="number" placeholder="15" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} className="w-full p-3 pl-7 border border-neutral-medium rounded-lg bg-surface text-on-surface placeholder-gray-400" required/>
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
                        <h2 className="text-2xl font-semibold mb-2">You're All Set!</h2>
                        <p className="text-gray-700">Review your listing details and publish to make it available for others to rent.</p>
                         <div className="mt-4 flex items-center justify-center">
                            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" defaultChecked/>
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the <a href="#" className="font-medium text-primary hover:underline">Lender Terms</a>.
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button onClick={prevStep} variant="secondary">Back</Button>
                        <Button onClick={handlePublish}>Publish Listing</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListBookPage;