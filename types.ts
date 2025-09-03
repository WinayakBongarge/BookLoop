
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
}

export interface AppContextType {
    navigate: (view: string, bookId?: string) => void;
    books: Book[];
    setBooks: Dispatch<SetStateAction<Book[]>>;
    view: string;
}
