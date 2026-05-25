import { Search, Bell, Upload, Menu, Sun, Moon, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
              <span className="font-display font-bold text-sm text-primary-foreground">N</span>
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">
              <span className="gradient-text">Video streaming app </span>
            </span>
          </Link>
        </div>

        {/* Center */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full h-10 pl-4 pr-12 bg-secondary/50 border border-border/50 rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button type="submit" className="absolute right-1 top-1 h-8 w-10 flex items-center justify-center rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <>
              <Link to="/upload" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                <Upload size={16} />
                <span className="hidden md:inline">Upload</span>
              </Link>
              <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  <img
                    src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-transparent hover:border-primary transition-colors cursor-pointer"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-12 w-48 glass-card p-2 space-y-1">
                    <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors">
                      <UserIcon size={16} /> Profile
                    </Link>
                    <button onClick={() => { logout(); setMenuOpen(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors w-full text-left text-destructive">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="gradient-btn px-4 py-2 text-sm">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
