"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useContender } from "@/features/contender/hooks/use-contender";
import { ContenderItem } from "@/features/contender/model/types/contender-item";
import Image from "next/image";

const ContenderCard = ({ contender }: { contender: ContenderItem }) => {
  const { data, isLoading } = useContender(contender.path);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <Skeleton className="mb-1 h-[20px] w-36 rounded-sm" />
        <Skeleton className="mb-2 h-[16px] w-36 rounded-sm" />
        <Skeleton className="h-36 w-36 rounded-md" />
      </div>
    );
  }

  return (
    <div className="text-center">
      <p>{contender.title}</p>
      <p className="text-muted-foreground text-xs">{contender.description}</p>
      <Image
        src={data}
        width={256}
        height={256}
        alt=""
        className="mt-2 aspect-square size-36 rounded-md border object-cover object-center"
      />
    </div>
  );
};

export default ContenderCard;
