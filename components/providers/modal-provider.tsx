"use client";

import TopicModalProvider from "@/features/topic/ui/modals/topic-modal-provider";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <>
      <TopicModalProvider />
    </>
  );
};

export default ModalProvider;
