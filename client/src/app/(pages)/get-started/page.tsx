"use client";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { jsPDF } from "jspdf";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PageComponent = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const grades = user?.gradeCard;

  const generatePDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("XYZ University", 70, 20);
    doc.setFontSize(16);
    doc.text("Official Grade Card", 80, 30);
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35);

    // Student Information
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${user?.name}`, 20, 50);
    doc.text(`Email: ${user?.email}`, 20, 60);
    doc.text(`Enrollment No: ${user?.enrollmentNo || "123456789"}`, 20, 70);
    doc.text(`Program: Bachelor of Technology`, 20, 80);

    // Table Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Subjects", 20, 100);
    doc.text("Grades", 150, 100);
    doc.line(10, 105, 200, 105);

    // Table Content
    doc.setFont("helvetica", "normal");
    let yOffset = 115;
    Object.entries(grades || {}).forEach(([subject, score]) => {
      if (subject !== "_id" && subject !== "__v") {
        doc.text(subject.replace(/([A-Z])/g, " $1"), 20, yOffset);
        doc.text(String(score), 150, yOffset);
        yOffset += 10;
      }
    });

    // Footer
    doc.setLineWidth(0.5);
    doc.line(10, yOffset + 10, 200, yOffset + 10);
    doc.setFontSize(10);
    doc.text(
      "This is a computer-generated document. No signature is required.",
      50,
      yOffset + 20
    );

    // Generate PDF URL and Blob
    const pdfBlob = doc.output("blob");
    setPdfBlob(pdfBlob);
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfBlobUrl);
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = "GradeCard.pdf";
      link.click();
    }
  };

  const handlePrint = () => {
    if (pdfUrl) {
      const newWindow = window.open(pdfUrl, "_blank");
      newWindow?.print();
    }
  };

  useEffect(() => {
    generatePDF();
  }, []);

  const router = useRouter();

  if(!user) router.push('/'); 

  return (
    <div className="min-h-screen p-10 bg-gradient-to-r from-blue-50 to-indigo-100 flex justify-center items-center">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          {user?.name?.split(" ")[0]}&apos;s Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Grades</CardTitle>
              </CardHeader>
              <CardContent>
                {grades ? (
                  <Accordion type="single" collapsible className="w-full">
                    {Object.entries(grades).map(
                      ([subject, score]) =>
                        subject !== "_id" &&
                        subject !== "__v" && (
                          <AccordionItem key={subject} value={subject}>
                            <AccordionTrigger className="capitalize">
                              {subject.replace(/([A-Z])/g, " $1")}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-gray-700">
                                Grade: <span className="font-bold">{String(score)}</span>
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        )
                    )}
                  </Accordion>
                ) : (
                  <p className="text-gray-500">No grades available</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Marksheet</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {pdfUrl ? (
                  <div className="w-full h-[500px] border rounded-lg overflow-auto shadow-md bg-gray-100">
                    <Document
                      file={pdfUrl}
                      className="w-full h-full flex justify-center items-center"
                    >
                      <Page
                        pageNumber={1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={0.6}
                      />
                    </Document>
                  </div>
                ) : (
                  <p className="text-gray-500">Generating marksheet...</p>
                )}
                <div className="mt-4 flex space-x-4">
                  <Button onClick={handleDownload}>Download PDF</Button>
                  <Button onClick={handlePrint}>Print</Button>
                  <Button onClick={generatePDF}>Regenerate PDF</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PageComponent;
