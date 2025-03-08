import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import Image from "next/image";
import PlaceholderImage from "@/public/file.svg";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Discover Your Next Favorite Book
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Browse our extensive collection of books across all genres.
                  From bestsellers to hidden gems, find your perfect read today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/books">Browse Catalog</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Search className="mr-2 h-4 w-4" />
                  Search Books
                </Button>
              </div>
            </div>
            <Image
              src={PlaceholderImage}
              width={550}
              height={550}
              alt="Book collection"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted mx-auto">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Featured Books
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our handpicked selection of must-read books this season.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {[1, 2, 3].map((book) => (
              <div
                key={book}
                className="group relative overflow-hidden rounded-lg border bg-background"
              >
                <div className="aspect-h-1 aspect-w-1 relative bg-muted">
                  <Image
                    src={PlaceholderImage}
                    alt={`Book ${book}`}
                    width={200}
                    height={300}
                    className="object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Book Title {book}</h3>
                  <p className="text-sm text-muted-foreground">Author Name</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/books">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
            <BookOpen className="h-5 w-5" />
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} BookCatalog. All rights
              reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Terms
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
