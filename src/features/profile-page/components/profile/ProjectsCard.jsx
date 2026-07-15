import { Network, Shield, FolderGit2, Plus, Eye, EyeOff } from "lucide-react";

export default function ProjectsCard({
  activeTab,
  setActiveTab,
  projects,
  onToggleVisibility,
  onAddProjectClick
}) {
  const tabs = [
    { id: "created", label: "Projects Created" },
    { id: "worked", label: "Projects Worked On" },
    { id: "invested", label: "Projects Invested" }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "network":
        return <Network className="size-5 text-white" />;
      case "shield":
        return <Shield className="size-5 text-white" />;
      default:
        return <FolderGit2 className="size-5 text-white" />;
    }
  };

  return (
    <div className="bg-white dark:bg-[#191c1e] rounded-2xl border border-border overflow-hidden shadow-xs font-sans">
      
      {/* Tabs Header */}
      <div className="bg-[#f2f4f6] dark:bg-[#272c2c] border-b border-border px-6 md:px-8 pt-4">
        <div className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-xs md:text-sm font-semibold transition-all relative whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "text-foreground dark:text-[#F9F8F4]" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary dark:bg-white rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List Content */}
      <div className="p-6 md:p-8 flex flex-col gap-4">
        {projects.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No projects found in this tab.
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-[#1e2224] rounded-xl border border-border hover:border-primary dark:hover:border-[#355B44] hover:shadow-xs transition-all duration-200"
            >
              {/* Left Side: Icon & Details */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Project Icon */}
                <div className="size-11 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  {getIcon(project.iconType)}
                </div>
                
                {/* Title & Desc */}
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm md:text-base text-foreground dark:text-[#F9F8F4] truncate">
                    {project.title}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Visibility Toggle */}
              <button
                type="button"
                onClick={() => onToggleVisibility(project.id)}
                title={project.isPublic ? "Set to Private" : "Set to Public"}
                className={`ml-3 p-2 rounded-lg border transition-all cursor-pointer shrink-0 ${
                  project.isPublic
                    ? "border-border text-muted-foreground hover:border-primary hover:text-primary dark:hover:border-white dark:hover:text-white"
                    : "border-dashed border-border text-muted-foreground/50 hover:border-primary hover:text-primary dark:hover:border-white dark:hover:text-white"
                }`}
              >
                {project.isPublic
                  ? <Eye className="size-4" />
                  : <EyeOff className="size-4" />
                }
              </button>

            </div>
          ))
        )}

        {/* Add New Project Card */}
        <button
          onClick={onAddProjectClick}
          className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border hover:border-primary dark:hover:border-[#355B44] rounded-xl hover:bg-muted/40 transition-all duration-200 cursor-pointer group text-sm md:text-base font-semibold text-primary dark:text-white"
        >
          <Plus className="size-5 group-hover:rotate-90 transition-transform text-primary dark:text-white" />
          <span>Add New Project</span>
        </button>

      </div>

    </div>
  );
}
