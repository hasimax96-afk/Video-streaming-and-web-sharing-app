import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { subscribeComments, addComment, deleteComment, type CommentData } from "@/services/firestore";
import { MessageCircle, Trash2 } from "lucide-react";

interface CommentSectionProps {
  videoId: string;
}

const CommentSection = ({ videoId }: CommentSectionProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeComments(videoId, setComments);
    return unsub;
  }, [videoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user) return;
    setSubmitting(true);
    try {
      await addComment(
        videoId,
        user.uid,
        user.displayName || "User",
        user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`,
        text.trim()
      );
      setText("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
    setSubmitting(false);
  };

  const formatTimestamp = (ts: any) => {
    if (!ts?.toDate) return "Just now";
    const d = ts.toDate();
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold flex items-center gap-2">
        <MessageCircle size={18} /> {comments.length} Comments
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <img
            src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`}
            alt="You"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent border-b border-border/50 pb-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              disabled={!text.trim() || submitting}
              className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">Sign in to comment.</p>
      )}

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <img src={c.userAvatar} alt={c.userName} className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{c.userName}</span>
                <span className="text-xs text-muted-foreground">{formatTimestamp(c.createdAt)}</span>
              </div>
              <p className="text-sm text-foreground/80 mt-0.5">{c.text}</p>
            </div>
            {user?.uid === c.uid && (
              <button onClick={() => deleteComment(c.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
