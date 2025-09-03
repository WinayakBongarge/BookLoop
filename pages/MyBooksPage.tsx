
import React, { useState } from 'react';
import type { Book } from '../types';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface LenderBookCardProps {
    book: Book;
    status: 'Available' | 'On Rent';
}

const LenderBookCard: React.FC<LenderBookCardProps> = ({ book, status }) => (
    <div className="bg-surface rounded-lg shadow-md p-3 sm:p-4 flex items-start space-x-3 sm:space-x-4">
        <img src={book.coverUrl} alt={book.title} className="w-20 sm:w-24 h-28 sm:h-36 object-cover rounded-md" />
        <div className="flex-1 overflow-hidden">
            <h3 className="font-bold font-montserrat truncate">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
            <p className="text-lg font-bold text-primary mt-1">₹{book.pricePerDay}/day</p>
            <span className={`text-xs font-bold px-2 py-1 rounded-full mt-2 inline-block ${status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {status}
            </span>
        </div>
        <div className="flex flex-col space-y-2">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600"><Icon name="edit" /></button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-red-500"><Icon name="delete" /></button>
        </div>
    </div>
);

const MyBooksPage: React.FC<{ books: Book[] }> = ({ books }) => {
    const [activeTab, setActiveTab] = useState('listed');

    const tabs = [
        { id: 'listed', name: 'Listed Books' },
        { id: 'rentals', name: 'Current Rentals' },
        { id: 'earnings', name: 'Earnings' },
    ];

    return (
        <div>
            <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:justify-between mb-6">
                <h1 className="text-3xl font-montserrat font-bold">My Books</h1>
                <Button>List a New Book</Button>
            </div>
            
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
                {activeTab === 'listed' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <LenderBookCard book={books[0]} status="Available" />
                        <LenderBookCard book={books[1]} status="On Rent" />
                        <LenderBookCard book={books[2]} status="Available" />
                    </div>
                )}
                {activeTab === 'rentals' && <div className="text-center p-8 bg-surface rounded-lg shadow-md"><p>No active rentals right now.</p></div>}
                {activeTab === 'earnings' && <div className="text-center p-8 bg-surface rounded-lg shadow-md"><p>Earnings dashboard is coming soon.</p></div>}
            </div>
        </div>
    );
};

export default MyBooksPage;
