export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  uploadDate: string;
  description: string;
  category: string;
  tags: string[];
  videoUrl: string;
  channel: Channel;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  banner?: string;
  subscribers: number;
  description: string;
  joinDate: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export const channels: Channel[] = [
  {
    id: "ch1",
    name: "TechVision",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=TV&backgroundColor=0ea5e9",
    banner: "",
    subscribers: 284000,
    description: "Exploring the frontier of technology, AI, and the digital future.",
    joinDate: "2023-01-15",
  },
  {
    id: "ch2",
    name: "DesignCraft",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=DC&backgroundColor=8b5cf6",
    subscribers: 156000,
    description: "Beautiful design tutorials and creative inspiration.",
    joinDate: "2022-06-20",
  },
  {
    id: "ch3",
    name: "CodeLab",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=CL&backgroundColor=10b981",
    subscribers: 412000,
    description: "Learn to code with hands-on projects and tutorials.",
    joinDate: "2021-11-01",
  },
  {
    id: "ch4",
    name: "Wanderlust",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=WL&backgroundColor=f59e0b",
    subscribers: 89000,
    description: "Travel the world from your screen.",
    joinDate: "2023-05-10",
  },
  {
    id: "ch5",
    name: "SoundWave",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=SW&backgroundColor=ec4899",
    subscribers: 203000,
    description: "Music production, mixing, and audio engineering.",
    joinDate: "2022-09-14",
  },
];

export const videos: Video[] = [
  {
    id: "v1",
    title: "The Future of AI: What's Coming in 2026",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=640&q=80",
    duration: "18:42",
    views: 542000,
    likes: 24300,
    uploadDate: "2026-02-15",
    description: "A deep dive into the latest AI breakthroughs and what they mean for the future of technology, work, and creativity.",
    category: "Technology",
    tags: ["AI", "future", "technology", "machine learning"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channel: channels[0],
  },
  {
    id: "v2",
    title: "Designing for the Modern Web — UI Trends",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&q=80",
    duration: "12:05",
    views: 189000,
    likes: 11200,
    uploadDate: "2026-02-10",
    description: "Explore the hottest UI/UX design trends shaping the web in 2026.",
    category: "Design",
    tags: ["design", "UI", "UX", "web design"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channel: channels[1],
  },
  {
    id: "v3",
    title: "Build a Full-Stack App in 30 Minutes",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&q=80",
    duration: "31:20",
    views: 723000,
    likes: 45600,
    uploadDate: "2026-01-28",
    description: "Speed-run building a production-ready full-stack application from scratch.",
    category: "Programming",
    tags: ["coding", "full-stack", "tutorial", "react"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channel: channels[2],
  },
  {
    id: "v4",
    title: "Hidden Gems of Southeast Asia",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80",
    duration: "22:15",
    views: 98000,
    likes: 7800,
    uploadDate: "2026-02-20",
    description: "Discover breathtaking locations off the beaten path in Southeast Asia.",
    category: "Travel",
    tags: ["travel", "asia", "adventure", "nature"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channel: channels[3],
  },
  {
    id: "v5",
    title: "Mastering Music Production with AI Tools",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=640&q=80",
    duration: "25:30",
    views: 167000,
    likes: 12400,
    uploadDate: "2026-02-18",
    description: "Learn how AI is revolutionizing music production and how to use these tools.",
    category: "Music",
    tags: ["music", "production", "AI", "audio"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channel: channels[4],
  },
  {
    id: "v6",
    title: "React Server Components Deep Dive",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=640&q=80",
    duration: "28:10",
    views: 312000,
    likes: 19800,
    uploadDate: "2026-02-12",
    description: "Understanding React Server Components and how to use them effectively.",
    category: "Programming",
    tags: ["react", "server components", "frontend", "javascript"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channel: channels[2],
  },
  {
    id: "v7",
    title: "Minimalist Interior Design Ideas 2026",
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=640&q=80",
    duration: "14:45",
    views: 134000,
    likes: 9200,
    uploadDate: "2026-02-08",
    description: "Transform your space with these minimalist design principles.",
    category: "Design",
    tags: ["interior", "design", "minimalist", "home"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channel: channels[1],
  },
  {
    id: "v8",
    title: "Quantum Computing Explained Simply",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=640&q=80",
    duration: "20:33",
    views: 421000,
    likes: 28700,
    uploadDate: "2026-01-30",
    description: "A beginner-friendly explanation of quantum computing and its potential.",
    category: "Technology",
    tags: ["quantum", "computing", "science", "technology"],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channel: channels[0],
  },
];

export const comments: Comment[] = [
  { id: "c1", userId: "u1", userName: "Alex Rivera", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex", text: "This is incredibly well explained! Thanks for making complex topics so accessible.", timestamp: "2 hours ago", likes: 42 },
  { id: "c2", userId: "u2", userName: "Jordan Kim", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jordan", text: "Been waiting for a video like this. The production quality is next level 🔥", timestamp: "5 hours ago", likes: 28 },
  { id: "c3", userId: "u3", userName: "Sam Chen", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sam", text: "Could you do a follow-up covering more advanced techniques?", timestamp: "1 day ago", likes: 15 },
  { id: "c4", userId: "u4", userName: "Casey Morgan", userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Casey", text: "The examples at 12:30 were super helpful. Subscribed!", timestamp: "2 days ago", likes: 8 },
];

export const categories = ["All", "Technology", "Programming", "Design", "Music", "Travel", "Gaming", "Science"];

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
}

export function formatSubscribers(subs: number): string {
  if (subs >= 1000000) return `${(subs / 1000000).toFixed(1)}M`;
  if (subs >= 1000) return `${(subs / 1000).toFixed(0)}K`;
  return subs.toString();
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 30) return `${Math.floor(days / 30)} months ago`;
  if (days > 0) return `${days} days ago`;
  return "Today";
}
