import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getUserUploads, toggleSubscription, isUserSubscribed, getSubscriberCount } from "@/services/firestore";

const Channel = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [uploads, setUploads] = useState<any[]>([]);
  const [subscribed, setSubscribed] = useState(false);
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    getUserUploads(userId).then(setUploads).catch(() => {});
    const unsub = getSubscriberCount(userId, setSubCount);
    if (user) isUserSubscribed(userId, user.uid).then(setSubscribed).catch(() => {});
    return unsub;
  }, [userId, user]);

  const handleSubscribe = async () => {
    if (!user || !userId) return;
    const nowSub = await toggleSubscription(userId, user.uid);
    setSubscribed(nowSub);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-40 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/30 to-accent/30"
      >
        <div className="absolute inset-0 bg-background/20" />
      </motion.div>

      {/* Channel Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 -mt-12 relative z-10 px-4"
      >
        <img
          src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${userId}`}
          alt="Channel"
          className="w-24 h-24 rounded-full border-4 border-background"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-display font-bold">Channel</h1>
          <p className="text-sm text-muted-foreground">{subCount} subscribers · {uploads.length} videos</p>
        </div>
        {user?.uid !== userId && (
          <button
            onClick={handleSubscribe}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              subscribed ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </motion.div>

      {/* Uploaded Videos */}
      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Videos</h2>
        {uploads.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No videos uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {uploads.map((v: any) => (
              <div key={v.id} className="glass-card-hover overflow-hidden">
                <div className="aspect-video bg-secondary">
                  {v.thumbnailUrl && <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{v.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{v.views || 0} views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
