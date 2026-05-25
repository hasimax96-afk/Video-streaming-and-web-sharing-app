import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import SkeletonCard from "@/components/SkeletonCard";
import { searchVideos, type YTVideo } from "@/services/youtube";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<YTVideo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchVideos(query, 20).then((v) => {
      setResults(v);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Search size={18} />
          <span className="text-sm">Search results for</span>
        </div>
        <h1 className="text-2xl font-display font-bold">"{query}"</h1>
        {!loading && <p className="text-sm text-muted-foreground mt-1">{results.length} results found</p>}
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No results found</p>
          <p className="text-sm mt-1">Try different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
