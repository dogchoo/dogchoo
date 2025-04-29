import AdminTab from "@/app/(admin)/_admin-tab";
import ModalProvider from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { HomeIcon, UserCog2 } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto space-y-4 px-2 py-6">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="cursor-pointer"
        >
          <Button variant="outline">
            <HomeIcon />
            홈으로
          </Button>
        </Link>

        <UserCog2 className="size-5" />
        <p className="text-xl">관리자 페이지</p>
      </div>

      <AdminTab />

      <ModalProvider />

      {children}
    </div>
  );
};

export default AdminLayout;
