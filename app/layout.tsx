import type React from "react";
import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

// استدعاء الخط الإنجليزي
const inter = Inter({
    subsets: ["latin"],
});

// استدعاء الخط العربي
const notoArabic = Noto_Sans_Arabic({
    subsets: ["arabic"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// دمج الخطين في كلاس واحد
const combinedFonts = `${inter.className} ${notoArabic.className}`;

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
        <html className="scroll-smooth" lang="ar" dir="rtl">
            <body className={combinedFonts}>{children}</body>
        </html>
    );
}
