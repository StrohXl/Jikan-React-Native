import { ReactNode } from "react";

export interface BottomSheetProps {
  activeHeight: number;
  children: ReactNode;
  backgroundColor?: string;
  backDropColor?: string;
}

export interface BottomSheetHandle {
  openSheet: () => void;
  closeSheet: () => void;
}
