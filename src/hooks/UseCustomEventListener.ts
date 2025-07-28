import { CustomEvents } from "@/app/enums";
import { useEffect } from "react";

export const useCustomEventListener = (document: Document | undefined, eventName: CustomEvents, handleCustomAction: (event: Event) => void) => {
  useEffect(() => {
    if (!document) return

    document.addEventListener(eventName, handleCustomAction);

    return () => {
      document.removeEventListener(eventName, handleCustomAction);
    };
  }, [document, eventName, handleCustomAction])
}