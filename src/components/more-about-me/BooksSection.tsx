import { motion, AnimatePresence } from "framer-motion";
import { Clock, CalendarDays } from "lucide-react";

type Book = {
  title: string;
  author: string;
  genres: string[];
  note: string;
  status: "Read" | "Reading" | "Want to read";
  startDate: string;
  finishDate?: string;
  coverUrl: string;
};

function daysBetween(start: string, finish?: string): number {
  const end = finish ? new Date(finish) : new Date();
  return Math.round((end.getTime() - new Date(start).getTime()) / 86_400_000);
}

const books: Book[] = [
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    genres: ["Self-help", "Personal Development"],
    note: "Helped me understand how to understand people in a better way.",
    status: "Read",
    startDate: "Jul 20, 2021",
    finishDate: "Jan 31, 2022",
    coverUrl:
      "https://m.media-amazon.com/images/I/71cnW4RKH-L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "Gunahon Ka Devta",
    author: "Dharamvir Bharati",
    genres: ["Fiction", "Romance", "Tragedy"],
    note: "A deeply emotional story about unspoken love and sacrifice that shows how societal norms can overpower personal feelings.",
    status: "Read",
    startDate: "Nov 2, 2025",
    finishDate: "Nov 27, 2025",
    coverUrl: "https://m.media-amazon.com/images/I/81B4hL+kjVL.jpg",
  },
  {
    title: "Jail Diary of Bhagat Singh",
    author: "Bhagat Singh",
    genres: ["Non-fiction", "Political", "Philosophy"],
    note: "A powerful collection of thoughts reflecting revolutionary ideology, intellectual depth, and the vision of a just society.",
    status: "Read",
    startDate: "Feb 2, 2026",
    finishDate: "Apr 11, 2026",
    coverUrl:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1617766873i/57654760.jpg",
  },
  {
    title: "The Metamorphosis",
    author: "Franz Kafka",
    genres: ["Fiction", "Absurdism", "Existentialism"],
    note: "Currently reading — a surreal tale of alienation and transformation that cuts deep into the human condition.",
    status: "Reading",
    startDate: "Apr 11, 2026",
    coverUrl:
      "https://rekhtabooks.com/cdn/shop/products/9789355201065_c2f2320a-78c3-4145-8eac-a117e720ecf3.jpg",
  },
];

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
}: {
  book: Book;
  isLatest?: boolean;
}) {
  const { label, className } = statusConfig[book.status];
  const days = daysBetween(book.startDate, book.finishDate);

  return (
    <motion.div
      className="group relative rounded-3xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl cursor-default"
      variants={itemVariants}
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
    >
      {/* Blurred cover ambience */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${book.coverUrl})`,
          filter: "blur(40px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/70 to-background/90" />

      <div className="relative z-10 flex gap-5 p-5 sm:p-6">
        {/* Cover */}
        <div className="shrink-0 self-start">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-28 h-44 sm:w-32 sm:h-48 object-cover rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] group-hover:shadow-[0_26px_70px_rgba(0,0,0,0.55)] transition-shadow duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          {/* Eyebrow + status */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/60">
              {book.status === "Reading"
                ? "Currently Reading"
                : isLatest
                  ? "Latest Read"
                  : "Previously Read"}
            </p>
            <span
              className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm ${className}`}
            >
              {label}
            </span>
          </div>

          {/* Title + author */}
          <div>
            <h3 className="text-lg font-bold tracking-tight leading-snug">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {book.author}
            </p>
          </div>

          {/* Note */}
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
            {book.note}
          </p>

          {/* Genres + meta */}
          <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-1">
            {book.genres.map((g) => (
              <span
                key={g}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary/70 border border-primary/10"
              >
                {g}
              </span>
            ))}
            <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>
                {days} days{!book.finishDate ? " so far" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function BooksSection() {
  const sorted = [...books].reverse(); // most recent first

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
          <h2 className="text-xl font-bold tracking-tight">Books I've Read</h2>
        </div>
        <span className="text-[11px] text-muted-foreground tabular-nums">
          {books.length} books
        </span>
      </motion.div>

      {/* All books — full featured card for each */}
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col gap-3">
          {sorted.map((book, i) => (
            <FeaturedBookCard key={book.title} book={book} isLatest={i === 0} />
          ))}
        </div>
      </AnimatePresence>
    </motion.section>
  );
}
