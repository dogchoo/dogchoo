import { ReactNode } from "react";

const WelcomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto flex h-full flex-col pt-3">
      <div className="fixed top-2 left-1/2 w-full -translate-x-1/2">
        <p className="text-muted-foreground text-center">종건잡기 기준</p>
        <p className="text-center text-2xl">성요한 vs 장현, 둘중 누가 더 강한가 ?</p>
      </div>

      {children}
    </div>
  );
};

export default WelcomeLayout;
