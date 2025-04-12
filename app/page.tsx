import Link from "next/link";

export default async function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px]">
        <Link
          href={"/welcome"}
          className="underline underline-offset-2"
        >
          테스트 페이지로
        </Link>
      </main>
    </div>
  );
}
