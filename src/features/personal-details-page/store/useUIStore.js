import { create } from 'zustand'

let toastTimeoutId = null

export const useUIStore = create((set) => ({
  activeView: 'workspace',
  activeModal: null, // 'create-idea' | 'contact-founder' | 'members-roster' | 'edit-role' | 'help'
  editingMemberId: null,
  toastMessage: null,
  isEditingHeader: false,
  headerEditDraft: null,

  setActiveView: (view) => set({ activeView: view }),

  // The draft is seeded in the same call that flips isEditingHeader on, so
  // consumers never see "editing" without a draft to read from.
  startEditHeader: (draft) => set({ isEditingHeader: true, headerEditDraft: draft }),
  stopEditHeader: () => set({ isEditingHeader: false, headerEditDraft: null }),
  setHeaderEditDraft: (draft) => set({ headerEditDraft: draft }),

  openModal: (modal, meta = {}) => set({ activeModal: modal, ...meta }),

  closeModal: () => set({ activeModal: null, editingMemberId: null }),

  showToast: (message) => {
    clearTimeout(toastTimeoutId)
    set({ toastMessage: message })
    toastTimeoutId = setTimeout(() => set({ toastMessage: null }), 4000)
  },
}))
