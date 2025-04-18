"use client";

const Error = ({ error }: { error: any; reset: () => void }) => {
  console.log(error);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-100">
      <p className="text-muted-foreground">알 수 없는 오류가 발생했습니다.</p>
    </div>
  );
};

export default Error;
