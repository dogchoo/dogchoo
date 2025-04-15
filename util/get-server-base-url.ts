import { headers } from "next/headers";

export const getServerBaseUrl = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  return `${protocol}://${host}`;
};
