import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getFavorites } from "@/services/firestore";

const Favorites = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    getFavorites(user.uid).then((f) => { setItems(f); setLoading(false); }).catch(() => setLoading(false));
  }, [user]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><Heart size={24} /> Favorites</h1>
      </motion.div>

      {!user && <p className="text-muted-foreground">Sign in to see your favorites.</p>}

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">No favorites yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item: any) => (
            <Link to={`/video/${item.videoId}`} key={item.videoId} className="glass-card-hover overflow-hidden block">
              <div className="aspect-video bg-secondary">
                {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">{item.title || "Untitled"}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.channelTitle || ""}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
