import { DialogStoreState } from "@/store/dialog/types";
import { create } from "zustand";

export const useDialogStore = create<DialogStoreState>((set) => ({
  isOpen: false,
  dialogType: null,
  dialogData: null,
  closeCallback: null,

  actions: {
    close: () => {
      set({
        dialogData: null,
        isOpen: false,
        dialogType: null,
      });
    },

    open: (dialogType) => {
      set({
        isOpen: true,
        dialogType,
      });
    },

    openWithAction: (dialogAction) => {
      set({
        isOpen: true,
        dialogType: dialogAction.type,
        dialogData: dialogAction.payload,
      });
    },
  },
}));
