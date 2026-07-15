
import ProfileHeader from './components/layout/ProfileHeader'
import ProfileSidebar from './components/layout/ProfileSidebar'
import BioCard from './components/profile/BioCard'
import ProjectsCard from './components/profile/ProjectsCard'
import Toast from './components/Toast'

// Modals
import CreateIdeaModal from './components/modals/CreateIdeaModal'
import EditBioModal from './components/modals/EditBioModal'
import AddProjectModal from './components/modals/AddProjectModal'
import EditLanguagesModal from './components/modals/EditLanguagesModal'
import EditSkillsModal from './components/modals/EditSkillsModal'
import EditProfileModal from './components/modals/EditProfileModal'

// Hooks
import { useProfileEditing } from './hooks/useProfileEditing'
import { useBioEditing } from './hooks/useBioEditing'
import { useLanguagesEditing } from './hooks/useLanguagesEditing'
import { useSkillsEditing } from './hooks/useSkillsEditing'
import { useProjectsActions } from './hooks/useProjectsActions'

// Stores
import { useUIStore } from '@/store/useUIStore'

export default function ProfilePage() {
  const activeModal = useUIStore((state) => state.activeModal)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)

  // Sub-hooks
  const { profile, requestEdit: editProfile, handleSave: saveProfile } = useProfileEditing()
  const { bioText, requestEdit: editBio, handleSave: saveBio } = useBioEditing()
  const { languages, requestEdit: editLanguages, handleSave: saveLanguages } = useLanguagesEditing()
  const { skills, requestEdit: editSkills, handleSave: saveSkills } = useSkillsEditing()
  const {
    activeTab,
    projects,
    setActiveTab,
    requestAddProject,
    handleAddProject,
    handleToggleVisibility,
  } = useProjectsActions()



  const handleCreateIdea = (ideaForm) => {
    closeModal()
    showToast(`Successfully published idea: "${ideaForm.title}" in Category: ${ideaForm.category}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 font-sans">
      <Toast />

      {/* Header Bar */}
      <ProfileHeader onCreateIdeaClick={() => openModal('create-idea')} />

      {/* Main Grid Layout */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Sidebar Cards (4 cols on large screens) */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            <ProfileSidebar
              languages={languages}
              skills={skills}
              onEditLanguages={editLanguages}
              onEditSkills={editSkills}
              profile={profile}
              onEditProfile={editProfile}
            />
          </div>

          {/* Right Column: Bio, Projects & Expertise Cards (8 cols on large screens) */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            {/* Biography Card */}
            <BioCard 
              bioText={bioText} 
              onEditClick={editBio} 
            />

            {/* Projects tab card */}
            <ProjectsCard
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              projects={projects}
              onToggleVisibility={handleToggleVisibility}
              onAddProjectClick={requestAddProject}
            />
          </div>

        </div>
      </main>

      {/* Modals */}
      <CreateIdeaModal
        isOpen={activeModal === 'create-idea'}
        onClose={closeModal}
        onSubmit={handleCreateIdea}
      />

      <EditBioModal
        isOpen={activeModal === 'edit-bio'}
        bioText={bioText}
        onClose={closeModal}
        onSubmit={saveBio}
      />

      <AddProjectModal
        isOpen={activeModal === 'add-project'}
        activeTab={activeTab}
        onClose={closeModal}
        onSubmit={handleAddProject}
      />

      <EditLanguagesModal
        isOpen={activeModal === 'edit-languages'}
        languages={languages}
        onClose={closeModal}
        onSubmit={saveLanguages}
      />

      <EditSkillsModal
        isOpen={activeModal === 'edit-skills'}
        skills={skills}
        onClose={closeModal}
        onSubmit={saveSkills}
      />

      <EditProfileModal
        isOpen={activeModal === 'edit-profile'}
        profile={profile}
        onClose={closeModal}
        onSubmit={saveProfile}
      />
    </div>
  )
}
