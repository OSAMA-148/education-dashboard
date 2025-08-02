"use client"

import { useState } from "react"
import { Bell, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/layout/sidebar"
import { DashboardOverview } from "@/components/dashboard/overview"
import { TeachersSection } from "@/components/dashboard/teachers"
import { StudentsSection } from "@/components/dashboard/students"
import { ScheduleSection } from "@/components/dashboard/schedule"
import { StudyMaterialsSection } from "@/components/dashboard/materials"
import { FeeManagementSection } from "@/components/dashboard/fees"
import { MessagesSection } from "@/components/dashboard/messages"
import { AnalyticsSection } from "@/components/dashboard/analytics"

export default function EducationDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const router = useRouter()

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "teachers":
        return <TeachersSection />
      case "students":
        return <StudentsSection />
      case "schedule":
        return <ScheduleSection />
      case "materials":
        return <StudyMaterialsSection />
      case "fees":
        return <FeeManagementSection />
      case "messages":
        return <MessagesSection />
      case "analytics":
        return <AnalyticsSection />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full" dir="rtl">
        <div className="flex-1">
          <header className="flex h-16 items-center flex-row-reverse gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="البحث..." className="pr-9" />
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>إد</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">المستخدم الإداري</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@educenter.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/signin")}>
                  <User className="ml-2 h-4 w-4" />
                  <span>تسجيل الدخول</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-6">{renderContent()}</main>
        </div>
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </SidebarProvider>
  )
}
