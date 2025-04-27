"use client"

import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Document {
  id: string
  title: string
  snippet: string
  type: "Invoice" | "Contract" | "Report"
  uploadedDate: string
  fullText: string
}

interface DocumentDetailsModalProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
  onDownload: (id: string) => void
}

export function DocumentDetailsModal({ document, isOpen, onClose, onDownload }: DocumentDetailsModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!document) {
    return null
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Document Type</p>
          <p className="font-medium">{document.type}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Uploaded</p>
          <p className="font-medium">{formatDate(document.uploadedDate)}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-1">Extracted Text</p>
        <div className="bg-[#F9FAFB] p-4 rounded-lg max-h-[400px] overflow-y-auto">
          <p className="whitespace-pre-line">{document.fullText}</p>
        </div>
      </div>

      <Button onClick={() => onDownload(document.id)} className="w-full bg-[#10B981] hover:bg-[#10B981]/90 text-white">
        <Download className="h-4 w-4 mr-2" />
        Download Document
      </Button>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] p-6 animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-xl">{document.title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4 h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-6">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl pr-8">{document.title}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 h-8 w-8 rounded-full">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  )
}
