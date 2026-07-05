import React from 'react'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import ProjectHeader from './components/project/ProjectHeader'
import ProjectScopeCard from './components/project/ProjectScopeCard'
import FounderCard from './components/project/FounderCard'
import TeamCard from './components/project/TeamCard'
import StackTagsCard from './components/project/StackTagsCard'
import EditWorkspaceHeaderForm from './components/EditWorkspaceHeaderForm'
import Toast from './components/Toast'
import CreateIdeaModal from './components/modals/CreateIdeaModal'
import ContactFounderModal from './components/modals/ContactFounderModal'
import MembersRosterModal from './components/modals/MembersRosterModal'
import EditRoleModal from './components/modals/EditRoleModal'
import HelpModal from './components/modals/HelpModal'
import { useUIStore } from '@/store/useUIStore'
import { useProjectStore } from '@/store/useProjectStore'
import { useMembersStore } from '@/store/useMembersStore'
import { useHeaderEditing } from './hooks/useHeaderEditing'
import { useTeamActions } from './hooks/useTeamActions'

export default function WorkspacePage() {
  const activeView = useUIStore((state) => state.activeView)
  const activeModal = useUIStore((state) => state.activeModal)
  const editingMemberId = useUIStore((state) => state.editingMemberId)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)

  const { isEditingHeader, headerEditDraft, setHeaderEditDraft, stopEditHeader } = useHeaderEditing()

  const project = useProjectStore((state) => state.project)
  const saveProjectEdits = useProjectStore((state) => state.saveProjectEdits)
  const publishIdea = useProjectStore((state) => state.publishIdea)

  const members = useMembersStore((state) => state.members)
  const { updateMemberRole } = useTeamActions()

  const handleSaveEdit = () => {
    saveProjectEdits(headerEditDraft)
    stopEditHeader()
    showToast('Project details updated successfully!')
  }

  const handleCreateIdea = (title, description) => {
    publishIdea(title, description)
    closeModal()
    showToast(`Created new idea: "${title}"! Page updated.`)
  }

  const handleContactFounder = () => {
    closeModal()
    showToast(`Message sent to ${project.founder.name}!`)
  }

  const handleSaveMemberRole = (role, tag) => {
    updateMemberRole(editingMemberId, { role, tag })
    closeModal()
    showToast('Team member updated successfully!')
  }

  const editingMember = members.find((m) => m.id === editingMemberId) || null

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col font-sans">

      <Navbar />

      <div className="flex flex-1 max-w-[1400px] w-full mx-auto relative">
        <Sidebar />

        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
          {activeView === 'workspace' && (
            <div className="space-y-8 animate-fade-in">

              {isEditingHeader && headerEditDraft ? (
                <EditWorkspaceHeaderForm
                  editState={headerEditDraft}
                  setEditState={setHeaderEditDraft}
                  onSave={handleSaveEdit}
                  onCancel={stopEditHeader}
                />
              ) : (
                <ProjectHeader title={project.title} phase={project.phase} updatedText={project.updatedText} />
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                <div className="lg:col-span-2 space-y-6">
                  <ProjectScopeCard
                    scopeTitle={project.scopeTitle}
                    scopeParagraphs={project.scopeParagraphs}
                    isEditing={isEditingHeader && !!headerEditDraft}
                    editState={headerEditDraft}
                    setEditState={setHeaderEditDraft}
                  />
                </div>

                <div className="space-y-6">
                  <FounderCard
                    name={project.founder.name}
                    role={project.founder.role}
                    avatar={project.founder.avatar}
                    onContactClick={() => openModal('contact-founder')}
                  />

                  <TeamCard
                    members={project.members}
                    totalMembersCount={project.totalMembersCount}
                    onViewAllClick={() => openModal('members-roster')}
                  />

                  <StackTagsCard
                    tags={project.tags}
                    isEditing={isEditingHeader && !!headerEditDraft}
                    editState={headerEditDraft}
                    setEditState={setHeaderEditDraft}
                  />
                </div>

              </div>

            </div>
          )}
        </main>
      </div>

      <Toast />

      <CreateIdeaModal
        open={activeModal === 'create-idea'}
        onClose={closeModal}
        onSubmit={handleCreateIdea}
      />

      <ContactFounderModal
        open={activeModal === 'contact-founder'}
        founderName={project.founder.name}
        founderEmail={project.founder.email}
        onClose={closeModal}
        onSubmit={handleContactFounder}
      />

      <MembersRosterModal
        open={activeModal === 'members-roster'}
        members={members}
        onClose={closeModal}
      />

      <EditRoleModal
        open={activeModal === 'edit-role'}
        member={editingMember}
        onBack={() => openModal('members-roster')}
        onSubmit={handleSaveMemberRole}
      />

      <HelpModal open={activeModal === 'help'} onClose={closeModal} />

    </div>
  )
}
