"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 16000 },
  { month: "May", revenue: 20000 },
  { month: "Jun", revenue: 22000 },
]

const teachers = [
  { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics", students: 45, rating: 4.8 },
  { id: 2, name: "Prof. Michael Chen", subject: "Physics", students: 32, rating: 4.9 },
  { id: 3, name: "Dr. Emily Davis", subject: "Chemistry", students: 28, rating: 4.7 },
  { id: 4, name: "Prof. James Wilson", subject: "Biology", students: 35, rating: 4.6 },
]

export function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & AI Insights</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Insight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Mathematics shows highest demand</span>
              </div>
              <p className="text-xs text-muted-foreground">Consider adding more Math teachers to meet growing demand</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">+15% growth this quarter</span>
              </div>
              <p className="text-xs text-muted-foreground">Projected to reach $25K next month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Teacher Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Prof. Chen leads in ratings</span>
              </div>
              <p className="text-xs text-muted-foreground">4.9/5 average with 98% student satisfaction</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income Trends</CardTitle>
          <CardDescription>Monthly revenue analysis with AI predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Most In-Demand Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers.map((teacher, index) => (
                <div key={teacher.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">#{index + 1}</div>
                    <div>
                      <p className="text-sm font-medium">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{teacher.students} students</p>
                    <Progress value={(teacher.students / 50) * 100} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Center Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Student Retention Rate</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="mt-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Fee Collection Rate</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="mt-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Teacher Satisfaction</span>
                  <span>91%</span>
                </div>
                <Progress value={91} className="mt-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Class Attendance</span>
                  <span>89%</span>
                </div>
                <Progress value={89} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
