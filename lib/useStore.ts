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
      name: "finance-storage", // name of item in the storage (must be unique)
      //   storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
      //   partialize: (state) => ({ interest: state.interest }),
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true)
      },
      version: 0,
      migrate: (persistedState, version) => {
        switch (version) {
          case 0:
            break
          // reference from https://github.com/ztjhz/FreeChatGPT/blob/main/src/store/store.ts
          // case 0:
          //   migrateV0(persistedState as LocalStorageInterfaceV0ToV1);
          // case 1:
          //   migrateV1(persistedState as LocalStorageInterfaceV1ToV2);
          // case 2:
          //   migrateV2(persistedState as LocalStorageInterfaceV2ToV3);
          // case 3:
          //   migrateV3(persistedState as LocalStorageInterfaceV3ToV4);
          // case 4:
          //   migrateV4(persistedState as LocalStorageInterfaceV4ToV5);
          // case 5:
          //   migrateV5(persistedState as LocalStorageInterfaceV5ToV6);
          //   break;
        }
        return persistedState as State & Action
      },
    }
  )
)

export default useStore
