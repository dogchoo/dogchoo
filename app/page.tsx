import { Button } from "@/components/ui/button";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px]">
        <Image
          src={Logo}
          alt=""
          width={148}
          height={148}
          style={{
            borderRadius: 20,
          }}
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-muted-foreground">오늘의 주제</p>
          <p className="text-xl">성요한 VS 장현 둘중 누가 더 강한가?</p>

          <Button
            size="lg"
            className="mt-6 w-full"
          >
            <Link href="/welcome">지금 바로 갈드컵 참여하기 !!</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
