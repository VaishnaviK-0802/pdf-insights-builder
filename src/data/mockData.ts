export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  tags: string[];
  instructor: string;
  instructorAvatar: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  rating: number;
  reviewCount: number;
  price: number | null;
  visibility: "everyone" | "signed_in";
  access: "open" | "invitation" | "payment";
  status: "draft" | "published" | "archived";
  enrolledCount: number;
  progress: number;
  category: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: "video" | "document" | "image" | "quiz";
  duration: string;
  completed: boolean;
  description: string;
  videoUrl?: string;
  content?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: QuizQuestion[];
  rewards: { attempt: number; points: number }[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; isCorrect: boolean }[];
}

export interface Review {
  id: string;
  courseId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface LearnerProfile {
  name: string;
  email: string;
  avatar: string;
  totalPoints: number;
  badge: string;
  coursesCompleted: number;
  coursesInProgress: number;
}

export interface ReportingRow {
  id: string;
  courseName: string;
  participantName: string;
  participantAvatar: string;
  enrolledDate: string;
  startDate: string | null;
  timeSpent: string;
  completionPercentage: number;
  completedDate: string | null;
  status: "yet_to_start" | "in_progress" | "completed";
}

export const badges = [
  { name: "Newbie", points: 20, icon: "🌱" },
  { name: "Explorer", points: 40, icon: "🧭" },
  { name: "Achiever", points: 60, icon: "🏆" },
  { name: "Specialist", points: 80, icon: "⭐" },
  { name: "Expert", points: 100, icon: "💎" },
  { name: "Master", points: 120, icon: "👑" },
];

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive bootcamp. Build real-world projects and gain the skills needed to become a full-stack web developer.",
    shortDescription: "Master full-stack web development from scratch",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    tags: ["Web Dev", "React", "Node.js"],
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    totalLessons: 42,
    completedLessons: 18,
    duration: "36h 30m",
    rating: 4.8,
    reviewCount: 234,
    price: null,
    visibility: "everyone",
    access: "open",
    status: "published",
    enrolledCount: 1245,
    progress: 43,
    category: "Development",
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    description: "Learn the fundamentals of user interface and user experience design. From wireframing to prototyping, master the tools and techniques used by top designers.",
    shortDescription: "Design beautiful and intuitive user experiences",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    tags: ["Design", "Figma", "UX"],
    instructor: "Mike Chen",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    totalLessons: 28,
    completedLessons: 28,
    duration: "24h 15m",
    rating: 4.9,
    reviewCount: 189,
    price: 49.99,
    visibility: "everyone",
    access: "payment",
    status: "published",
    enrolledCount: 892,
    progress: 100,
    category: "Design",
  },
  {
    id: "3",
    title: "Data Science with Python",
    description: "Dive into data science using Python. Learn pandas, NumPy, matplotlib, scikit-learn, and build machine learning models that solve real problems.",
    shortDescription: "Analyze data and build ML models with Python",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["Python", "ML", "Data"],
    instructor: "Dr. Emily Park",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    totalLessons: 35,
    completedLessons: 0,
    duration: "30h 45m",
    rating: 4.7,
    reviewCount: 156,
    price: 59.99,
    visibility: "everyone",
    access: "payment",
    status: "published",
    enrolledCount: 678,
    progress: 0,
    category: "Data Science",
  },
  {
    id: "4",
    title: "Mobile App Development with Flutter",
    description: "Build beautiful cross-platform mobile applications using Flutter and Dart. Learn to create apps for iOS and Android from a single codebase.",
    shortDescription: "Build cross-platform mobile apps with Flutter",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    tags: ["Flutter", "Dart", "Mobile"],
    instructor: "Alex Rivera",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    totalLessons: 32,
    completedLessons: 8,
    duration: "28h 20m",
    rating: 4.6,
    reviewCount: 98,
    price: null,
    visibility: "signed_in",
    access: "invitation",
    status: "published",
    enrolledCount: 432,
    progress: 25,
    category: "Mobile",
  },
  {
    id: "5",
    title: "Cloud Architecture on AWS",
    description: "Master cloud computing with Amazon Web Services. Learn to design, deploy, and manage scalable cloud infrastructure for modern applications.",
    shortDescription: "Design scalable cloud solutions on AWS",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    tags: ["AWS", "Cloud", "DevOps"],
    instructor: "James Wilson",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    totalLessons: 25,
    completedLessons: 0,
    duration: "22h 10m",
    rating: 4.5,
    reviewCount: 67,
    price: 79.99,
    visibility: "everyone",
    access: "payment",
    status: "draft",
    enrolledCount: 234,
    progress: 0,
    category: "Cloud",
  },
  {
    id: "6",
    title: "Cybersecurity Fundamentals",
    description: "Understand the core concepts of cybersecurity. Learn about network security, ethical hacking, cryptography, and incident response strategies.",
    shortDescription: "Protect systems and networks from cyber threats",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    tags: ["Security", "Hacking", "Networks"],
    instructor: "Lisa Thompson",
    instructorAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    totalLessons: 20,
    completedLessons: 12,
    duration: "18h 00m",
    rating: 4.8,
    reviewCount: 145,
    price: null,
    visibility: "everyone",
    access: "open",
    status: "published",
    enrolledCount: 567,
    progress: 60,
    category: "Security",
  },
];

export const mockLessons: Lesson[] = [
  { id: "l1", courseId: "1", title: "Introduction to Web Development", type: "video", duration: "15:00", completed: true, description: "Welcome to the course! In this lesson, we'll cover the fundamentals of web development and set up your development environment.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "l2", courseId: "1", title: "HTML Basics", type: "video", duration: "25:00", completed: true, description: "Learn the building blocks of the web. HTML provides the structure for every web page.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: "l3", courseId: "1", title: "CSS Styling Fundamentals", type: "document", duration: "20:00", completed: true, description: "Master CSS selectors, properties, and the box model to style your web pages beautifully." },
  { id: "l4", courseId: "1", title: "CSS Layout Reference", type: "image", duration: "5:00", completed: false, description: "A visual reference guide for CSS Flexbox and Grid layouts." },
  { id: "l5", courseId: "1", title: "JavaScript Essentials", type: "video", duration: "35:00", completed: false, description: "Dive into JavaScript — the programming language of the web." },
  { id: "l6", courseId: "1", title: "HTML & CSS Quiz", type: "quiz", duration: "10:00", completed: false, description: "Test your knowledge of HTML and CSS fundamentals." },
  { id: "l7", courseId: "1", title: "React Components", type: "video", duration: "30:00", completed: false, description: "Learn how to build reusable UI components with React." },
  { id: "l8", courseId: "1", title: "State Management", type: "video", duration: "28:00", completed: false, description: "Understanding React state and props for dynamic applications." },
];

export const mockQuiz: Quiz = {
  id: "q1",
  courseId: "1",
  title: "HTML & CSS Fundamentals Quiz",
  questions: [
    {
      id: "qq1",
      text: "What does HTML stand for?",
      options: [
        { id: "o1", text: "Hyper Text Markup Language", isCorrect: true },
        { id: "o2", text: "High Tech Modern Language", isCorrect: false },
        { id: "o3", text: "Hyper Transfer Markup Language", isCorrect: false },
        { id: "o4", text: "Home Tool Markup Language", isCorrect: false },
      ],
    },
    {
      id: "qq2",
      text: "Which CSS property is used to change text color?",
      options: [
        { id: "o5", text: "font-color", isCorrect: false },
        { id: "o6", text: "text-color", isCorrect: false },
        { id: "o7", text: "color", isCorrect: true },
        { id: "o8", text: "foreground-color", isCorrect: false },
      ],
    },
    {
      id: "qq3",
      text: "What is the correct HTML element for the largest heading?",
      options: [
        { id: "o9", text: "<heading>", isCorrect: false },
        { id: "o10", text: "<h6>", isCorrect: false },
        { id: "o11", text: "<h1>", isCorrect: true },
        { id: "o12", text: "<head>", isCorrect: false },
      ],
    },
    {
      id: "qq4",
      text: "Which property is used for flexible box layout?",
      options: [
        { id: "o13", text: "display: block", isCorrect: false },
        { id: "o14", text: "display: flex", isCorrect: true },
        { id: "o15", text: "display: inline", isCorrect: false },
        { id: "o16", text: "display: grid-flex", isCorrect: false },
      ],
    },
    {
      id: "qq5",
      text: "How do you select an element with id 'main' in CSS?",
      options: [
        { id: "o17", text: ".main", isCorrect: false },
        { id: "o18", text: "#main", isCorrect: true },
        { id: "o19", text: "main", isCorrect: false },
        { id: "o20", text: "*main", isCorrect: false },
      ],
    },
  ],
  rewards: [
    { attempt: 1, points: 20 },
    { attempt: 2, points: 15 },
    { attempt: 3, points: 10 },
    { attempt: 4, points: 5 },
  ],
};

export const mockReviews: Review[] = [
  {
    id: "r1", courseId: "1", userName: "John Doe",
    userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=100&h=100&fit=crop",
    rating: 5, text: "Incredible course! The instructor explains everything clearly and the projects are very practical. Highly recommended for beginners.", date: "2025-12-15",
  },
  {
    id: "r2", courseId: "1", userName: "Maria Garcia",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    rating: 4, text: "Great content and well-structured. Some advanced topics could use more depth, but overall an excellent learning experience.", date: "2025-12-20",
  },
  {
    id: "r3", courseId: "1", userName: "David Kim",
    userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    rating: 5, text: "Best web development course I've taken. The quizzes really help reinforce the concepts.", date: "2026-01-05",
  },
];

export const mockProfile: LearnerProfile = {
  name: "Alex Student",
  email: "alex@learnsphere.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  totalPoints: 65,
  badge: "Achiever",
  coursesCompleted: 2,
  coursesInProgress: 3,
};

export const mockReporting: ReportingRow[] = [
  { id: "rp1", courseName: "Complete Web Development Bootcamp", participantName: "John Doe", participantAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=50&h=50&fit=crop", enrolledDate: "2025-11-01", startDate: "2025-11-02", timeSpent: "12h 30m", completionPercentage: 75, completedDate: null, status: "in_progress" },
  { id: "rp2", courseName: "Complete Web Development Bootcamp", participantName: "Maria Garcia", participantAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop", enrolledDate: "2025-11-05", startDate: "2025-11-06", timeSpent: "36h 00m", completionPercentage: 100, completedDate: "2026-01-10", status: "completed" },
  { id: "rp3", courseName: "UI/UX Design Masterclass", participantName: "David Kim", participantAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop", enrolledDate: "2025-12-01", startDate: null, timeSpent: "0h", completionPercentage: 0, completedDate: null, status: "yet_to_start" },
  { id: "rp4", courseName: "Data Science with Python", participantName: "Sarah Lee", participantAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop", enrolledDate: "2025-12-10", startDate: "2025-12-12", timeSpent: "8h 45m", completionPercentage: 30, completedDate: null, status: "in_progress" },
  { id: "rp5", courseName: "Mobile App Development with Flutter", participantName: "Tom Brown", participantAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop", enrolledDate: "2026-01-01", startDate: "2026-01-02", timeSpent: "22h 15m", completionPercentage: 100, completedDate: "2026-02-01", status: "completed" },
  { id: "rp6", courseName: "Cybersecurity Fundamentals", participantName: "Amy Chen", participantAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop", enrolledDate: "2026-01-15", startDate: "2026-01-16", timeSpent: "5h 20m", completionPercentage: 45, completedDate: null, status: "in_progress" },
];

export function getBadgeForPoints(points: number) {
  const sorted = [...badges].sort((a, b) => b.points - a.points);
  for (const badge of sorted) {
    if (points >= badge.points) return badge;
  }
  return badges[0];
}

export function getNextBadge(points: number) {
  const sorted = [...badges].sort((a, b) => a.points - b.points);
  for (const badge of sorted) {
    if (points < badge.points) return badge;
  }
  return null;
}
