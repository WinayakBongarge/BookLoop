

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { Book } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import MyBooksPage from './pages/MyBooksPage';
import MyRentalsPage from './pages/MyRentalsPage';
import ListBookPage from './pages/ListBookPage';
import ProfilePage from './pages/ProfilePage';
import CategoryPage from './pages/CategoryPage';
import { AppContext } from './contexts/AppContext';

const indianPincodes = ["110001", "400001", "700001", "600001", "560001", "411001", "500001", "380001"];
const indianNames = ["Priya Sharma", "Rohan Gupta", "Ananya Reddy", "Vikram Singh", "Isha Patel", "Arjun Kumar", "Saanvi Joshi", "Advik Nair"];
const indianPhoneNumbers = ["9876543210", "9123456789", "8765432109", "7890123456", "9988776655", "8877665544", "7766554433", "6655443322"];
const currentUser = { name: 'Rohan Gupta', phoneNumber: '9876543210', pincode: '110001' };


const App: React.FC = () => {
    const [view, setView] = useState('home');
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [myListedBooks, setMyListedBooks] = useState<Book[]>([]);
    const [myRentedBooks, setMyRentedBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = (newView: string, data?: string) => {
        setView(newView);
        if (newView === 'bookDetails') {
            setSelectedBookId(data || null);
            setSelectedCategory(null);
        } else if (newView === 'category') {
            setSelectedCategory(data || null);
            setSelectedBookId(null);
        } else {
            setSelectedBookId(null);
            setSelectedCategory(null);
        }
        window.scrollTo(0, 0);
    };
    
    const addBook = (newBookData: Omit<Book, 'id' | 'rating' | 'distance' | 'lenderName' | 'lenderPhoneNumber' | 'pincode'>) => {
        const newBook: Book = {
            ...newBookData,
            id: newBookData.isbn || `${Date.now()}`,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            distance: "0.1",
            lenderName: currentUser.name,
            lenderPhoneNumber: currentUser.phoneNumber,
            pincode: currentUser.pincode,
        };
        setBooks(prev => [newBook, ...prev]);
        setMyListedBooks(prev => [newBook, ...prev]);
    };

    const removeListedBook = (bookId: string) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            setBooks(prev => prev.filter(b => b.id !== bookId));
            setMyListedBooks(prev => prev.filter(b => b.id !== bookId));
        }
    };

    const returnRental = (bookId: string) => {
        const book = books.find(b => b.id === bookId);
        alert(`Processing return for "${book?.title}". The lender will be notified.`);
        setMyRentedBooks(prev => prev.filter(b => b.id !== bookId));
    };


    const fetchMockBooks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY environment variable not set.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Generate a list of 20 books popular in India, including titles by both Indian and international authors. For each book, provide a title, author, a one-paragraph synopsis, a category (e.g., Fiction, Mythology, History), and a valid ISBN-13.",
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                author: { type: Type.STRING },
                                synopsis: { type: Type.STRING },
                                category: { type: Type.STRING },
                                isbn: { type: Type.STRING },
                            },
                            required: ["title", "author", "synopsis", "category", "isbn"],
                        },
                    },
                },
            });

            const generatedBooks: Book[] = JSON.parse(response.text).map((book: any, index: number) => ({
                ...book,
                id: book.isbn || `${index}`,
                pricePerDay: Math.floor(Math.random() * 21) + 10,
                rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                distance: (Math.random() * 15 + 1).toFixed(1),
                coverUrl: `https://picsum.photos/seed/${book.isbn || index}/400/600`,
                condition: ['New', 'Like New', 'Good', 'Acceptable'][Math.floor(Math.random() * 4)],
                pincode: indianPincodes[Math.floor(Math.random() * indianPincodes.length)],
                lenderName: index < 4 ? currentUser.name : indianNames[Math.floor(Math.random() * indianNames.length)],
                lenderPhoneNumber: index < 4 ? currentUser.phoneNumber : indianPhoneNumbers[Math.floor(Math.random() * indianPhoneNumbers.length)],
            }));

            setBooks(generatedBooks);
            setMyListedBooks(generatedBooks.slice(0, 4));
            setMyRentedBooks(generatedBooks.slice(4, 7));

        } catch (e) {
            console.error("Failed to fetch mock books:", e);
            setError("Could not load book data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMockBooks();
    }, [fetchMockBooks]);

    const renderView = () => {
        if (isLoading) {
            return (
              <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
              </div>
            );
        }
        if (error) {
            return <div className="text-center text-red-500 mt-10 p-4 bg-red-100 rounded-md">{error}</div>;
        }

        switch (view) {
            case 'home':
                return <HomePage books={books} />;
            case 'bookDetails':
                const selectedBook = books.find(b => b.id === selectedBookId);
                return selectedBook ? <BookDetailsPage book={selectedBook} /> : <HomePage books={books} />;
             case 'category':
                if (!selectedCategory) return <HomePage books={books} />;
                const categoryBooks = books.filter(b => 
                    b.category.toLowerCase().includes(selectedCategory.toLowerCase())
                );
                return <CategoryPage categoryName={selectedCategory} books={categoryBooks} />;
            case 'myBooks':
                return <MyBooksPage />;
            case 'myRentals':
                return <MyRentalsPage />;
            case 'listBook':
                return <ListBookPage />;
            case 'profile':
                return <ProfilePage />;
            default:
                return <HomePage books={books} />;
        }
    };
    
    const contextValue = { navigate, books, setBooks, view, myListedBooks, myRentedBooks, addBook, removeListedBook, returnRental };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pb-20 md:pb-6">
                    {renderView()}
                </main>
                <BottomNav />
            </div>
        </AppContext.Provider>
    );
};

export default App;