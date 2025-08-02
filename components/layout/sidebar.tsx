"use client";

import {
    Calendar,
    DollarSign,
    GraduationCap,
    Home,
    MessageSquare,
    TrendingUp,
    Upload,
    Users,
    UserCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
    { title: "لوحة التحكم", icon: Home, id: "dashboard", href: "/dashboard" },
    {
        title: "المعلمون",
        icon: UserCheck,
        id: "teachers",
        href: "/dashboard/teachers",
    },
    {
        title: "الطلاب",
        icon: Users,
        id: "students",
        href: "/dashboard/students",
    },
    {
        title: "الجدول الزمني",
        icon: Calendar,
        id: "schedule",
        href: "/dashboard/schedule",
    },
    {
        title: "المواد الدراسية",
        icon: Upload,
        id: "materials",
        href: "/dashboard/materials",
    },
    {
        title: "إدارة الرسوم",
        icon: DollarSign,
        id: "fees",
        href: "/dashboard/fees",
    },
    {
        title: "الرسائل",
        icon: MessageSquare,
        id: "messages",
        href: "/dashboard/messages",
    },
    {
        title: "التحليلات",
        icon: TrendingUp,
        id: "analytics",
        href: "/dashboard/analytics",
    },
];

interface AppSidebarProps {
    activeSection: string;
}

export function AppSidebar({ activeSection }: AppSidebarProps) {
    const pathname = usePathname();

    return (
        <Sidebar side="left">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                    <GraduationCap className="h-8 w-8 text-blue-600" />
                    <div>
                        <h2 className="text-lg font-semibold">
                            مركز التعليم الاحترافي
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            نظام الإدارة
                        </p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>إد</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                المستخدم الإداري
                            </p>
                            <p className="text-xs text-muted-foreground">
                                مدير النظام
                            </p>
                        </div>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
