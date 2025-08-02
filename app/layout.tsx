import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "مركز التعليم الاحترافي - نظام الإدارة",
    description: "نظام إدارة شامل للمراكز التعليمية",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <body className={inter.className}>
                <SidebarProvider>{children}</SidebarProvider>
            </body>
        </html>
    );
}
