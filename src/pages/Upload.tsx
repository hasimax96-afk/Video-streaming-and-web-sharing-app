import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload as UploadIcon, Image } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { uploadVideo } from "@/services/firestore";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = () => {
    if (!user || !videoFile || !thumbnailFile || !title.trim()) {
      setError("Please fill all required fields");
      return;
    }
    setUploading(true);
    setError("");

    uploadVideo(
      videoFile,
      thumbnailFile,
      {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        uid: user.uid,
        userName: user.displayName || "User",
        userAvatar: user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`,
      },
      setProgress,
      () => {
        setUploading(false);
        navigate("/profile");
      },
      (err) => {
        setError(err.message);
        setUploading(false);
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold mb-6">
          Upload <span className="gradient-text">Video</span>
        </h1>

        <div className="glass-card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Video File *</label>
            <input ref={videoRef} type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="hidden" />
            <button onClick={() => videoRef.current?.click()} className="w-full border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors">
              <UploadIcon size={32} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{videoFile ? videoFile.name : "Click to select video"}</p>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail *</label>
            <input ref={thumbRef} type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} className="hidden" />
            <button onClick={() => thumbRef.current?.click()} className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors">
              <Image size={24} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{thumbnailFile ? thumbnailFile.name : "Click to select thumbnail"}</p>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 px-3 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 px-3 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
              <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full h-10 px-3 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground text-center">{progress}% uploaded</p>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button onClick={handleUpload} disabled={uploading} className="w-full gradient-btn py-3 text-sm disabled:opacity-50">
            {uploading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
