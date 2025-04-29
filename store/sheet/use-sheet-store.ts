import { SheetStoreState } from "@/store/sheet/types";
import { create } from "zustand";

export const useSheetStore = create<SheetStoreState>((set) => ({
  isOpen: false,
  sheetData: null,
  sheetType: null,

  actions: {
    close: () => {
      set({
        isOpen: false,
        sheetData: null,
        sheetType: null,
      });
    },

    open: (sheetType) => {
      set({
        isOpen: true,
        sheetType,
      });
    },

    openWithAction: (action) => {
      set({
        isOpen: true,
        sheetType: action.type,
        sheetData: action.payload,
      });
    },
  },
}));
