const SkeletonCard = () => (
  <div className="glass-card overflow-hidden animate-pulse">
    <div className="aspect-video bg-secondary" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-secondary rounded w-3/4" />
      <div className="h-3 bg-secondary rounded w-1/2" />
      <div className="h-3 bg-secondary rounded w-1/3" />
    </div>
  </div>
);

export default SkeletonCard;
