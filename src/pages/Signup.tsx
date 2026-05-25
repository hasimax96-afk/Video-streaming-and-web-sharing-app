import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password, name);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center mx-auto mb-4">
            <span className="font-display font-bold text-lg text-primary-foreground">N</span>
          </div>
          <h1 className="text-2xl font-display font-bold">Create account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join StreamNova today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-10 px-3 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-10 px-3 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full h-10 px-3 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button type="submit" disabled={loading} className="w-full gradient-btn py-2.5 text-sm disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 border-t border-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="flex-1 border-t border-border" />
        </div>

        <button onClick={handleGoogle} className="w-full py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors">
          Continue with Google
        </button>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
