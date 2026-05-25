import { Home, Compass, Clock, Heart, Flame, Gamepad2, Music, Code, Palette, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Flame, label: "Trending", path: "/trending" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Upload, label: "Upload", path: "/upload" },
];

const categoryItems = [
  { icon: Code, label: "Programming", path: "/search?q=programming" },
  { icon: Palette, label: "Design", path: "/search?q=design" },
  { icon: Music, label: "Music", path: "/search?q=music" },
  { icon: Gamepad2, label: "Gaming", path: "/search?q=gaming" },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -240, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -240, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-16 bottom-0 w-60 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto"
        >
          <div className="p-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mx-3 my-2 border-t border-sidebar-border" />

          <div className="p-3">
            <p className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</p>
            <div className="space-y-1">
              {categoryItems.map((item) => (
                <Link key={item.label} to={item.path} className="sidebar-link">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-4 mt-auto">
            <p className="text-xs text-muted-foreground/50">© 2026 StreamNova</p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
