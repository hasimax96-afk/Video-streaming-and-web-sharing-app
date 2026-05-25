import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
      <h1 className="text-8xl font-display font-bold gradient-text">404</h1>
      <p className="text-xl text-muted-foreground mt-4">Page not found</p>
      <Link to="/" className="inline-block mt-6 gradient-btn px-6 py-3 text-sm">Go Home</Link>
    </motion.div>
  </div>
);

export default NotFound;
