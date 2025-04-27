'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';

import { Download, X } from 'lucide-react';

export interface Category {
    id: number;
    name: string;
}

export interface Document {
    id: number;
    title: string;
    file: string;
    extracted_text?: string;
    doc_type?: string;
    category?: Category;
    category_id?: number;
    uploaded_at: string;
}

interface DocumentDetailsModalProps {
    document: Document | null;
    isOpen: boolean;
    onClose: () => void;
    onDownload: (id: number) => void;
}

export function DocumentDetailsModal({ document, isOpen, onClose, onDownload }: DocumentDetailsModalProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (!document) {
        return null;
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const content = (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <p className='text-muted-foreground text-sm'>Document Type</p>
                    <p className='font-medium'>{document.doc_type}</p>
                </div>
                <div className='text-right'>
                    <p className='text-muted-foreground text-sm'>Uploaded</p>
                    <p className='font-medium'>{formatDate(document.uploaded_at)}</p>
                </div>
            </div>

            <div>
                <p className='text-muted-foreground mb-1 text-sm'>Extracted Text</p>
                <div className='dark:bg-muted max-h-[400px] overflow-y-auto rounded-lg bg-[#F9FAFB] p-4'>
                    <p className='whitespace-pre-line'>{document.extracted_text}</p>
                </div>
            </div>

            <Button
                onClick={() => onDownload(document.id)}
                className='w-full bg-[#10B981] text-white hover:bg-[#10B981]/90'>
                <Download className='mr-2 h-4 w-4' />
                Download Document
            </Button>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className='animate-scale-in p-6 sm:max-w-[500px]'>
                    <DialogHeader>
                        <DialogTitle className='text-xl'>{document.title}</DialogTitle>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={onClose}
                            className='absolute top-4 right-4 h-8 w-8 rounded-full hover:text-white'>
                            <X className='h-4 w-4' />
                            <span className='sr-only'>Close</span>
                        </Button>
                    </DialogHeader>
                    {content}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side='right' className='w-full p-6 sm:max-w-md'>
                <SheetHeader className='mb-4'>
                    <SheetTitle className='pr-8 text-xl'>{document.title}</SheetTitle>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={onClose}
                        className='absolute top-4 right-4 h-8 w-8 rounded-full hover:text-white'>
                        <X className='h-4 w-4' />
                        <span className='sr-only'>Close</span>
                    </Button>
                </SheetHeader>
                {content}
            </SheetContent>
        </Sheet>
    );
}
