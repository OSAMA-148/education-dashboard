"use client";

import { useState } from "react";
import { Plus, CalendarIcon, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const initialClasses = [
    {
        id: 1,
        subject: "Mathematics",
        teacher: "Dr. Sarah Johnson",
        time: "09:00 - 10:30",
        room: "Room A1",
        students: 25,
        date: "2024-01-15",
        status: "Scheduled",
    },
    {
        id: 2,
        subject: "Physics",
        teacher: "Prof. Michael Chen",
        time: "11:00 - 12:30",
        room: "Lab B2",
        students: 20,
        date: "2024-01-15",
        status: "Scheduled",
    },
    {
        id: 3,
        subject: "Chemistry",
        teacher: "Dr. Emily Davis",
        time: "14:00 - 15:30",
        room: "Lab C1",
        students: 18,
        date: "2024-01-15",
        status: "Completed",
    },
    {
        id: 4,
        subject: "Biology",
        teacher: "Prof. James Wilson",
        time: "16:00 - 17:30",
        room: "Room D1",
        students: 22,
        date: "2024-01-15",
        status: "Cancelled",
    },
];

const timeSlots = [
    "08:00 - 09:30",
    "09:00 - 10:30",
    "10:00 - 11:30",
    "11:00 - 12:30",
    "13:00 - 14:30",
    "14:00 - 15:30",
    "15:00 - 16:30",
    "16:00 - 17:30",
    "17:00 - 18:30",
];

const rooms = [
    "Room A1",
    "Room A2",
    "Room B1",
    "Room B2",
    "Lab C1",
    "Lab C2",
    "Lab D1",
    "Lab D2",
];

export function ScheduleSection() {
    const [classes, setClasses] = useState(initialClasses);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [newClass, setNewClass] = useState({
        subject: "",
        teacher: "",
        time: "",
        room: "",
        date: "",
    });

    const handleAddClass = () => {
        const classItem = {
            id: classes.length + 1,
            ...newClass,
            students: 0,
            status: "Scheduled",
        };
        setClasses([...classes, classItem]);
        setNewClass({ subject: "", teacher: "", time: "", room: "", date: "" });
        setIsAddDialogOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Scheduled":
                return "default";
            case "Completed":
                return "secondary";
            case "Cancelled":
                return "destructive";
            default:
                return "default";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">إدارة الجدول</h2>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            جدولة حصة
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>جدولة حصة جديدة</DialogTitle>
                            <DialogDescription>
                                أضف حصة جديدة إلى الجدول.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                    المادة
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setNewClass({
                                            ...newClass,
                                            subject: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="اختر المادة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mathematics">
                                            الرياضيات
                                        </SelectItem>
                                        <SelectItem value="Physics">
                                            الفيزياء
                                        </SelectItem>
                                        <SelectItem value="Chemistry">
                                            الكيمياء
                                        </SelectItem>
                                        <SelectItem value="Biology">
                                            الأحياء
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="teacher" className="text-right">
                                    المعلم
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setNewClass({
                                            ...newClass,
                                            teacher: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="اختر المعلم" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Dr. Sarah Johnson">
                                            د. سارة جونسون
                                        </SelectItem>
                                        <SelectItem value="Prof. Michael Chen">
                                            أ. مايكل تشين
                                        </SelectItem>
                                        <SelectItem value="Dr. Emily Davis">
                                            د. إميلي ديفيس
                                        </SelectItem>
                                        <SelectItem value="Prof. James Wilson">
                                            أ. جيمس ويلسون
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                    الوقت
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setNewClass({
                                            ...newClass,
                                            time: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="اختر الوقت" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map((slot) => (
                                            <SelectItem key={slot} value={slot}>
                                                {slot}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="room" className="text-right">
                                    القاعة
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setNewClass({
                                            ...newClass,
                                            room: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="اختر القاعة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {rooms.map((room) => (
                                            <SelectItem key={room} value={room}>
                                                {room}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                    التاريخ
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "col-span-3 justify-start text-left font-normal",
                                                !selectedDate &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {selectedDate ? (
                                                format(selectedDate, "PPP")
                                            ) : (
                                                <span>اختر التاريخ</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                setSelectedDate(date);
                                                setNewClass({
                                                    ...newClass,
                                                    date: date
                                                        ? format(
                                                              date,
                                                              "yyyy-MM-dd"
                                                          )
                                                        : "",
                                                });
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddClass}>
                                جدولة الحصة
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">حصص اليوم</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">٨</div>
                        <p className="text-xs text-muted-foreground">
                            ٦ مجدولة، ٢ مكتملة
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">هذا الأسبوع</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">٤٢</div>
                        <p className="text-xs text-muted-foreground">
                            ٣٥ مجدولة، ٧ مكتملة
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            نسبة إشغال القاعات
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">٨٥٪</div>
                        <p className="text-xs text-muted-foreground">
                            ٨ من ١٠ قاعات مستخدمة
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>جدول الحصص</CardTitle>
                    <CardDescription>
                        عرض وإدارة جميع الحصص المجدولة
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {classes.map((classItem) => (
                            <div
                                key={classItem.id}
                                className="flex items-center justify-between p-4 border rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-blue-100 rounded-lg">
                                        <CalendarIcon className="h-6 w-6 text-blue-600" />
                                        <span className="text-xs font-medium">
                                            {format(
                                                new Date(classItem.date),
                                                "MMM dd",
                                                { locale: undefined }
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {classItem.subject === "Mathematics"
                                                ? "الرياضيات"
                                                : classItem.subject ===
                                                  "Physics"
                                                ? "الفيزياء"
                                                : classItem.subject ===
                                                  "Chemistry"
                                                ? "الكيمياء"
                                                : classItem.subject ===
                                                  "Biology"
                                                ? "الأحياء"
                                                : classItem.subject}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {classItem.teacher ===
                                            "Dr. Sarah Johnson"
                                                ? "د. سارة جونسون"
                                                : classItem.teacher ===
                                                  "Prof. Michael Chen"
                                                ? "أ. مايكل تشين"
                                                : classItem.teacher ===
                                                  "Dr. Emily Davis"
                                                ? "د. إميلي ديفيس"
                                                : classItem.teacher ===
                                                  "Prof. James Wilson"
                                                ? "أ. جيمس ويلسون"
                                                : classItem.teacher}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {classItem.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {classItem.room}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium">
                                            {classItem.students} طالب
                                        </p>
                                        <Badge
                                            variant={
                                                getStatusColor(
                                                    classItem.status
                                                ) as any
                                            }
                                        >
                                            {classItem.status === "Scheduled"
                                                ? "مجدولة"
                                                : classItem.status ===
                                                  "Completed"
                                                ? "مكتملة"
                                                : classItem.status ===
                                                  "Cancelled"
                                                ? "ملغاة"
                                                : classItem.status}
                                        </Badge>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        تعديل
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
