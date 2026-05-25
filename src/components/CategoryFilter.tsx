import { useState, useEffect } from "react";
import { fetchVideoCategories, type YTCategory } from "@/services/youtube";

interface CategoryFilterProps {
  selected: string;
  onSelect: (id: string) => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<YTCategory[]>([]);

  useEffect(() => {
    fetchVideoCategories().then((cats) => setCategories(cats));
  }, []);

  const allCategories = [{ id: "0", title: "All" }, ...categories];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {allCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selected === cat.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
