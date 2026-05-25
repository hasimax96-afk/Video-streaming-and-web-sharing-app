import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatViewCount, timeAgo, type YTVideo } from "@/services/youtube";

interface VideoCardProps {
  video: YTVideo;
  index?: number;
  compact?: boolean;
}

const VideoCard = ({ video, index = 0, compact = false }: VideoCardProps) => {
  if (compact) {
    return (
      <Link to={`/video/${video.id}`} className="flex gap-3 group">
        <div className="w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-secondary">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{video.channelTitle}</p>
          <p className="text-xs text-muted-foreground">{formatViewCount(video.views)} views · {timeAgo(video.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link to={`/video/${video.id}`} className="group block">
        <div className="glass-card-hover overflow-hidden">
          <div className="aspect-video overflow-hidden bg-secondary">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
            <p className="text-xs text-muted-foreground mt-1.5">{video.channelTitle}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatViewCount(video.views)} views · {timeAgo(video.publishedAt)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VideoCard;
