import React, { useState } from 'react'
import { Plus, X, Save, Send, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'
import ProjectHeader from '../components/project/ProjectHeader'
import ProjectScopeCard from '../components/project/ProjectScopeCard'
import FounderCard from '../components/project/FounderCard'
import TeamCard from '../components/project/TeamCard'
import StackTagsCard from '../components/project/StackTagsCard'
import { initialProjectData, allMockMembers } from '../data/projectData'
import { Button } from '@/components/ui/button'

export default function Workspace() {
  // Page state
  const [projectData, setProjectData] = useState(initialProjectData)
  const [activeView, setActiveView] = useState('workspace')
  const [isEditing, setIsEditing] = useState(false)
  const [editState, setEditState] = useState(null)
  
  // Roster / Member states
  const [allMembers, setAllMembers] = useState(allMockMembers)
  
  // Modal / Toast states
  const [activeModal, setActiveModal] = useState(null) // 'create-idea' | 'contact-founder' | 'members-roster' | 'help' | 'edit-role'
  const [toastMessage, setToastMessage] = useState(null)

  // Current logged in user (for role-based workspace settings access demo)
  const userElizabeth = {
    name: "Elizabeth Vance",
    email: "elizabeth.vance@creazione.com",
    role: "UX Strategy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
  }
  
  const userAris = {
    name: "Dr. Aris Thorne",
    email: "aris.thorne@creazione.com",
    role: "Chief Architect",
    avatar: "/src/assets/founder_aris.jpg"
  }

  const [currentUser, setCurrentUser] = useState(userElizabeth)

  const handleUserSwitch = () => {
    if (currentUser.email === userElizabeth.email) {
      setCurrentUser(userAris)
      triggerToast("Logged in as Dr. Aris Thorne (Project Founder)!")
    } else {
      setCurrentUser(userElizabeth)
      setIsEditing(false)
      triggerToast("Logged in as Elizabeth Vance (UX Strategy)!")
    }
  }

  const isFounder = currentUser.email === projectData.founder.email
  
  // Custom interactive states
  const [contactSubject, setContactSubject] = useState('')
  const [contactBody, setContactBody] = useState('')
  const [newIdeaTitle, setNewIdeaTitle] = useState('')
  const [newIdeaDescription, setNewIdeaDescription] = useState('')
  
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [tempMemberRole, setTempMemberRole] = useState('')
  const [tempMemberTag, setTempMemberTag] = useState('')
  
  const [newMemberName, setNewMemberName] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('')
  const [newMemberTag, setNewMemberTag] = useState('')

  // Show Toast Feedback
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // --- HANDLERS ---
  
  // Edit mode toggle
  const handleStartEdit = () => {
    if (!isFounder) {
      triggerToast("Access Denied: Only the Project Founder can edit settings.")
      return
    }
    setEditState({
      title: projectData.title,
      phase: projectData.phase,
      scopeTitle: projectData.scopeTitle,
      scopeParagraphs: [...projectData.scopeParagraphs],
      scopeBullets: [...projectData.scopeBullets || []],
      tags: [...projectData.tags]
    })
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    setProjectData({
      ...projectData,
      title: editState.title,
      phase: editState.phase,
      scopeTitle: editState.scopeTitle,
      scopeParagraphs: editState.scopeParagraphs,
      scopeBullets: editState.scopeBullets,
      tags: editState.tags
    })
    setIsEditing(false)
    triggerToast("Project details updated successfully!")
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditState(null)
  }

  // Create Idea logic
  const handleCreateIdea = (e) => {
    e.preventDefault()
    if (!newIdeaTitle.trim()) return
    
    // Simulate updating project with new idea details
    setProjectData({
      ...projectData,
      title: newIdeaTitle,
      scopeParagraphs: [newIdeaDescription || "No description provided."],
      scopeBullets: [],
      phase: "IDEATION"
    })
    
    setNewIdeaTitle('')
    setNewIdeaDescription('')
    setActiveModal(null)
    triggerToast(`Created new idea: "${newIdeaTitle}"! Page updated.`)
  }

  // Contact Founder logic
  const handleContactFounder = (e) => {
    e.preventDefault()
    if (!contactSubject.trim()) return
    
    setContactSubject('')
    setContactBody('')
    setActiveModal(null)
    triggerToast(`Message sent to ${projectData.founder.name}!`)
  }

  // Edit Team Member Role logic
  const handleOpenEditRole = (memberId) => {
    const member = allMembers.find(m => m.id === memberId)
    if (member) {
      setSelectedMemberId(memberId)
      setTempMemberRole(member.role)
      setTempMemberTag(member.tag || '')
      setActiveModal('edit-role')
    }
  }

  const handleSaveMemberRole = (e) => {
    e.preventDefault()
    const updatedMembers = allMembers.map(m => {
      if (m.id === selectedMemberId) {
        return { ...m, role: tempMemberRole, tag: tempMemberTag }
      }
      return m
    })
    setAllMembers(updatedMembers)
    
    // Also sync the two primary display members in projectData
    const updatedProjectMembers = projectData.members.map(m => {
      if (m.id === selectedMemberId) {
        return { ...m, role: tempMemberRole, tag: tempMemberTag }
      }
      return m
    })
    
    setProjectData({
      ...projectData,
      members: updatedProjectMembers
    })
    
    setActiveModal(null)
    triggerToast("Team member updated successfully!")
  }

  // Delete Member logic
  const handleRemoveMember = (memberId) => {
    const updatedMembers = allMembers.filter(m => m.id !== memberId)
    setAllMembers(updatedMembers)
    
    // Sync main display members list
    const updatedProjectMembers = projectData.members.filter(m => m.id !== memberId)
    
    setProjectData({
      ...projectData,
      members: updatedProjectMembers,
      totalMembersCount: updatedMembers.length
    })
    triggerToast("Member removed from the team.")
  }

  // Add new member to roster
  const handleAddMember = (e) => {
    e.preventDefault()
    if (!newMemberName.trim() || !newMemberRole.trim()) return
    
    const newId = String(allMembers.length + 1)
    const newMemberObj = {
      id: newId,
      name: newMemberName,
      role: newMemberRole,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=crop&q=80&w=120`,
      tag: newMemberTag.trim() || undefined
    }

    const updatedMembers = [...allMembers, newMemberObj]
    setAllMembers(updatedMembers)
    
    // If we have fewer than 2 active members shown in the project card, append this to the display list too
    let updatedProjectMembers = [...projectData.members]
    if (updatedProjectMembers.length < 2) {
      updatedProjectMembers.push(newMemberObj)
    }

    setProjectData({
      ...projectData,
      members: updatedProjectMembers,
      totalMembersCount: updatedMembers.length
    })

    setNewMemberName('')
    setNewMemberRole('')
    setNewMemberTag('')
    triggerToast(`${newMemberName} added to the team!`)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar 
        onSettingsClick={handleStartEdit}
        currentUser={currentUser}
        onUserSwitch={handleUserSwitch}
        isFounder={isFounder}
      />

      {/* Main Container Layout */}
      <div className="flex flex-1 max-w-[1400px] w-full mx-auto relative">
        
        {/* Left Sidebar */}
        <Sidebar 
          activeView={activeView}
          onViewChange={setActiveView}
          onMembersClick={() => setActiveModal('members-roster')}
          onSettingsClick={handleStartEdit}
          onHelpClick={() => setActiveModal('help')}
          isFounder={isFounder}
        />

        {/* Content Container */}
        <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
          
          {/* Main workspace view */}
          {activeView === 'workspace' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Conditional Edit Header Form */}
              {isEditing ? (
                <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-6 shadow-sm mb-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-brand-border pb-3">
                    <h2 className="font-serif text-lg font-bold text-brand-primary select-none">
                      Edit Workspace Settings
                    </h2>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleSaveEdit}
                        className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Title input */}
                    <div>
                      <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Project Idea Title</label>
                      <input
                        type="text"
                        value={editState.title}
                        onChange={(e) => setEditState({ ...editState, title: e.target.value })}
                        className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Static header */
                <ProjectHeader 
                  title={projectData.title}
                  phase={projectData.phase}
                  updatedText={projectData.updatedText}
                />
              )}

              {/* Main Content Columns Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Left Column (Detailed scope) */}
                <div className="lg:col-span-2 space-y-6">
                  <ProjectScopeCard 
                    scopeTitle={projectData.scopeTitle}
                    scopeParagraphs={projectData.scopeParagraphs}
                    isEditing={isEditing}
                    editState={editState}
                    setEditState={setEditState}
                  />
                </div>

                {/* Right Column (Founder, Team, Tags) */}
                <div className="space-y-6">
                  
                  {/* Project Founder */}
                  <FounderCard 
                    name={projectData.founder.name}
                    role={projectData.founder.role}
                    avatar={projectData.founder.avatar}
                    onContactClick={() => setActiveModal('contact-founder')}
                  />

                  {/* Team Members */}
                  <TeamCard 
                    members={projectData.members}
                    totalMembersCount={projectData.totalMembersCount}
                    onViewAllClick={() => setActiveModal('members-roster')}
                  />

                  {/* Stack & Tags */}
                  <StackTagsCard 
                    tags={projectData.tags}
                    isEditing={isEditing}
                    editState={editState}
                    setEditState={setEditState}
                  />

                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* --- FLOATING TOAST FEEDBACK --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1b3022] text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-lg border border-white/10 animate-slide-up select-none">
          <CheckCircle2 className="w-4 h-4 text-[#819986]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* --- MODAL DIALOGS OVERLAYS --- */}

      {/* 1. CREATE IDEA MODAL */}
      {activeModal === 'create-idea' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-lg shadow-xl overflow-hidden animate-zoom-in">
            <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-border">
              <h3 className="font-serif text-lg font-bold text-brand-primary">Publish New Project Idea</h3>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-gray-400 hover:text-brand-primary p-1 rounded-md hover:bg-gray-200/50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateIdea} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Project Idea Title</label>
                <input
                  type="text"
                  required
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                  className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all font-semibold"
                  placeholder="e.g. Decentralized Storage System"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Description / Project Scope</label>
                <textarea
                  required
                  value={newIdeaDescription}
                  onChange={(e) => setNewIdeaDescription(e.target.value)}
                  className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all min-h-[120px]"
                  placeholder="Provide details about your project architecture, requirements, and target goals."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
                <Button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Idea</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. CONTACT FOUNDER MODAL */}
      {activeModal === 'contact-founder' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-lg shadow-xl overflow-hidden animate-zoom-in">
            <div className="flex items-center justify-between px-6 py-4 bg-[#1b3022] text-white">
              <div>
                <h3 className="font-serif text-base font-bold">Contact Founder</h3>
                <p className="text-[10px] text-[#819986] font-semibold mt-0.5">Send message to {projectData.founder.name}</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-white/60 hover:text-white p-1 rounded-md hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleContactFounder} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">To</label>
                <input
                  type="text"
                  disabled
                  value={`${projectData.founder.name} (${projectData.founder.email})`}
                  className="w-full text-xs border border-brand-border rounded-[4px] px-3 py-2 bg-gray-100 font-semibold text-brand-text-muted"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all"
                  placeholder="Inquiry regarding Cloud Orchestration"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Message Content</label>
                <textarea
                  required
                  value={contactBody}
                  onChange={(e) => setContactBody(e.target.value)}
                  className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all min-h-[140px]"
                  placeholder="Hi Dr. Thorne, I would like to join/discuss..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
                <Button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MEMBERS ROSTER MODAL */}
      {activeModal === 'members-roster' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-md shadow-xl overflow-hidden animate-zoom-in flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-border shrink-0">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-primary">Team Members Roster</h3>
                <p className="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider">{allMembers.length} active professionals</p>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-gray-400 hover:text-brand-primary p-1 rounded-md hover:bg-gray-200/50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Members List */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider select-none border-b pb-1">Current Members</h4>
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-2">
                  {allMembers.map((m) => (
                    <div key={m.id} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={m.avatar} 
                          alt={m.name} 
                          className="w-10 h-10 rounded-md object-cover border border-brand-border shadow-sm"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                          }}
                        />
                        <div>
                          <h5 className="text-xs font-bold text-brand-primary">{m.name}</h5>
                          <p className="text-[10px] text-brand-text-muted mt-0.5">{m.role}</p>
                          {m.tag && (
                            <span className="inline-block bg-[#e8efff] text-[#2563eb] text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] mt-1">
                              {m.tag}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-brand-border bg-brand-bg flex justify-end shrink-0">
              <Button
                onClick={() => setActiveModal(null)}
                className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer"
              >
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* 4. EDIT ROLE MODAL */}
      {activeModal === 'edit-role' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-sm shadow-xl overflow-hidden animate-zoom-in">
            <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-border">
              <h3 className="font-serif text-sm font-bold text-brand-primary">Modify Member Role</h3>
              <button 
                onClick={() => setActiveModal('members-roster')} 
                className="text-gray-400 hover:text-brand-primary p-1 rounded-md hover:bg-gray-200/50 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMemberRole} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={tempMemberRole}
                  onChange={(e) => setTempMemberRole(e.target.value)}
                  className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all"
                  placeholder="e.g. Lead DevOps Engineer"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Check Tag / Badge</label>
                <input
                  type="text"
                  value={tempMemberTag}
                  onChange={(e) => setTempMemberTag(e.target.value)}
                  className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all"
                  placeholder="e.g. Core Migration"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
                <Button
                  type="button"
                  onClick={() => setActiveModal('members-roster')}
                  className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer uppercase"
                >
                  Save Updates
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. HELP MODAL */}
      {activeModal === 'help' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-lg shadow-xl overflow-hidden animate-zoom-in">
            <div className="px-6 py-5 bg-[#1b3022] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#819986]" />
                <h3 className="font-serif text-lg font-bold">Creazione Help Guide</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)} 
                className="text-white/60 hover:text-white p-1 rounded-md hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-sm text-brand-text-muted leading-relaxed">
              <p className="font-semibold text-brand-primary">Welcome to Creazione Workspace!</p>
              <p>This workspace serves as the centralized interior hub for your project concept, allowing team coordination, architectural planning, and founder consultations.</p>
              
              <div className="bg-brand-bg p-3.5 rounded-lg border border-brand-border space-y-2">
                <h4 className="text-[11px] font-extrabold text-brand-primary uppercase tracking-wider">Features Cheatsheet</h4>
                <ul className="list-disc list-inside text-xs space-y-1.5">
                  <li><strong className="text-brand-primary">Edit Project:</strong> Modify titles, descriptions, and customize stack tags.</li>
                  <li><strong className="text-brand-primary">Team Management:</strong> View the active team members roster.</li>
                  <li><strong className="text-brand-primary">Contact Founder:</strong> Instantly launch the communication portal directly inside the dashboard.</li>
                </ul>
              </div>

              <div className="flex justify-end pt-2 border-t border-brand-border">
                <Button
                  onClick={() => setActiveModal(null)}
                  className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-5 py-2.5 rounded-[4px] cursor-pointer"
                >
                  Got It
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
