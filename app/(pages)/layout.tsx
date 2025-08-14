"use client";

import type React from "react";
import { Suspense } from "react";
import { AppSidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <div className="flex-1">
                        <Navbar />
                        <main className="flex-1 p-6">{children}</main>
                    </div>
                    <AppSidebar activeSection={""} />
                </div>
            </SidebarProvider>
        </Suspense>
    );
}
