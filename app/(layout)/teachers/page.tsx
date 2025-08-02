"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";

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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const initialTeachers = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        subject: "Mathematics",
        students: 45,
        rating: 4.8,
        status: "Active",
        email: "sarah.johnson@educenter.com",
        phone: "+1 234-567-8901",
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        subject: "Physics",
        students: 32,
        rating: 4.9,
        status: "Active",
        email: "michael.chen@educenter.com",
        phone: "+1 234-567-8902",
    },
    {
        id: 3,
        name: "Dr. Emily Davis",
        subject: "Chemistry",
        students: 28,
        rating: 4.7,
        status: "Active",
        email: "emily.davis@educenter.com",
        phone: "+1 234-567-8903",
    },
    {
        id: 4,
        name: "Prof. James Wilson",
        subject: "Biology",
        students: 35,
        rating: 4.6,
        status: "On Leave",
        email: "james.wilson@educenter.com",
        phone: "+1 234-567-8904",
    },
];

export default function TeachersSection() {
    const [teachers, setTeachers] = useState(initialTeachers);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newTeacher, setNewTeacher] = useState({
        name: "",
        subject: "",
        email: "",
        phone: "",
        status: "Active",
    });

    const handleAddTeacher = () => {
        const teacher = {
            id: teachers.length + 1,
            ...newTeacher,
            students: 0,
            rating: 0,
        };
        setTeachers([...teachers, teacher]);
        setNewTeacher({
            name: "",
            subject: "",
            email: "",
            phone: "",
            status: "Active",
        });
        setIsAddDialogOpen(false);
    };

    const handleDeleteTeacher = (id: number) => {
        setTeachers(teachers.filter((teacher) => teacher.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">إدارة المعلمين</h2>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            إضافة معلم
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>إضافة معلم جديد</DialogTitle>
                            <DialogDescription>
                                أدخل بيانات المعلم لإضافته إلى النظام.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    الاسم
                                </Label>
                                <Input
                                    id="name"
                                    value={newTeacher.name}
                                    onChange={(e) =>
                                        setNewTeacher({
                                            ...newTeacher,
                                            name: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject" className="text-right">
                                    المادة
                                </Label>
                                <Select
                                    onValueChange={(value) =>
                                        setNewTeacher({
                                            ...newTeacher,
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
                                        <SelectItem value="English">
                                            الإنجليزية
                                        </SelectItem>
                                        <SelectItem value="History">
                                            التاريخ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    البريد الإلكتروني
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={newTeacher.email}
                                    onChange={(e) =>
                                        setNewTeacher({
                                            ...newTeacher,
                                            email: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    رقم الجوال
                                </Label>
                                <Input
                                    id="phone"
                                    value={newTeacher.phone}
                                    onChange={(e) =>
                                        setNewTeacher({
                                            ...newTeacher,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddTeacher}>
                                إضافة المعلم
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>كل المعلمين</CardTitle>
                    <CardDescription>
                        إدارة طاقم التدريس والمواد الخاصة بهم
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">المعلم</TableHead>
                                <TableHead className="text-right">المادة</TableHead>
                                <TableHead className="text-right">التواصل</TableHead>
                                <TableHead className="text-right">عدد الطلاب</TableHead>
                                <TableHead className="text-right">التقييم</TableHead>
                                <TableHead className="text-right">الحالة</TableHead>
                                <TableHead className="text-right">إجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers.map((teacher) => (
                                <TableRow key={teacher.id}>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>
                                                {teacher.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">
                                                {teacher.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {teacher.email}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {teacher.subject === "Mathematics"
                                            ? "الرياضيات"
                                            : teacher.subject === "Physics"
                                            ? "الفيزياء"
                                            : teacher.subject === "Chemistry"
                                            ? "الكيمياء"
                                            : teacher.subject === "Biology"
                                            ? "الأحياء"
                                            : teacher.subject === "English"
                                            ? "الإنجليزية"
                                            : teacher.subject === "History"
                                            ? "التاريخ"
                                            : teacher.subject}
                                    </TableCell>
                                    <TableCell>{teacher.phone}</TableCell>
                                    <TableCell>{teacher.students}</TableCell>
                                    <TableCell>★ {teacher.rating}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                teacher.status === "Active"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {teacher.status === "Active"
                                                ? "نشط"
                                                : "في إجازة"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleDeleteTeacher(
                                                        teacher.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
