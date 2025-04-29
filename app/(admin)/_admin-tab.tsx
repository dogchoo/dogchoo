"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

const AdminTab = () => {
  return (
    <Suspense>
      <Tabs
        baseUrl="/admin"
        defaultValue="topic"
        className="w-full"
      >
        <TabsList className="ml-auto rounded-md">
          <TabsTrigger value="topic">주제 관리</TabsTrigger>
          <TabsTrigger value="contender">대상 관리</TabsTrigger>
          <TabsTrigger value="message">메시지 관리</TabsTrigger>
          <TabsTrigger value="user">사용자 관리</TabsTrigger>
        </TabsList>
      </Tabs>
    </Suspense>
  );
};

export default AdminTab;
