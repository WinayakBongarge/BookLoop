
import type { Dispatch, SetStateAction } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  synopsis: string;
  category: string;
  isbn: string;
  pricePerDay: number;
  rating: string;
  distance: string;
  coverUrl: string;
  condition: string;
  pincode: string;
  lenderName: string;
  lenderPhoneNumber: string;
}

export interface AppContextType {
    navigate: (view: string, data?: string) => void;
    books: Book[];
    setBooks: Dispatch<SetStateAction<Book[]>>;
    view: string;
    myListedBooks: Book[];
    myRentedBooks: Book[];
    addBook: (book: Omit<Book, 'id' | 'rating' | 'distance' | 'lenderName' | 'lenderPhoneNumber' | 'pincode'>) => void;
    removeListedBook: (bookId: string) => void;
    returnRental: (bookId: string) => void;
}