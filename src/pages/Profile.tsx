import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { getUserUploads } from "@/services/firestore";

const Profile = () => {
  const { user } = useAuth();
  const [uploads, setUploads] = useState<any[]>([]);

  useEffect(() => {
    if (user) getUserUploads(user.uid).then(setUploads).catch(() => {});
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-primary/20"
        />
        <div>
          <h1 className="text-2xl font-display font-bold">{user.displayName || "User"}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground mt-1">{uploads.length} videos uploaded</p>
        </div>
      </motion.div>

      <div>
        <h2 className="font-display font-semibold text-lg mb-4">Your Videos</h2>
        {uploads.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No videos uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

export default Profile;
