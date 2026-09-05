import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ArrowRight,
  BookOpenCheck,
  CircleX,
  Clock,
  Coffee,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { books, type Book } from "../../data/booksData";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

function daysBetween(start: string, finish?: string): number {
  const end = finish ? new Date(finish) : new Date();
  return Math.round((end.getTime() - new Date(start).getTime()) / 86_400_000);
}

const statusConfig: Record<
  Book["status"],
  { label: string; className: string }
> = {
  Read: {
    label: "Read",
    className:
      "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  },
  Reading: {
    label: "Reading",
    className: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  "Want to read": {
    label: "Want to Read",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

const recommendationConfig: Record<
  NonNullable<Book["recommendation"]>,
  { className: string; icon: typeof Award }
> = {
  Skip: {
    className:
      "bg-destructive/10 text-destructive border border-destructive/20",
    icon: CircleX,
  },
  Timepass: {
    className: "bg-muted text-muted-foreground border border-border",
    icon: Coffee,
  },
  "Worth a Read": {
    className: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    icon: BookOpenCheck,
  },
  "Highly Recommended": {
    className:
      "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    icon: ThumbsUp,
  },
  "Must Read": {
    className: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    icon: Award,
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 240, damping: 22 },
  },
  exit: {
    opacity: 0,
    y: -16,
    filter: "blur(8px)",
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

/* ─── Featured hero card ─── */
function FeaturedBookCard({
  book,
  isLatest,
  onSelect,
}: {
  book: Book;
  isLatest?: boolean;
  onSelect: (book: Book) => void;
}) {
  const { label, className } = statusConfig[book.status];
  const recommendation = book.recommendation
    ? recommendationConfig[book.recommendation]
    : undefined;
  const days = book.startDate
    ? daysBetween(book.startDate, book.finishDate)
    : undefined;

  return (
    <motion.div
      className="group relative w-full overflow-hidden rounded-3xl border border-border/50 bg-transparent text-left backdrop-blur-xl"
      variants={itemVariants}
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      {/* Blurred cover ambience */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${book.coverUrl})`,
          filter: "blur(34px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/50 to-background/75" />

      <div className="relative z-10 flex gap-5 p-5 sm:p-6">
        {/* Cover */}
        <div className="shrink-0 self-start">
          <img
            src={book.coverUrl}
            alt={book.title}
            loading="lazy"
            className="w-28 h-44 sm:w-32 sm:h-48 object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] group-hover:shadow-[0_26px_70px_rgba(0,0,0,0.55)] transition-shadow duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {/* Eyebrow + status */}
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/60">
              {book.status === "Reading"
                ? "Currently Reading"
                : book.status === "Want to read"
                  ? "On Reading List"
                  : isLatest
                    ? "Latest Read"
                    : "Previously Read"}
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              {recommendation && (
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm ${recommendation.className}`}
                >
                  <recommendation.icon className="w-3 h-3" />
                  {book.recommendation}
                </span>
              )}
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm ${className}`}
              >
                {label}
              </span>
            </div>
          </div>

          {/* Title + author */}
          <div>
            <h3 className="text-xl font-bold leading-tight text-foreground">
              {book.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {book.author}
            </p>
          </div>

          {/* Note */}
          <p className="text-sm leading-6 text-muted-foreground line-clamp-3">
            {book.note}
          </p>

          {/* Genres + meta */}
          <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-1">
            {book.genres.map((g) => (
              <span
                key={g}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 border border-primary/10"
              >
                {g}
              </span>
            ))}
            {days !== undefined && (
              <div className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>
                  {days} days{!book.finishDate ? " so far" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onSelect(book)}
        aria-label={`View details for ${book.title}`}
        className="absolute inset-0 z-20 cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      />
    </motion.div>
  );
}

function WantToReadBookCard({
  book,
  onSelect,
}: {
  book: Book;
  onSelect: (book: Book) => void;
}) {
  const { label, className } = statusConfig[book.status];

  return (
    <motion.div
      className="group relative flex w-full items-center gap-4 rounded-xl border border-border/50 bg-card/40 p-3 text-left sm:p-4"
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      <img
        src={book.coverUrl}
        alt={book.title}
        loading="lazy"
        className="h-28 w-20 shrink-0 rounded-md object-cover shadow-lg"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight text-foreground">
              {book.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {book.author}
            </p>
          </div>
          <span
            className={`shrink-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${className}`}
          >
            {label}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {book.genres.map((genre) => (
            <span
              key={genre}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 border border-primary/10"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onSelect(book)}
        aria-label={`View details for ${book.title}`}
        className="absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      />
    </motion.div>
  );
}

function BookDetailsDialog({ book }: { book: Book }) {
  const { label, className } = statusConfig[book.status];
  const searchQuery = encodeURIComponent(`${book.title} ${book.author}`);
  const recommendation = book.recommendation
    ? recommendationConfig[book.recommendation]
    : undefined;
  const days = book.startDate
    ? daysBetween(book.startDate, book.finishDate)
    : undefined;

  return (
    <DialogContent
      className="max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border-border/60 bg-background/70 p-5 shadow-2xl backdrop-blur-2xl sm:p-6"
      overlayClassName="bg-black/55 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-5 pr-8 sm:flex-row">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-40 w-28 shrink-0 rounded-md object-cover shadow-lg sm:h-52 sm:w-36"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <DialogHeader className="min-w-0 justify-center space-y-2 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/60">
            {book.status === "Want to read" ? "On Reading List" : label}
          </p>
          <DialogTitle className="text-2xl font-bold leading-tight text-foreground">
            {book.title}
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-muted-foreground">
            {book.author}
          </DialogDescription>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {recommendation && (
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${recommendation.className}`}
              >
                <recommendation.icon className="w-3 h-3" />
                {book.recommendation}
              </span>
            )}
            <span
              className={`inline-flex text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${className}`}
            >
              {label}
            </span>
          </div>
        </DialogHeader>
      </div>

      <div className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">{book.note}</p>

        <div className="flex flex-wrap gap-1.5">
          {book.genres.map((genre) => (
            <span
              key={genre}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 border border-primary/10"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          <Button
            size="sm"
            className="h-10 border border-[#ff9900] bg-white px-3 hover:bg-amber-50 dark:border-[#ff9900] dark:bg-[#131921] dark:hover:bg-[#232f3e]"
            asChild
          >
            <a
              href={`https://www.amazon.in/s?k=${searchQuery}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${book.title} on Amazon`}
            >
              <img
                src="/assets/amazon-logo.png"
                alt="Amazon"
                className="h-5 w-auto dark:brightness-0 dark:invert"
              />
            </a>
          </Button>
          <Button
            size="sm"
            className="h-10 border border-[#ffe500] bg-white px-3 hover:bg-slate-100 dark:border-[#3b82f6] dark:bg-[#0b1f3a] dark:hover:bg-[#102a4c]"
            asChild
          >
            <a
              href={`https://www.flipkart.com/search?q=${searchQuery}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${book.title} on Flipkart`}
            >
              <img
                src="/assets/flipkart-logo.png"
                alt="Flipkart"
                className="h-5 w-auto"
              />
            </a>
          </Button>
        </div>

        {book.startDate && (
          <div className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Started
              </p>
              <p className="mt-1 font-semibold">{book.startDate}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Finished
              </p>
              <p className="mt-1 font-semibold">
                {book.finishDate ?? "In progress"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Duration
              </p>
              <p className="mt-1 font-semibold">
                {days} days{!book.finishDate ? " so far" : ""}
              </p>
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
}

/* ─── Section ─── */
export default function BooksSection({
  showWantToRead = true,
  showViewMoreLink = false,
}: {
  showWantToRead?: boolean;
  showViewMoreLink?: boolean;
}) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const readBooks = [...books.readBooks].reverse();
  const { wantToReadBooks } = books;

  return (
    <motion.section
      className="mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="flex items-end justify-between mb-6"
        variants={itemVariants}
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
            Library
          </p>
          <h2 className="text-2xl font-bold leading-tight">Books I've Read</h2>
        </div>
        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {readBooks.length} books
        </span>
      </motion.div>

      {/* Completed and in-progress books */}
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col gap-3">
          {readBooks.map((book, i) => (
            <FeaturedBookCard
              key={book.title}
              book={book}
              isLatest={i === 0}
              onSelect={setSelectedBook}
            />
          ))}
        </div>
      </AnimatePresence>

      {showWantToRead && wantToReadBooks.length > 0 && (
        <motion.div className="mt-12" variants={itemVariants}>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
                Reading List
              </p>
              <h2 className="text-2xl font-bold leading-tight">Want to Read</h2>
            </div>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {wantToReadBooks.length} books
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-3">
              {wantToReadBooks.map((book) => (
                <WantToReadBookCard
                  key={book.title}
                  book={book}
                  onSelect={setSelectedBook}
                />
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      )}

      <motion.div
        className="mt-6 pt-4 border-t border-border/50"
        variants={itemVariants}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-2">
          Recommendation Levels
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(recommendationConfig).map(
            ([recommendation, { className, icon: Icon }]) => (
              <span
                key={recommendation}
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${className}`}
              >
                <Icon className="w-3 h-3" />
                {recommendation}
              </span>
            ),
          )}
        </div>
      </motion.div>

      {showViewMoreLink && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/books">
              View more about books
              <ArrowRight />
            </Link>
          </Button>
        </div>
      )}

      <Dialog
        open={selectedBook !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedBook(null);
        }}
      >
        {selectedBook && <BookDetailsDialog book={selectedBook} />}
      </Dialog>
    </motion.section>
  );
}
