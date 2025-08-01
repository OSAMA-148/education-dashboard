"use client"

import { useState } from "react"
import { Upload, FileText, Download, Trash2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const initialMaterials = [
  {
    id: 1,
    title: "Calculus Fundamentals",
    subject: "Mathematics",
    teacher: "Dr. Sarah Johnson",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-01-10",
    downloads: 45,
    description: "Introduction to differential and integral calculus",
  },
  {
    id: 2,
    title: "Physics Lab Manual",
    subject: "Physics",
    teacher: "Prof. Michael Chen",
    type: "PDF",
    size: "5.1 MB",
    uploadDate: "2024-01-08",
    downloads: 32,
    description: "Complete laboratory experiments and procedures",
  },
  {
    id: 3,
    title: "Organic Chemistry Notes",
    subject: "Chemistry",
    teacher: "Dr. Emily Davis",
    type: "DOCX",
    size: "1.8 MB",
    uploadDate: "2024-01-05",
    downloads: 28,
    description: "Comprehensive notes on organic chemistry reactions",
  },
  {
    id: 4,
    title: "Cell Biology Presentation",
    subject: "Biology",
    teacher: "Prof. James Wilson",
    type: "PPTX",
    size: "12.3 MB",
    uploadDate: "2024-01-03",
    downloads: 35,
    description: "Visual presentation on cellular structures and functions",
  },
]

export function StudyMaterialsSection() {
  const [materials, setMaterials] = useState(initialMaterials)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    subject: "",
    teacher: "",
    description: "",
    type: "",
  })

  const handleUploadMaterial = () => {
    const material = {
      id: materials.length + 1,
      ...newMaterial,
      size: "0 MB", // Would be calculated from actual file
      uploadDate: new Date().toISOString().split("T")[0],
      downloads: 0,
    }
    setMaterials([...materials, material])
    setNewMaterial({ title: "", subject: "", teacher: "", description: "", type: "" })
    setIsUploadDialogOpen(false)
  }

  const handleDeleteMaterial = (id: number) => {
    setMaterials(materials.filter((material) => material.id !== id))
  }

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = filterSubject === "all" || material.subject === filterSubject
    return matchesSearch && matchesSubject
  })

  const getFileIcon = (type: string) => {
    return <FileText className="h-8 w-8 text-blue-600" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Study Materials</h2>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Study Material</DialogTitle>
              <DialogDescription>Add new study material for students to access.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Select onValueChange={(value) => setNewMaterial({ ...newMaterial, subject: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">
                  Teacher
                </Label>
                <Select onValueChange={(value) => setNewMaterial({ ...newMaterial, teacher: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Sarah Johnson">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="Prof. Michael Chen">Prof. Michael Chen</SelectItem>
                    <SelectItem value="Dr. Emily Davis">Dr. Emily Davis</SelectItem>
                    <SelectItem value="Prof. James Wilson">Prof. James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right mt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  File
                </Label>
                <div className="col-span-3">
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const extension = file.name.split(".").pop()?.toUpperCase() || ""
                        setNewMaterial({ ...newMaterial, type: extension })
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUploadMaterial}>Upload Material</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="Biology">Biology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.length}</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.reduce((sum, m) => sum + m.downloads, 0)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Most Popular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">Calculus Fundamentals</div>
            <p className="text-xs text-muted-foreground">45 downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Study Materials</CardTitle>
          <CardDescription>Manage and organize study materials for all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getFileIcon(material.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold">{material.title}</h3>
                    <p className="text-sm text-muted-foreground">{material.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{material.subject}</Badge>
                      <span className="text-sm text-muted-foreground">{material.teacher}</span>
                      <span className="text-sm text-muted-foreground">{material.size}</span>
                      <span className="text-sm text-muted-foreground">Uploaded: {material.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium">{material.downloads} downloads</p>
                    <Badge variant="secondary">{material.type}</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteMaterial(material.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
