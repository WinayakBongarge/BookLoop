

import React, { useState, useContext } from 'react';
import type { Book } from '../types';
import Button from '../components/Button';
import { AppContext } from '../contexts/AppContext';

interface RenterBookCardProps {
    book: Book;
    dueDate: string;
    onReturn: () => void;
}

const RenterBookCard: React.FC<RenterBookCardProps> = ({ book, dueDate, onReturn }) => {
    const whatsappMessage = encodeURIComponent(`Hi ${book.lenderName}, this is regarding the book "${book.title}" I rented from you on BookLoop.`);
    const whatsappUrl = `https://wa.me/91${book.lenderPhoneNumber}?text=${whatsappMessage}`;

    return (
        <div className="bg-surface rounded-lg shadow-md p-2 sm:p-3 flex items-start space-x-3 sm:space-x-4">
            <img src={book.coverUrl} alt={book.title} className="w-16 sm:w-20 h-24 sm:h-28 object-cover rounded-md" />
            <div className="flex-1 overflow-hidden">
                <h3 className="font-bold truncate">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-sm mt-2">Lender: <strong>{book.lenderName}</strong></p>
                <p className="text-sm font-bold text-red-600 mt-1">Due: {dueDate}</p>
            </div>
            <div className="flex flex-col space-y-2">
                <Button onClick={onReturn} variant="primary" className="!text-xs !px-2 !py-1.5">Return</Button>
                <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-center text-xs px-2 py-1.5 rounded-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-surface text-primary border border-primary hover:bg-primary/10 focus:ring-primary shadow-none"
                >
                    Contact
                </a>
            </div>
        </div>
    );
};

const MyRentalsPage: React.FC = () => {
    const context = useContext(AppContext);
    const { myRentedBooks, returnRental } = context!;
    const [activeTab, setActiveTab] = useState('current');

    const tabs = [
        { id: 'current', name: 'Current Rentals' },
        { id: 'past', name: 'Past Rentals' },
        { id: 'wishlist', name: 'Wishlist' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Rentals</h1>
            
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm focus:outline-none`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === 'current' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {myRentedBooks.length > 0 ? (
                            myRentedBooks.map((book, index) => (
                                <RenterBookCard 
                                    key={book.id} 
                                    book={book} 
                                    dueDate={`August ${index + 5}, 2024`}
                                    onReturn={() => returnRental(book.id)}
                                />
                            ))
                        ) : (
                             <div className="lg:col-span-2 text-center p-8 bg-surface rounded-lg shadow-md"><p>You are not currently renting any books.</p></div>
                        )}
                    </div>
                )}
                {activeTab === 'past' && <div className="text-center p-8 bg-surface rounded-lg shadow-md"><p>You have no past rentals.</p></div>}
                {activeTab === 'wishlist' && <div className="text-center p-8 bg-surface rounded-lg shadow-md"><p>Your wishlist is empty.</p></div>}
            </div>
        </div>
    );
};

export default MyRentalsPage;