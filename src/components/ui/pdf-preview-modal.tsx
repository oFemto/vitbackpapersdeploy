"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  paperUrl: string;
  onDownload: () => void;
}

export function PDFPreviewModal({ isOpen, onClose, paperUrl, onDownload }: PDFPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <DialogTitle className="sr-only">PDF Preview</DialogTitle>
        <div className="flex justify-between items-center p-4 border-b">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={onDownload}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
        <div className="h-full w-full overflow-hidden">
          <iframe
            src={`${paperUrl}#toolbar=0`}
            className="w-full h-full"
            title="PDF Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}