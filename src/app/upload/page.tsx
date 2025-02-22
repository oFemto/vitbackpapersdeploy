"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Either use imagePreview or remove it if not needed
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Replace <a> with <Link>
  import Link from 'next/link'
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subjectCode: "",
    title: "",
    examType: "CAT",
    semester: "Fall",
    year: new Date().getFullYear(),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match('application/pdf')) {
        alert("Please upload only PDF files");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", selectedFile);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subjectCode", formData.subjectCode);
      formDataToSend.append("examType", formData.examType);
      formDataToSend.append("semester", formData.semester);
      formDataToSend.append("year", formData.year.toString());

      const response = await fetch("/api/papers", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      alert("Paper uploaded successfully!");
      // Reset form
      setSelectedFile(null);
      setImagePreview(null);
      setFormData({
        subjectCode: "",
        title: "",
        examType: "CAT",
        semester: "Fall",
        year: new Date().getFullYear(),
      });
    } catch (error) {
      console.error("Error uploading paper:", error);
      alert("Failed to upload paper. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 pb-20 gap-8 sm:p-20">
      <nav className="flex items-center gap-4 absolute top-2 left-4 sm:top-4 sm:left-8">
        <Button
          variant="ghost"
          size="sm"
          className="transition-all hover:scale-105"
          asChild
        >
          <a href="/">← Home</a>
        </Button>
      </nav>
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl font-bold tracking-tight">Upload Exam Paper</h1>
          <p className="text-muted-foreground">Share exam papers with your peers</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <div className="space-y-4">
            <div>
              <label htmlFor="subject-code" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Subject Code
              </label>
              <Input
                id="subject-code"
                placeholder="e.g. CSE1002"
                className="mt-2"
                required
                value={formData.subjectCode}
                onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="subject-title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Subject Title
              </label>
              <Input
                id="subject-title"
                placeholder="e.g. Problem Solving and Programming"
                className="mt-2"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="exam-type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Exam Type
                </label>
                <select
                  id="exam-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                  value={formData.examType}
                  onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                  required
                >
                  <option value="CAT">CAT</option>
                  <option value="FAT">FAT</option>
                </select>
              </div>

              <div>
                <label htmlFor="semester" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Semester
                </label>
                <select
                  id="semester"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  required
                >
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="exam-year" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Exam Year
              </label>
              <Input
                id="exam-year"
                type="number"
                min="2000"
                max={new Date().getFullYear()}
                placeholder={new Date().getFullYear().toString()}
                className="mt-2"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload PDF
              </label>
              <div className="mt-2 flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="w-full flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-all duration-300"
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center justify-center p-4">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF files only
                      </p>
                    </div>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full transition-all hover:scale-105"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Paper"}
          </Button>
        </form>
      </main>
    </div>
  );
}