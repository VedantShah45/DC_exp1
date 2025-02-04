"use client"
import React, { useState } from 'react';

const ReportCardPage = () => {
  const [pdfUrl, setPdfUrl] = useState("https://example.com/report-card.pdf");

  const handlePrintPdf = () => {
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Student Report Card</h1>
        <div className="flex justify-between items-center mt-6">
          <p className="text-lg">Click the button below to view and print the report card:</p>
          <button
            onClick={handlePrintPdf}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            View & Print Report Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCardPage;
