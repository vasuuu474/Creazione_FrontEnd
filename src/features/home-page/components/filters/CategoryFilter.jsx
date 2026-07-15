import { cn } from "@/lib/utils";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground">
        CATEGORIES
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selected.includes(category);
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                isSelected
                  ? "bg-brand text-brand-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
