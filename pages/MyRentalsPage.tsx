
import React, { useState } from 'react';
import type { Book } from '../types';
import Button from '../components/Button';

interface RenterBookCardProps {
    book: Book;
    dueDate: string;
}

const RenterBookCard: React.FC<RenterBookCardProps> = ({ book, dueDate }) => (
    <div className="bg-surface rounded-lg shadow-md p-3 sm:p-4 flex items-start space-x-3 sm:space-x-4">
        <img src={book.coverUrl} alt={book.title} className="w-20 sm:w-24 h-28 sm:h-36 object-cover rounded-md" />
        <div className="flex-1 overflow-hidden">
            <h3 className="font-bold font-montserrat truncate">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
            <p className="text-sm mt-2">Lender: <strong>{book.lenderName}</strong></p>
            <p className="text-sm font-bold text-red-600 mt-1">Due: {dueDate}</p>
        </div>
        <div className="flex flex-col space-y-2">
            <Button variant="primary" className="!text-xs !px-2 !py-1.5">Return</Button>
            <Button variant="secondary" className="!text-xs !px-2 !py-1.5">Contact</Button>
        </div>
    </div>
);

const MyRentalsPage: React.FC<{ books: Book[] }> = ({ books }) => {
    const [activeTab, setActiveTab] = useState('current');

    const tabs = [
        { id: 'current', name: 'Current Rentals' },
        { id: 'past', name: 'Past Rentals' },
        { id: 'wishlist', name: 'Wishlist' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-montserrat font-bold mb-6">My Rentals</h1>
            
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
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === 'current' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <RenterBookCard book={books[0]} dueDate="July 28, 2024" />
                        <RenterBookCard book={books[1]} dueDate="August 05, 2024" />
                    </div>
                )}
                {activeTab === 'past' && <div className="text-center p-8 bg-surface rounded-lg shadow-md"><p>You have no past rentals.</p></div>}
                {activeTab === 'wishlist' && <div className="text-center p-8 bg-surface rounded-lg shadow-md"><p>Your wishlist is empty.</p></div>}
            </div>
        </div>
    );
};

export default MyRentalsPage;
