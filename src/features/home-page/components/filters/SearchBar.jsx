import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold tracking-wider text-muted-foreground">
        SEARCH IDEAS
      </h3>
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Keywords..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 rounded-xl border-border bg-white pl-9 shadow-sm"
        />
      </div>
    </div>
  );
}
