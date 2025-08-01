"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const initialStudents = [
  {
    id: 1,
    name: "Alice Cooper",
    subjects: ["Mathematics", "Physics"],
    teacher: "Dr. Johnson",
    fees: "Paid",
    status: "Active",
    email: "alice.cooper@email.com",
    phone: "+1 234-567-1001",
    enrollmentDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    subjects: ["Chemistry", "Biology"],
    teacher: "Dr. Davis",
    fees: "Pending",
    status: "Active",
    email: "bob.smith@email.com",
    phone: "+1 234-567-1002",
    enrollmentDate: "2024-02-01",
  },
  {
    id: 3,
    name: "Carol White",
    subjects: ["Mathematics", "Chemistry"],
    teacher: "Dr. Johnson",
    fees: "Paid",
    status: "Active",
    email: "carol.white@email.com",
    phone: "+1 234-567-1003",
    enrollmentDate: "2024-01-20",
  },
  {
    id: 4,
    name: "David Brown",
    subjects: ["Physics", "Biology"],
    teacher: "Prof. Chen",
    fees: "Overdue",
    status: "Warning",
    email: "david.brown@email.com",
    phone: "+1 234-567-1004",
    enrollmentDate: "2024-01-10",
  },
]

const availableSubjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History"]

export function StudentsSection() {
  const [students, setStudents] = useState(initialStudents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: [] as string[],
    teacher: "",
    enrollmentDate: "",
  })

  const handleAddStudent = () => {
    const student = {
      id: students.length + 1,
      ...newStudent,
      fees: "Pending",
      status: "Active",
    }
    setStudents([...students, student])
    setNewStudent({ name: "", email: "", phone: "", subjects: [], teacher: "", enrollmentDate: "" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setNewStudent({ ...newStudent, subjects: [...newStudent.subjects, subject] })
    } else {
      setNewStudent({ ...newStudent, subjects: newStudent.subjects.filter((s) => s !== subject) })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Students Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the student's information to enroll them in the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right mt-2">Subjects</Label>
                <div className="col-span-3 space-y-2">
                  {availableSubjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={newStudent.subjects.includes(subject)}
                        onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                      />
                      <Label htmlFor={subject}>{subject}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="enrollmentDate" className="text-right">
                  Enrollment Date
                </Label>
                <Input
                  id="enrollmentDate"
                  type="date"
                  value={newStudent.enrollmentDate}
                  onChange={(e) => setNewStudent({ ...newStudent, enrollmentDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>View and manage student enrollments and fee status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Primary Teacher</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {student.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{student.teacher}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.fees === "Paid" ? "default" : student.fees === "Pending" ? "secondary" : "destructive"
                      }
                    >
                      {student.fees}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "default" : "destructive"}>{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteStudent(student.id)}>
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
  )
}
