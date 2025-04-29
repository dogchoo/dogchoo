import { DialogActions } from "@/store/dialog/actions";
import { ActionType, ExtractPayload } from "@/store/types";

type DialogType = ActionType<DialogActions> | null;

export type DialogStoreState = {
  isOpen: boolean;
  dialogData?: ExtractPayload<DialogActions> | null;
  dialogType: DialogType;

  actions: {
    open: (dialogType: DialogType) => void;
    openWithAction: (dialogAction: DialogActions) => void;
    close: () => void;
  };
};
