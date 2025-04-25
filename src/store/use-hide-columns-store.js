import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useHiddenColumnStore = create(
  persist(
    (set) => ({
      hiddenColumns: {},
      setHiddenColumn: (tableId, columnId, isHidden) =>
        set((state) => ({
          hiddenColumns: {
            ...state.hiddenColumns,
            [tableId]: {
              ...state.hiddenColumns[tableId],
              [columnId]: isHidden,
            },
          },
        })),
      resetHiddenColumns: (tableId) =>
        set((state) => ({
          hiddenColumns: {
            ...state.hiddenColumns,
            [tableId]: {},
          },
        })),
    }),
    {
      name: "hidden-columns",
      getStorage: () => localStorage,
    }
  )
);
