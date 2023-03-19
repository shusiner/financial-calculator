import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type Loan = {
  interest: number
  period: number
  principal: number
  isMonth: boolean
  amount: number
}

type State = {
  interest: number
  period: number
  principal: number
  isMonth: boolean
  _hasHydrated: boolean
  loans: Loan[]
}

type Action = {
  updateInterest: (interest: State["interest"]) => void
  updatePeriod: (period: State["period"]) => void
  updatePrincipal: (principal: State["principal"]) => void
  updateIsMonth: (isMonth: State["isMonth"]) => void
  addLoan: (loan: Loan) => void
  removeLoan: (index: number) => void
  setHasHydrated: (_hasHydrated: State["_hasHydrated"]) => void
}

export const useStore = create<State & Action>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        })
      },
      interest: 7.5,
      period: 15,
      principal: 200000,
      isMonth: true,
      loans: [],
      updateInterest: (interest) => set(() => ({ interest: interest })),
      updatePeriod: (period) => set(() => ({ period: period })),
      updatePrincipal: (principal) => set(() => ({ principal: principal })),
      updateIsMonth: (isMonth) => set(() => ({ isMonth: isMonth })),
      addLoan: (loan) =>
        set(() => ({
          loans: [...get().loans].concat([loan]),
        })),
      removeLoan: (index) =>
        set(() => ({ loans: get().loans.filter((_, i) => i !== index) })),
    }),
    {
      name: "food-storage", // name of item in the storage (must be unique)
      //   storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
      //   partialize: (state) => ({ interest: state.interest }),
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
      },
    }
  )
)

export default useStore
