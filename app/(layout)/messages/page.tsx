"use client";


import { useState } from "react";
import { Send, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import { de } from "date-fns/locale";

const initialMessages = [
    {
        id: 1,
        subject: "Class Schedule Update",
        content: "Mathematics class has been rescheduled to 2:00 PM tomorrow.",
        recipients: ["Alice Cooper", "Bob Smith", "Carol White"],
        sender: "Dr. Sarah Johnson",
        timestamp: "2024-01-15 10:30",
        status: "Sent",
        type: "Announcement",
    },
    {
        id: 2,
        subject: "Fee Payment Reminder",
        content:
            "This is a friendly reminder that your tuition fee is due on January 20th.",
        recipients: ["David Brown", "Emma Wilson"],
        sender: "Admin",
        timestamp: "2024-01-14 14:15",
        status: "Sent",
        type: "Reminder",
    },
    {
        id: 3,
        subject: "New Study Material Available",
        content:
            "New physics lab manual has been uploaded to the study materials section.",
        recipients: ["All Physics Students"],
        sender: "Prof. Michael Chen",
        timestamp: "2024-01-13 09:45",
        status: "Sent",
        type: "Information",
    },
];

const students = [
    { id: 1, name: "Alice Cooper", subject: "Mathematics" },
    { id: 2, name: "Bob Smith", subject: "Chemistry" },
    { id: 3, name: "Carol White", subject: "Mathematics" },
    { id: 4, name: "David Brown", subject: "Physics" },
    { id: 5, name: "Emma Wilson", subject: "Biology" },
];

const messageTemplates = [
    {
        id: 1,
        name: "تذكير بالرسوم",
        subject: "تذكير بدفع الرسوم",
        content:
            "عزيزي [اسم الطالب]، هذا تذكير ودي بأن رسومك الدراسية وقدرها $[المبلغ] مستحقة في تاريخ [تاريخ الاستحقاق]. يرجى السداد في أقرب وقت ممكن.",
    },
    {
        id: 2,
        name: "إلغاء حصة",
        subject: "تم إلغاء حصة - [المادة]",
        content:
            "أعزائي الطلاب، تم إلغاء حصة [المادة] المقررة في [التاريخ] الساعة [الوقت] بسبب [السبب]. سنقوم بإبلاغكم بموعد جديد قريباً.",
    },
    {
        id: 3,
        name: "تذكير بالواجب",
        subject: "تذكير بتسليم الواجب",
        content:
            "عزيزي [اسم الطالب]، هذا تذكير بأن واجبك [اسم الواجب] لمادة [المادة] مستحق في تاريخ [تاريخ الاستحقاق]. يرجى التسليم في الوقت المحدد.",
    },
];

export default function MessagesSection() {
    const [messages, setMessages] = useState(initialMessages);
    const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState({
        subject: "",
        content: "",
        type: "Information",
        recipients: [] as string[],
    });

    const handleSendMessage = () => {
        const message = {
            id: messages.length + 1,
            ...newMessage,
            recipients: selectedStudents,
            sender: "Admin",
            timestamp: new Date().toLocaleString(),
            status: "Sent",
        };
        setMessages([message, ...messages]);
        setNewMessage({
            subject: "",
            content: "",
            type: "Information",
            recipients: [],
        });
        setSelectedStudents([]);
        setIsComposeDialogOpen(false);
    };

    const handleStudentSelect = (studentName: string, checked: boolean) => {
        if (checked) {
            setSelectedStudents([...selectedStudents, studentName]);
        } else {
            setSelectedStudents(
                selectedStudents.filter((name) => name !== studentName)
            );
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedStudents(students.map((s) => s.name));
        } else {
            setSelectedStudents([]);
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Announcement":
                return "default";
            case "Reminder":
                return "secondary";
            case "Information":
                return "outline";
            default:
                return "default";
        }
    };

    const useTemplate = (template: any) => {
        setNewMessage({
            ...newMessage,
            subject: template.subject,
            content: template.content,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">الرسائل</h2>
                <Dialog
                    open={isComposeDialogOpen}
                    onOpenChange={setIsComposeDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            إنشاء رسالة
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>إنشاء رسالة جديدة</DialogTitle>
                            <DialogDescription>
                                أرسل رسالة للطلاب أو قم بعمل إعلان.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                    العنوان
                                </Label>
                                <Input
                                    id="subject"
                                    value={newMessage.subject}
                                    onChange={(e) =>
                                        setNewMessage({
                                            ...newMessage,
                                            subject: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    النوع
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setNewMessage({
                                            ...newMessage,
                                            type: value,
                                        })
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="اختر نوع الرسالة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Information">
                                            معلومة
                                        </SelectItem>
                                        <SelectItem value="Announcement">
                                            إعلان
                                        </SelectItem>
                                        <SelectItem value="Reminder">
                                            تذكير
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right mt-2">
                                    المستلمون
                                </Label>
                                <div className="col-span-3 space-y-2 max-h-40 overflow-y-auto">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={
                                                selectedStudents.length ===
                                                students.length
                                            }
                                            onCheckedChange={handleSelectAll}
                                        />
                                        <Label
                                            htmlFor="select-all"
                                            className="font-medium"
                                        >
                                            تحديد الكل
                                        </Label>
                                    </div>
                                    {students.map((student) => (
                                        <div
                                            key={student.id}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`student-${student.id}`}
                                                checked={selectedStudents.includes(
                                                    student.name
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleStudentSelect(
                                                        student.name,
                                                        checked as boolean
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={`student-${student.id}`}
                                            >
                                                {student.name} (
                                                {student.subject})
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label
                                    htmlFor="content"
                                    className="text-right mt-2"
                                >
                                    نص الرسالة
                                </Label>
                                <Textarea
                                    id="content"
                                    value={newMessage.content}
                                    onChange={(e) =>
                                        setNewMessage({
                                            ...newMessage,
                                            content: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                    rows={4}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right mt-2">
                                    القوالب
                                </Label>
                                <div className="col-span-3 space-y-2">
                                    {messageTemplates.map((template) => (
                                        <Button
                                            key={template.id}
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                useTemplate(template)
                                            }
                                            className="mr-2"
                                        >
                                            {template.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleSendMessage}
                                disabled={selectedStudents.length === 0}
                            >
                                <Send className="h-4 w-4 mr-2" />
                                إرسال الرسالة
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            إجمالي الرسائل
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {messages.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            كل الوقت
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">هذا الأسبوع</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">
                            رسائل مرسلة
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            المستلمون النشطون
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {students.length}
                        </div>
                        <p className="text-xs text-muted-foreground">طلاب</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>سجل الرسائل</CardTitle>
                    <CardDescription>
                        عرض جميع الرسائل والإعلانات المرسلة
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="flex items-start justify-between p-4 border rounded-lg"
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback>
                                            {message.sender
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">
                                                {message.subject}
                                            </h3>
                                            <Badge
                                                variant={
                                                    getTypeColor(
                                                        message.type
                                                    ) as any
                                                }
                                            >
                                                {message.type === "Announcement"
                                                    ? "إعلان"
                                                    : message.type ===
                                                      "Reminder"
                                                    ? "تذكير"
                                                    : message.type ===
                                                      "Information"
                                                    ? "معلومة"
                                                    : message.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {message.content}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                            <span>من: {message.sender}</span>
                                            <span>
                                                إلى: {message.recipients.length}{" "}
                                                مستلم
                                            </span>
                                            <span>{message.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">
                                        {message.status === "Sent"
                                            ? "تم الإرسال"
                                            : message.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

