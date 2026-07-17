import { useNavigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import ProjectHeader from './components/project/ProjectHeader'
import ProjectScopeCard from './components/project/ProjectScopeCard'
import FounderCard from './components/project/FounderCard'
import TeamCard from './components/project/TeamCard'
import StackTagsCard from './components/project/StackTagsCard'
import PendingRequestsCard from './components/project/PendingRequestsCard'
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
import { useIsFounder } from './hooks/useIsFounder'

export default function WorkspacePage() {
  const navigate = useNavigate()
  const activeView = useUIStore((state) => state.activeView)
  const activeModal = useUIStore((state) => state.activeModal)
  const editingMemberId = useUIStore((state) => state.editingMemberId)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)
  const isFounder = useIsFounder()

  const { isEditingHeader, headerEditDraft, setHeaderEditDraft, stopEditHeader } = useHeaderEditing()

  const project = useProjectStore((state) => state.project)
  const saveProjectEdits = useProjectStore((state) => state.saveProjectEdits)
  const publishIdea = useProjectStore((state) => state.publishIdea)

  const members = useMembersStore((state) => state.members)
  const { updateMemberRole } = useTeamActions()
  const setActiveView = useUIStore((state) => state.setActiveView)

  const handleDeleteProject = () => {
    if (window.confirm("Are you sure you want to delete this Project Idea? This action cannot be undone.")) {
      useProjectStore.getState().deleteProject(project.id)
      stopEditHeader()
      showToast(`Successfully deleted project "${project.title}".`)
      navigate('/home')
    }
  }

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
                  onDelete={handleDeleteProject}
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

                  {/* Render Pending Join Requests Card for Founder */}
                  {isFounder && <PendingRequestsCard />}

                  <TeamCard
                    members={project.members}
                    totalMembersCount={project.totalMembersCount}
                    onViewAllClick={() => setActiveView('members')}
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

          {/* Members Space Tab View */}
          {activeView === 'members' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="flex items-center justify-between select-none">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-brand-primary">Team Members</h2>
                  <p className="text-xs text-brand-text-muted mt-1 font-medium">{project.members.length} professionals active on this project</p>
                </div>
              </div>

              <div className="bg-white border border-[#e1e4ea] rounded-[16px] overflow-hidden shadow-sm">
                <div className="p-6 space-y-4">
                  <h4 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider pb-2 border-b">Roster List</h4>
                  
                  <div className="space-y-4 divide-y divide-gray-100">
                    {/* Render Founder as primary member first */}
                    <div className="flex items-center justify-between pb-4 first:pt-0">
                      <div className="flex items-center gap-4">
                        <img
                          src={project.founder.avatar}
                          alt={project.founder.name}
                          className="w-12 h-12 rounded-xl object-cover border border-brand-border shadow-xs"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                          }}
                        />
                        <div>
                          <h5 className="text-sm font-bold text-brand-primary flex items-center gap-2">
                            {project.founder.name}
                            <span className="bg-[#e8fbf0] text-[#1b7a43] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#1b7a43]/10 uppercase">
                              Founder
                            </span>
                          </h5>
                          <p className="text-xs text-brand-text-muted mt-0.5">{project.founder.role}</p>
                          <p className="text-[10px] text-brand-text-muted/70">{project.founder.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Render other team members */}
                    {project.members.map((m) => (
                      <div key={m.id} className="flex items-center justify-between pt-4 pb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-12 h-12 rounded-xl object-cover border border-brand-border shadow-xs"
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                            }}
                          />
                          <div>
                            <h5 className="text-sm font-bold text-brand-primary">{m.name}</h5>
                            <p className="text-xs text-brand-text-muted mt-0.5">{m.role}</p>
                            {m.tag && (
                              <span className="inline-block bg-[#e8efff] text-[#2563eb] text-[9px] font-bold px-2 py-0.5 rounded-md mt-1">
                                {m.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Founder Action: Remove Member */}
                        {isFounder && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              useProjectStore.getState().removeMemberFromProject(m.id)
                              useMembersStore.getState().removeMember(m.id)
                              showToast(`Removed member ${m.name} from the project.`)
                            }}
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 text-xs font-bold px-4 py-2 h-9 rounded-lg cursor-pointer"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}

                    {project.members.length === 0 && (
                      <div className="py-8 text-center text-sm text-brand-text-muted">
                        No team members currently assigned. Accept join requests to add professionals.
                      </div>
                    )}
                  </div>
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
