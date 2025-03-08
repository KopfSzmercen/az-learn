import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";

type Book = {
  id: string;
  title: string;
};

const BooksGrid = async () => {
  const fetchBooks = async () => {
    try {
      const books = await fetch(process.env.NEXT_PUBLIC_API_URL + "/books", {
        next: {
          revalidate: 5
        }
      });
      const booksData = (await books.json()) as Book[];
      return booksData;
    } catch {
      return [];
    }
  };

  const booksData = await fetchBooks();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {booksData.map((book) => (
        <Card key={book.id}>
          <CardHeader className="pb-2">
            <h2 className="text-xl font-semibold">{book.title}</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Book {book.id} content goes here...{" "}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BooksGrid;
