import { useMemo, useState } from "react";
import Navbar from "./components/layout/Navbar";
import SearchBar from "./components/filters/SearchBar";
import CategoryFilter from "./components/filters/CategoryFilter";
import ProjectList from "./components/project/ProjectList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  projects,
  categories,
  sortOptions,
} from "./data/projects";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [sortBy, setSortBy] = useState("trending");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        search === "" ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = () => {
        if (selectedCategories.includes("All")) return true;
        const mapping = {
          Technology: ["BLOCKCHAIN", "OPEN SOURCE", "EDTECH"],
          Finance: ["FINTECH"],
          Healthcare: ["HEALTHTECH"],
          Design: ["DESIGN"],
          Marketing: ["MARKETING"]
        };
        return selectedCategories.some((cat) => {
          const tags = mapping[cat] || [];
          return project.category.some((projTag) =>
            tags.includes(projTag.toUpperCase())
          );
        });
      };

      return matchesSearch && matchesCategory();
    });
  }, [search, selectedCategories]);

  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    if (sortBy === "trending" || sortBy === "most-joined") {
      return list.sort((a, b) => b.members - a.members);
    }
    if (sortBy === "newest") {
      return list.sort((a, b) => b.id - a.id);
    }
    return list;
  }, [filteredProjects, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategories(["All"]);
    setSortBy("trending");
  };

  return (
    <div className="min-h-screen bg-page">
      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-10 lg:px-8">
        <aside className="w-full shrink-0 lg:w-[300px]">
          <Card className="rounded-xl border border-border bg-white shadow-sm">
            <CardContent className="space-y-6 p-6">
              <SearchBar value={search} onChange={setSearch} />
              <CategoryFilter
                categories={["All", ...categories]}
                selected={selectedCategories}
                onSelect={(category) => {
                  setSelectedCategories((prev) => {
                    if (category === "All") {
                      return ["All"];
                    }
                    const next = prev.filter((c) => c !== "All");
                    if (next.includes(category)) {
                      const updated = next.filter((c) => c !== category);
                      return updated.length === 0 ? ["All"] : updated;
                    } else {
                      return [...next, category];
                    }
                  });
                }}
              />
              <Button
                variant="outline"
                className="h-11 w-full rounded-xl border-border text-sm font-medium transition-all hover:bg-muted/50"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Support
            </a>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Discover Ideas
            </h1>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                SORT BY:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-9 min-w-[140px] rounded-lg border-0 bg-transparent font-medium shadow-none focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ProjectList projects={sortedProjects} />
        </main>
      </div>
    </div>
  );
}
