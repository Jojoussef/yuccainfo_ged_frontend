"use client"

import { useState } from "react"
import { Eye, Download, FileText, FileSpreadsheet, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DocumentDetailsModal } from "@/components/document-details-modal"

interface Document {
  id: string
  title: string
  snippet: string
  type: "Invoice" | "Contract" | "Report"
  uploadedDate: string
  fullText: string
}

export function DocumentTable() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sample data
  const documents: Document[] = [
    {
      id: "1",
      title: "Q1 Financial Report",
      snippet: "The first quarter financial results show a 15% increase in revenue compared to the previous year...",
      type: "Report",
      uploadedDate: "2023-04-15",
      fullText:
        "The first quarter financial results show a 15% increase in revenue compared to the previous year. This growth is primarily attributed to the expansion of our product line and entry into new markets. Operating expenses remained stable, resulting in a 22% increase in net profit. The board has approved a dividend of $0.25 per share to be paid out in May.",
    },
    {
      id: "2",
      title: "Office Lease Agreement",
      snippet: "This lease agreement is made between ABC Properties (Landlord) and GED System Inc. (Tenant)...",
      type: "Contract",
      uploadedDate: "2023-02-28",
      fullText:
        "This lease agreement is made between ABC Properties (Landlord) and GED System Inc. (Tenant) for the property located at 123 Business Park, Suite 456, for a term of 5 years commencing on March 1, 2023. The monthly rent is $5,000 for the first year, with a 3% annual increase thereafter. The tenant is responsible for utilities and maintenance of the interior spaces. The landlord will maintain common areas and structural elements of the building.",
    },
    {
      id: "3",
      title: "Invoice #INV-2023-0042",
      snippet: "Invoice for software licensing and support services for the period of January to March 2023...",
      type: "Invoice",
      uploadedDate: "2023-03-10",
      fullText:
        "Invoice for software licensing and support services for the period of January to March 2023. Total amount due: $12,500. Payment terms: Net 30 days. Please remit payment to the bank account specified below. For questions regarding this invoice, please contact accounting@gedsystem.com.",
    },
    {
      id: "4",
      title: "Marketing Strategy Proposal",
      snippet: "This document outlines the proposed marketing strategy for the upcoming product launch...",
      type: "Report",
      uploadedDate: "2023-05-02",
      fullText:
        "This document outlines the proposed marketing strategy for the upcoming product launch in Q3 2023. The strategy focuses on digital marketing channels, including social media campaigns, influencer partnerships, and targeted email marketing. The estimated budget for this campaign is $75,000, with an expected ROI of 300% based on projected sales figures. Key performance indicators will include website traffic, conversion rates, and social media engagement metrics.",
    },
    {
      id: "5",
      title: "Invoice #INV-2023-0051",
      snippet: "Invoice for hardware purchases and installation services completed on April 18, 2023...",
      type: "Invoice",
      uploadedDate: "2023-04-20",
      fullText:
        "Invoice for hardware purchases and installation services completed on April 18, 2023. Items include: 10 x Workstation Computers ($15,000), 5 x Network Switches ($2,500), Installation and Configuration Services ($3,000). Total amount due: $20,500. Payment terms: Net 15 days. Please remit payment to the bank account specified below.",
    },
  ]

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "Invoice":
        return <FileSpreadsheet className="h-4 w-4 text-[#38BDF8]" />
      case "Contract":
        return <FileText className="h-4 w-4 text-[#1E3A8A]" />
      case "Report":
        return <FileCode className="h-4 w-4 text-[#10B981]" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsModalOpen(true)
  }

  const handleDownloadDocument = (id: string) => {
    console.log(`Downloading document with ID: ${id}`)
    // Here you would typically call an API to download the document
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border bg-white shadow-sm overflow-hidden animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Extracted Snippet</TableHead>
              <TableHead className="w-[120px]">Document Type</TableHead>
              <TableHead className="w-[150px]">Uploaded Date</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document) => (
              <TableRow
                key={document.id}
                className="hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                onClick={() => handleViewDocument(document)}
              >
                <TableCell className="font-medium">{document.title}</TableCell>
                <TableCell className="text-muted-foreground truncate max-w-[300px]">{document.snippet}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getDocumentIcon(document.type)}
                    <span>{document.type}</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(document.uploadedDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDocument(document)
                      }}
                      className="h-8 w-8 text-[#334155] hover:text-[#1E3A8A] hover:bg-[#F1F5F9]"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadDocument(document.id)
                      }}
                      className="h-8 w-8 text-[#334155] hover:text-[#1E3A8A] hover:bg-[#F1F5F9]"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className="bg-white rounded-xl border p-4 shadow-sm hover:bg-[#F1F5F9] transition-colors animate-fade-in-up"
            onClick={() => handleViewDocument(document)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getDocumentIcon(document.type)}
                <span className="text-sm font-medium text-[#334155]">{document.type}</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(document.uploadedDate)}</span>
            </div>
            <h3 className="font-medium mb-2">{document.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{document.snippet}</p>
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewDocument(document)
                }}
                className="h-8 text-[#334155] hover:text-[#1E3A8A] hover:bg-[#F1F5F9]"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownloadDocument(document.id)
                }}
                className="h-8 text-[#334155] hover:text-[#1E3A8A] hover:bg-[#F1F5F9]"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Details Modal */}
      <DocumentDetailsModal
        document={selectedDocument}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownload={handleDownloadDocument}
      />
    </>
  )
}
