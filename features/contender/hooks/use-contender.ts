import { getStorageDownloadURL } from "@/libs/utils";
import { useQuery } from "@tanstack/react-query";

const IMAGE_PATH = "contender-images";

export const useContender = (filename: string) => {
  return useQuery({
    queryKey: ["CONTENDER_IMAGE", filename],
    queryFn: () => getStorageDownloadURL(`${IMAGE_PATH}/${filename}`),
    enabled: !!filename,
  });
};
