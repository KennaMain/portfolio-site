import { CustomEvents } from "@/app/enums";
import { useEffect } from "react";

export const useCustomEventListener = (document: Document, eventName: CustomEvents, handleCustomAction: (event: Event) => void) => {
  useEffect(() => {
    document.addEventListener(eventName, handleCustomAction);

    return () => {
      document.removeEventListener(eventName, handleCustomAction);
    };
  }, [])
}