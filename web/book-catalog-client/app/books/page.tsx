import { AddBookDialog } from "@/app/books/(booksGrid)/AddBookDialog";
import BooksGrid from "@/app/books/(booksGrid)/BooksGrid";
import GridSkeleton from "@/components/ui/gridSkeleton";
import { Suspense } from "react";

const Page = async () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Book Catalog</h1>
        <AddBookDialog />
      </div>
      <Suspense fallback={<GridSkeleton />}>
        <BooksGrid />
      </Suspense>
    </div>
  );
};

export default Page;
