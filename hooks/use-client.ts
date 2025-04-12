import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useClient = () => {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    let clientId = localStorage.getItem("chatClientId");
    if (!clientId) {
      clientId = uuidv4();
      localStorage.setItem("chatClientId", clientId);
    }
    setClientId(clientId);
  }, []);

  return clientId;
};
