
import React, { useState } from 'react';
import type { Book } from '../types';
import Button from '../components/Button';
import Icon from '../components/Icon';

interface BookDetailsPageProps {
  book: Book;
}

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = 'h-6 w-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${filled ? 'text-accent' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                >
                    <StarIcon filled={star <= rating} className="h-8 w-8 cursor-pointer" />
                </button>
            ))}
        </div>
    );
};

interface Review {
    id: number;
    author: string;
    avatarSeed: string;
    rating: number;
    date: string;
    text: string;
}

const mockReviews: Review[] = [
    { id: 1, author: 'Priya S.', avatarSeed: 'reviewer1', rating: 5, date: 'July 15, 2024', text: "An absolute masterpiece! The character development was incredible, and I couldn't put it down. Highly recommend renting this." },
    { id: 2, author: 'Rohan G.', avatarSeed: 'reviewer2', rating: 4, date: 'July 10, 2024', text: "A really solid read. The plot had some interesting twists. The book was in great condition when I received it." },
];


const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ book }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewRating > 0 && newReviewText.trim() !== '') {
        const newReview: Review = {
            id: Date.now(),
            author: 'Aarav M.', // Assuming the current user
            avatarSeed: 'user',
            rating: newReviewRating,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            text: newReviewText,
        };
        setReviews([newReview, ...reviews]);
        setNewReviewRating(0);
        setNewReviewText('');
    } else {
        alert('Please provide a rating and a comment.');
    }
  };


  return (
    <div className="bg-surface p-4 sm:p-6 lg:p-8 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <img src={book.coverUrl} alt={book.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </div>
            <div className="md:col-span-2">
                <p className="text-sm font-semibold text-primary uppercase">{book.category}</p>
                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-neutral-dark mt-1">{book.title}</h1>
                <h2 className="text-lg md:text-xl font-montserrat text-gray-600">by {book.author}</h2>
                <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(parseFloat(book.rating))} />)}
                    <span className="ml-2 text-lg text-gray-700">{book.rating}</span>
                    <span className="text-gray-400 mx-2">&bull;</span>
                    <span className="text-gray-600">{reviews.length} reviews</span>
                </div>
                
                <div className="mt-6 border-t pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong className="font-montserrat text-gray-500 block">Condition</strong> <span className="text-base text-on-surface">{book.condition}</span></div>
                        <div><strong className="font-montserrat text-gray-500 block">Pincode</strong> <span className="text-base text-on-surface">{book.pincode}</span></div>
                        <div className="col-span-2"><strong className="font-montserrat text-gray-500 block">ISBN</strong> <span className="text-base text-on-surface">{book.isbn}</span></div>
                    </div>
                </div>

                <div className="mt-6 bg-neutral-light p-6 rounded-lg">
                    <p className="text-3xl font-bold text-primary">₹{book.pricePerDay}<span className="text-lg font-normal text-gray-600"> / day</span></p>
                    <div className="mt-4">
                        <Button className="w-full">Request to Rent</Button>
                    </div>
                </div>

                 <div className="mt-6 flex items-center justify-between bg-surface p-4 rounded-lg border">
                    <div className="flex items-center">
                        <img src={`https://i.pravatar.cc/150?u=${book.lenderName}`} alt={book.lenderName} className="h-14 w-14 rounded-full object-cover" />
                        <div className="ml-4">
                            <p className="font-bold font-montserrat">{book.lenderName}</p>
                            <p className="text-sm text-gray-500">Lender</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="!px-4 !py-2">Message</Button>
                </div>
            </div>
        </div>

        <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-montserrat font-bold mb-4">Synopsis</h3>
            <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>
        </div>

        <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-montserrat font-bold mb-6">User Reviews ({reviews.length})</h3>
            
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="flex items-start space-x-4">
                        <img src={`https://i.pravatar.cc/150?u=${review.author}`} alt={review.author} className="h-12 w-12 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <p className="font-bold font-montserrat">{review.author}</p>
                                <span className="text-gray-400 text-sm">&bull;</span>
                                <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                            <div className="flex items-center my-1">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} className="h-5 w-5" />)}
                            </div>
                            <p className="text-gray-700">{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-neutral-light p-6 rounded-lg">
                <h4 className="text-xl font-montserrat font-semibold mb-4">Leave a Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                        <StarRatingInput rating={newReviewRating} setRating={setNewReviewRating} />
                    </div>
                    <div>
                         <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                         <textarea
                            id="review-text"
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            rows={4}
                            placeholder="Share your thoughts on this book..."
                            className="w-full p-3 border border-neutral-medium rounded-lg focus:ring-primary focus:border-primary transition bg-surface text-on-surface placeholder-gray-400"
                        ></textarea>
                    </div>
                    <div className="text-right">
                        <Button type="submit">Submit Review</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default BookDetailsPage;
