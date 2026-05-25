import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import CategoryFilter from "@/components/CategoryFilter";
import SkeletonCard from "@/components/SkeletonCard";
import { fetchTrendingVideos, isApiConfigured, type YTVideo } from "@/services/youtube";

const Index = () => {
  const [category, setCategory] = useState("0");
  const [videos, setVideos] = useState<YTVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrendingVideos(category, 24).then((v) => {
      setVideos(v);
      setLoading(false);
    });
  }, [category]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
        <h1 className="text-2xl font-display font-bold">
          Discover <span className="gradient-text">Amazing</span> Content
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isApiConfigured()
            ? "Trending videos from around the world"
            : "Configure your YouTube API key to fetch real videos"}
        </p>
      </motion.div>

      <CategoryFilter selected={category} onSelect={setCategory} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      )}

      {!loading && videos.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No videos found</p>
          <p className="text-sm mt-1">Try a different category or check your API key</p>
        </div>
      )}
    </div>
  );
};

export default Index;
