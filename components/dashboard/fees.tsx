"use client";

import { useState } from "react";
import {
    DollarSign,
    CreditCard,
    AlertCircle,
    CheckCircle,
    Clock,
} from "lucide-react";

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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const initialFeeRecords = [
    {
        id: 1,
        studentName: "Alice Cooper",
        studentId: "STU001",
        amount: 500,
        dueDate: "2024-01-15",
        paidDate: "2024-01-10",
        status: "Paid",
        method: "Credit Card",
        subjects: ["Mathematics", "Physics"],
    },
    {
        id: 2,
        studentName: "Bob Smith",
        studentId: "STU002",
        amount: 450,
        dueDate: "2024-01-15",
        paidDate: null,
        status: "Pending",
        method: null,
        subjects: ["Chemistry", "Biology"],
    },
    {
        id: 3,
        studentName: "Carol White",
        studentId: "STU003",
        amount: 600,
        dueDate: "2024-01-15",
        paidDate: "2024-01-12",
        status: "Paid",
        method: "Bank Transfer",
        subjects: ["Mathematics", "Chemistry", "Physics"],
    },
    {
        id: 4,
        studentName: "David Brown",
        studentId: "STU004",
        amount: 400,
        dueDate: "2024-01-10",
        paidDate: null,
        status: "Overdue",
        method: null,
        subjects: ["Physics", "Biology"],
    },
    {
        id: 5,
        studentName: "Emma Wilson",
        studentId: "STU005",
        amount: 550,
        dueDate: "2024-01-20",
        paidDate: null,
        status: "Pending",
        method: null,
        subjects: ["Mathematics", "Biology"],
    },
];

export function FeeManagementSection() {
    const [feeRecords, setFeeRecords] = useState(initialFeeRecords);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const handleMarkAsPaid = (id: number) => {
        setFeeRecords(
            feeRecords.map((record) =>
                record.id === id
                    ? {
                          ...record,
                          status: "Paid",
                          paidDate: new Date().toISOString().split("T")[0],
                          method: "Cash",
                      }
                    : record
            )
        );
    };

    const filteredRecords = feeRecords.filter((record) => {
        const matchesSearch =
            record.studentName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === "all" ||
            record.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = feeRecords
        .filter((r) => r.status === "Paid")
        .reduce((sum, r) => sum + r.amount, 0);
    const pendingAmount = feeRecords
        .filter((r) => r.status === "Pending")
        .reduce((sum, r) => sum + r.amount, 0);
    const overdueAmount = feeRecords
        .filter((r) => r.status === "Overdue")
        .reduce((sum, r) => sum + r.amount, 0);
    const collectionRate =
        (totalRevenue / (totalRevenue + pendingAmount + overdueAmount)) * 100;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Paid":
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case "Pending":
                return <Clock className="h-4 w-4 text-yellow-600" />;
            case "Overdue":
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Paid":
                return "default";
            case "Pending":
                return "secondary";
            case "Overdue":
                return "destructive";
            default:
                return "default";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">إدارة الرسوم</h2>
                <Button>
                    <DollarSign className="h-4 w-4 mr-2" />
                    إنشاء فاتورة
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            إجمالي الإيرادات
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalRevenue.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            من الرسوم المدفوعة
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            الرسوم المعلقة
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${pendingAmount.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {
                                feeRecords.filter((r) => r.status === "Pending")
                                    .length
                            }{" "}
                            طلاب
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            المبالغ المتأخرة
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${overdueAmount.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {
                                feeRecords.filter((r) => r.status === "Overdue")
                                    .length
                            }{" "}
                            طلاب
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            معدل التحصيل
                        </CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {collectionRate.toFixed(1)}%
                        </div>
                        <Progress value={collectionRate} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                    <Input
                        placeholder="ابحث عن الطلاب..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الحالات</SelectItem>
                        <SelectItem value="paid">مدفوع</SelectItem>
                        <SelectItem value="pending">معلق</SelectItem>
                        <SelectItem value="overdue">متأخر</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>سجلات الرسوم</CardTitle>
                    <CardDescription>
                        تتبع وإدارة مدفوعات رسوم الطلاب
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>الطالب</TableHead>
                                <TableHead>المواد</TableHead>
                                <TableHead>المبلغ</TableHead>
                                <TableHead>تاريخ الاستحقاق</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead>طريقة الدفع</TableHead>
                                <TableHead>إجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRecords.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>
                                                {record.studentName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">
                                                {record.studentName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {record.studentId}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1 flex-wrap">
                                            {record.subjects.map((subject) => (
                                                <Badge
                                                    key={subject}
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {subject}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        ${record.amount}
                                    </TableCell>
                                    <TableCell>{record.dueDate}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(record.status)}
                                            <Badge
                                                variant={
                                                    getStatusVariant(
                                                        record.status
                                                    ) as any
                                                }
                                            >
                                                {record.status === "Paid"
                                                    ? "مدفوع"
                                                    : record.status ===
                                                      "Pending"
                                                    ? "معلق"
                                                    : record.status ===
                                                      "Overdue"
                                                    ? "متأخر"
                                                    : record.status}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {record.method || "-"}
                                    </TableCell>
                                    <TableCell>
                                        {record.status !== "Paid" && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleMarkAsPaid(record.id)
                                                }
                                            >
                                                تعليم كمدفوع
                                            </Button>
                                        )}
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
