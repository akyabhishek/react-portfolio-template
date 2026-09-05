export type Book = {
  title: string;
  author: string;
  genres: string[];
  note: string;
  status: "Read" | "Reading" | "Want to read";
  startDate?: string;
  finishDate?: string;
  coverUrl: string;
  recommendation?:
    | "Skip"
    | "Timepass"
    | "Worth a Read"
    | "Highly Recommended"
    | "Must Read";
};

export const books: {
  readBooks: Book[];
  wantToReadBooks: Book[];
} = {
  readBooks: [
    {
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      genres: ["Self-help", "Personal Development"],
      note: "A practical guide on improving communication skills and building meaningful relationships by understanding human psychology.",
      status: "Read",
      startDate: "Jul 20, 2021",
      finishDate: "Jan 31, 2022",
      recommendation: "Highly Recommended",
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
      recommendation: "Must Read",
      coverUrl: "https://m.media-amazon.com/images/I/41YtuH+Q3kL._SL1500_.jpg",
    },
    {
      title: "Jail Diary of Bhagat Singh",
      author: "Bhagat Singh",
      genres: ["Non-fiction", "Political", "Philosophy"],
      note: "A powerful collection of thoughts reflecting revolutionary ideology, intellectual depth, and the vision of a just society.",
      status: "Read",
      startDate: "Feb 2, 2026",
      finishDate: "Apr 11, 2026",
      recommendation: "Must Read",
      coverUrl:
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1617766873i/57654760.jpg",
    },
    {
      title: "The Metamorphosis",
      author: "Franz Kafka",
      genres: ["Fiction", "Absurdism", "Existentialism"],
      note: "A haunting story about alienation and identity that reflects how society treats individuals when they no longer fit norms.",
      status: "Read",
      startDate: "Apr 14, 2026",
      finishDate: "Apr 17, 2026",
      recommendation: "Must Read",
      coverUrl:
        "https://rekhtabooks.com/cdn/shop/products/9789355201065_c2f2320a-78c3-4145-8eac-a117e720ecf3.jpg",
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      genres: ["Self-help", "Personal Development"],
      note: "A refreshing take on self-improvement that challenges conventional ideas about happiness, values, and what truly deserves our attention.",
      status: "Read",
      recommendation: "Worth a Read",
      startDate: "Apr 18, 2026",
      finishDate: "Aug 18, 2026",
      coverUrl:
        "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg",
    },
    {
      title: "Why I Am an Atheist",
      author: "Bhagat Singh",
      genres: ["Non-fiction", "Philosophy", "Political"],
      note: "What stayed with me wasn’t just Bhagat Singh’s rejection of God, but the mind behind it. The other essays, letters and writings on revolution, politics, language, justice and the responsibilities of young political workers show that he wasn’t merely a revolutionary with a gun, he was a thinker who fought just as fiercely with his pen and ideas.",
      status: "Read",
      recommendation: "Must Read",
      startDate: "Aug 19, 2026",
      finishDate: "Sept 05, 2026",
      coverUrl: "https://m.media-amazon.com/images/I/61Gq8EZk2uL._SL1360_.jpg",
    },
  ],
  wantToReadBooks: [
    {
      title: "Andha Ullu",
      author: "Sadegh Hedayat, Nasera Sharma",
      genres: ["World Literature", "Hindi Literature", "Literary Fiction"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/51fR5gBwcQL._SL1500_.jpg",
    },
    {
      title:
        "How to Talk to Anyone: 92 Little Tricks for Big Success in Relationships",
      author: "Leil Lowndes",
      genres: ["Self-Help", "Communication", "Relationships"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41zsCXuI2jL._SL1500_.jpg",
    },
    {
      title: "Aughad / औघड़",
      author: "Nilotpal Mrinal",
      genres: ["Hindi Literature", "Social Fiction", "Contemporary Fiction"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41wg+y+D3qL._SL1500_.jpg",
    },
    {
      title: "Prema",
      author: "Premchand",
      genres: ["Hindi Literature", "Classic Literature", "Social Fiction"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41+kf9g5k5L._SL1500_.jpg",
    },
    {
      title: "Kasap",
      author: "Manohar Shyam Joshi",
      genres: ["Hindi Literature", "Literary Fiction", "Romance"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41k6D+zAYtL._SL1500_.jpg",
    },
    {
      title: "Aapka Bunti",
      author: "Mannu Bhandari",
      genres: ["Hindi Literature", "Literary Fiction", "Family"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/414MIwg4ZkL._SL1500_.jpg",
    },
    {
      title: "Ret Ki Machhali | रेत की मछली",
      author: "Kanta Bharti",
      genres: ["Hindi Literature", "Literary Fiction", "Psychological Fiction"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41UcImjLERL._SL1500_.jpg",
    },
    {
      title: "Deewar Mein Ek Khidki Rahti Thi",
      author: "Vinod Kumar Shukla",
      genres: ["Hindi Literature", "Literary Fiction", "Magical Realism"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/31urMWY33LL._SL1500_.jpg",
    },
    {
      title: "The Trial",
      author: "Franz Kafka",
      genres: [
        "Classic Literature",
        "Philosophical Fiction",
        "Absurdist Fiction",
      ],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41tGBHEp5dL._SL1500_.jpg",
    },
    {
      title: "October Junction",
      author: "Divya Prakash Dubey",
      genres: ["Hindi Literature", "Romance", "Contemporary Fiction"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41DIHfN0WyL._SL1500_.jpg",
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genres: ["Personal Finance", "Psychology", "Non-Fiction"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41mxvU9Tu6L._SL1500_.jpg",
    },
    {
      title: "Jaun Elia: Ek Ajab Ghazab Shayar",
      author: "Jaun Elia, Muntazir Firozabad",
      genres: ["Urdu Literature", "Poetry", "Biography"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41RwmfS2YWL._SL1500_.jpg",
    },
    {
      title: "Godan",
      author: "Premchand",
      genres: ["Hindi Literature", "Classic Literature", "Social Fiction"],
      note: "",
      status: "Want to read",
      coverUrl: "https://m.media-amazon.com/images/I/41w62FelgYL._SL1500_.jpg",
    },
  ],
};
