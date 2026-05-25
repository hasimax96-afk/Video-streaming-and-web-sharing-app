// ============================================
// YouTube Data API v3 Service
// ============================================
// Replace YOUR_YOUTUBE_API_KEY below with your actual key.
// Get one from: https://console.cloud.google.com → APIs & Services → Credentials
// Enable "YouTube Data API v3" in the API Library.
// ============================================

import axios from "axios";

const API_KEY: string = "AIzaSyBZwlq6hcPcSokcHDmFu_uMz6Sixsa1oS4";
const BASE = "https://www.googleapis.com/youtube/v3";

export interface YTVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  views: string;
  likes: string;
  publishedAt: string;
  description: string;
  duration?: string;
}

export interface YTCategory {
  id: string;
  title: string;
}

const parseVideo = (item: any): YTVideo => {
  const videoId = typeof item.id === "string" ? item.id : item.id?.videoId || "";
  return {
    id: videoId,
    title: item.snippet?.title || "",
    thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
    channelTitle: item.snippet?.channelTitle || "",
    channelId: item.snippet?.channelId || "",
    views: item.statistics?.viewCount || "0",
    likes: item.statistics?.likeCount || "0",
    publishedAt: item.snippet?.publishedAt || "",
    description: item.snippet?.description || "",
    duration: item.contentDetails?.duration || "",
  };
};

export const fetchTrendingVideos = async (categoryId = "0", maxResults = 24): Promise<YTVideo[]> => {
  try {
    const params: any = {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      regionCode: "US",
      maxResults,
      key: API_KEY,
    };
    if (categoryId !== "0") params.videoCategoryId = categoryId;
    const { data } = await axios.get(`${BASE}/videos`, { params });
    return data.items.map(parseVideo);
  } catch (err) {
    console.error("Failed to fetch trending videos:", err);
    return [];
  }
};

export const fetchVideoCategories = async (): Promise<YTCategory[]> => {
  try {
    const { data } = await axios.get(`${BASE}/videoCategories`, {
      params: { part: "snippet", regionCode: "US", key: API_KEY },
    });
    return data.items
      .filter((i: any) => i.snippet.assignable)
      .map((i: any) => ({ id: i.id, title: i.snippet.title }));
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
};

export const searchVideos = async (query: string, maxResults = 20): Promise<YTVideo[]> => {
  try {
    const { data } = await axios.get(`${BASE}/search`, {
      params: { part: "snippet", q: query, type: "video", maxResults, key: API_KEY },
    });
    // Search results don't include statistics, so we fetch full details
    const ids = data.items.map((i: any) => i.id.videoId).filter(Boolean).join(",");
    if (!ids) return [];
    const { data: details } = await axios.get(`${BASE}/videos`, {
      params: { part: "snippet,statistics,contentDetails", id: ids, key: API_KEY },
    });
    return details.items.map(parseVideo);
  } catch (err) {
    console.error("Failed to search videos:", err);
    return [];
  }
};

export const fetchVideoDetails = async (videoId: string): Promise<YTVideo | null> => {
  try {
    const { data } = await axios.get(`${BASE}/videos`, {
      params: { part: "snippet,statistics,contentDetails", id: videoId, key: API_KEY },
    });
    if (!data.items?.length) return null;
    return parseVideo(data.items[0]);
  } catch (err) {
    console.error("Failed to fetch video details:", err);
    return null;
  }
};

export const fetchRelatedVideos = async (videoId: string, maxResults = 10): Promise<YTVideo[]> => {
  try {
    // relatedToVideoId is deprecated; use search with video title as fallback
    const video = await fetchVideoDetails(videoId);
    if (!video) return [];
    const keywords = video.title.split(" ").slice(0, 3).join(" ");
    return searchVideos(keywords, maxResults);
  } catch (err) {
    console.error("Failed to fetch related videos:", err);
    return [];
  }
};

export const formatViewCount = (count: string): string => {
  const n = parseInt(count, 10);
  if (isNaN(n)) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
};

export const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

export const isApiConfigured = (): boolean => {
  return API_KEY !== "AIzaSyBZwlq6hcPcSokcHDmFu_uMz6Sixsa1oS4" && API_KEY.length > 10;
};
