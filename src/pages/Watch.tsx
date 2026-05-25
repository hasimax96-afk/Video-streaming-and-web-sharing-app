import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, Share2, Bookmark } from "lucide-react";
import { fetchVideoDetails, fetchRelatedVideos, formatViewCount, timeAgo, type YTVideo } from "@/services/youtube";
import { toggleLike, getLikeCount, hasUserLiked, toggleFavorite, incrementViews, addToHistory, toggleSubscription, isUserSubscribed, getSubscriberCount } from "@/services/firestore";
import { useAuth } from "@/context/AuthContext";
import VideoCard from "@/components/VideoCard";
import CommentSection from "@/components/CommentSection";
import SkeletonCard from "@/components/SkeletonCard";

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [video, setVideo] = useState<YTVideo | null>(null);
  const [related, setRelated] = useState<YTVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([fetchVideoDetails(id), fetchRelatedVideos(id, 8)]).then(([v, r]) => {
      setVideo(v);
      setRelated(r.filter((rv) => rv.id !== id));
      setLoading(false);
    });

    // Track view & history
    incrementViews(id).catch(() => {});
    if (user) {
      addToHistory(user.uid, id, "", "", "").catch(() => {});
      hasUserLiked(id, user.uid).then(setLiked).catch(() => {});
    }
  }, [id, user]);

  useEffect(() => {
    if (!id) return;
    const unsub = getLikeCount(id, setLikeCount);
    return unsub;
  }, [id]);

  useEffect(() => {
    if (!video?.channelId) return;
    const unsub = getSubscriberCount(video.channelId, setSubCount);
    if (user) isUserSubscribed(video.channelId, user.uid).then(setSubscribed).catch(() => {});
    return unsub;
  }, [video?.channelId, user]);

  const handleLike = async () => {
    if (!user || !id) return;
    const nowLiked = await toggleLike(id, user.uid);
    setLiked(nowLiked);
  };

  const handleSave = async () => {
    if (!user || !id || !video) return;
    const nowSaved = await toggleFavorite(user.uid, id, video.title, video.thumbnail, video.channelTitle);
    setSaved(nowSaved);
  };

  const handleSubscribe = async () => {
    if (!user || !video?.channelId) return;
    const nowSub = await toggleSubscription(video.channelId, user.uid);
    setSubscribed(nowSub);
  };

  if (loading) {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="aspect-video bg-secondary rounded-xl animate-pulse" />
          <div className="mt-4 space-y-3">
            <div className="h-6 bg-secondary rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-secondary rounded w-1/2 animate-pulse" />
          </div>
        </div>
        <div className="lg:w-80 xl:w-96 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground text-lg">Video not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0">
        {/* YouTube Embed */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-video rounded-xl overflow-hidden bg-card border border-border/30">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 space-y-4">
          <h1 className="text-xl font-display font-bold leading-tight">{video.title}</h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-sm">{video.channelTitle}</p>
                <p className="text-xs text-muted-foreground">{subCount} subscribers</p>
              </div>
              <button
                onClick={handleSubscribe}
                className={`ml-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  subscribed ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all ${
                  liked ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <ThumbsUp size={16} className={liked ? "fill-current" : ""} />
                {likeCount > 0 ? likeCount : formatViewCount(video.likes)}
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors">
                <Share2 size={16} /> Share
              </button>
              <button
                onClick={handleSave}
                className={`p-2 rounded-full transition-all ${
                  saved ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Bookmark size={16} className={saved ? "fill-current" : ""} />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-2">
              {formatViewCount(video.views)} views · {timeAgo(video.publishedAt)}
            </p>
            <p className="text-sm whitespace-pre-line line-clamp-4">{video.description}</p>
          </div>

          {/* Comments */}
          {id && <CommentSection videoId={id} />}
        </motion.div>
      </div>

      {/* Related Videos */}
      <div className="lg:w-80 xl:w-96 space-y-4">
        <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">Related Videos</h3>
        <div className="space-y-3">
          {related.map((v) => (
            <VideoCard key={v.id} video={v} compact />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
