import { SheetActions } from "@/store/sheet/actions";
import { ActionType, ExtractPayload } from "@/store/types";

type SheetType = ActionType<SheetActions> | null;

export type SheetStoreState = {
  isOpen: boolean;
  sheetData?: ExtractPayload<SheetActions> | null;
  sheetType: SheetType;

  actions: {
    open: (sheetType: SheetType) => void;
    openWithAction: (sheetAction: SheetActions) => void;
    close: () => void;
  };
};
