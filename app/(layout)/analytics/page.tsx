"use client";

"use client";

import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const revenueData = [
    { month: "يناير", revenue: 12000 },
    { month: "فبراير", revenue: 15000 },
    { month: "مارس", revenue: 18000 },
    { month: "أبريل", revenue: 16000 },
    { month: "مايو", revenue: 20000 },
    { month: "يونيو", revenue: 22000 },
];

const teachers = [
    {
        id: 1,
        name: "د.أحمد علي",
        subject: "الرياضيات",
        students: 45,
        rating: 4.8,
    },
    {
        id: 2,
        name: "د.ميخائيل كيرلس",
        subject: "الفيزياء",
        students: 32,
        rating: 4.9,
    },
    {
        id: 3,
        name: "د. سارة أحمد",
        subject: "الكيمياء",
        students: 28,
        rating: 4.7,
    },
    {
        id: 4,
        name: "د.جيمس ويلسون",
        subject: "الأحياء",
        students: 35,
        rating: 4.6,
    },
];

export default function AnalyticsSection() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">التحليلات والرؤى الذكية</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            رؤية الذكاء الاصطناعي
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm">
                                    الرياضيات تشهد أعلى طلب
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                ينصح بإضافة المزيد من معلمي الرياضيات لتلبية
                                الطلب المتزايد
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            اتجاه الإيرادات
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm">
                                    نمو بنسبة 15% هذا الربع
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                من المتوقع الوصول إلى 25 ألف دولار الشهر القادم
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">أداء المعلمين</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                                <span className="text-sm">
                                    الأستاذ احمد يتصدر التقييمات
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                متوسط 4.9/5 مع رضا طلاب بنسبة 98%
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>اتجاهات الدخل</CardTitle>
                    <CardDescription>
                        تحليل الإيرادات الشهرية مع توقعات الذكاء الاصطناعي
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3b82f6"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>المعلمون الأكثر طلباً</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {teachers.map((teacher, index) => (
                                <div
                                    key={teacher.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-sm font-medium">
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {teacher.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {teacher.subject}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">
                                            {teacher.students} طالب
                                        </p>
                                        <Progress
                                            value={
                                                (teacher.students / 50) * 100
                                            }
                                            className="w-20 h-2"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>مؤشرات أداء المركز</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span>معدل الاحتفاظ بالطلاب</span>
                                    <span>94%</span>
                                </div>
                                <Progress value={94} className="mt-2" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span>معدل تحصيل الرسوم</span>
                                    <span>87%</span>
                                </div>
                                <Progress value={87} className="mt-2" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span>رضا المعلمين</span>
                                    <span>91%</span>
                                </div>
                                <Progress value={91} className="mt-2" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span>نسبة الحضور في الصفوف</span>
                                    <span>89%</span>
                                </div>
                                <Progress value={89} className="mt-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

