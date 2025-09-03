
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { Book } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import MyBooksPage from './pages/MyBooksPage';
import MyRentalsPage from './pages/MyRentalsPage';
import ListBookPage from './pages/ListBookPage';
import ProfilePage from './pages/ProfilePage';
import { AppContext } from './contexts/AppContext';

const indianPincodes = ["110001", "400001", "700001", "600001", "560001", "411001", "500001", "380001"];
const indianNames = ["Priya Sharma", "Rohan Gupta", "Ananya Reddy", "Vikram Singh", "Isha Patel", "Arjun Kumar", "Saanvi Joshi", "Advik Nair"];

const App: React.FC = () => {
    const [view, setView] = useState('home');
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = (newView: string, bookId?: string) => {
        setView(newView);
        if (bookId) {
            setSelectedBookId(bookId);
        } else {
            setSelectedBookId(null);
        }
        window.scrollTo(0, 0);
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
                pricePerDay: Math.floor(Math.random() * 21) + 10, // Price in INR (10 to 30)
                rating: (Math.random() * 1.5 + 3.5).toFixed(1),
                distance: (Math.random() * 15 + 1).toFixed(1),
                coverUrl: `https://picsum.photos/seed/${book.isbn || index}/400/600`,
                condition: ['New', 'Like New', 'Good', 'Acceptable'][Math.floor(Math.random() * 4)],
                pincode: indianPincodes[Math.floor(Math.random() * indianPincodes.length)],
                lenderName: indianNames[Math.floor(Math.random() * indianNames.length)],
            }));

            setBooks(generatedBooks);
        } catch (e) {
            console.error("Failed to fetch mock books:", e);
            setError("Could not load book data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMockBooks();
    }, []);

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
            case 'myBooks':
                return <MyBooksPage books={books.slice(0, 5)} />;
            case 'myRentals':
                return <MyRentalsPage books={books.slice(5, 10)} />;
            case 'listBook':
                return <ListBookPage />;
            case 'profile':
                return <ProfilePage />;
            default:
                return <HomePage books={books} />;
        }
    };
    
    const contextValue = { navigate, books, setBooks, view };

    return (
        <AppContext.Provider value={contextValue}>
            <div className="min-h-screen bg-background flex flex-col md:flex-row">
                <Sidebar />
                <div className="flex-1 md:ml-64 pb-20 md:pb-0">
                    <Header />
                    <main className="p-4 sm:p-6 lg:p-8">
                        {renderView()}
                    </main>
                </div>
                <BottomNav />
            </div>
        </AppContext.Provider>
    );
};

export default App;
