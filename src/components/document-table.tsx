'use client';

import { useState } from 'react';

import { DocumentDetailsModal } from '@/components/document-details-modal';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Download, Eye, FileCode, FileSpreadsheet, FileText } from 'lucide-react';

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

export function DocumentTable() {
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample data
    const documents: Document[] = [
        {
            id: 1,
            title: 'Q1 Financial Report',
            file: '/documents/q1-financial-report.pdf',
            extracted_text:
                'The first quarter financial results show a 15% increase in revenue compared to the previous year...',
            doc_type: 'Report',
            category: { id: 1, name: 'Financial' },
            category_id: 1,
            uploaded_at: '2023-04-15'
        },
        {
            id: 2,
            title: 'Office Lease Agreement',
            file: '/documents/lease-agreement.pdf',
            extracted_text:
                'This lease agreement is made between ABC Properties (Landlord) and GED System Inc. (Tenant)...',
            doc_type: 'Contract',
            category: { id: 2, name: 'Legal' },
            category_id: 2,
            uploaded_at: '2023-02-28'
        },
        {
            id: 3,
            title: 'Invoice #INV-2023-0042',
            file: '/documents/invoice-0042.pdf',
            extracted_text:
                'Invoice for software licensing and support services for the period of January to March 2023...',
            doc_type: 'Invoice',
            category: { id: 1, name: 'Financial' },
            category_id: 1,
            uploaded_at: '2023-03-10'
        },
        {
            id: 4,
            title: 'Marketing Strategy Proposal',
            file: '/documents/marketing-strategy.pdf',
            extracted_text: 'This document outlines the proposed marketing strategy for the upcoming product launch...',
            doc_type: 'Report',
            category: { id: 3, name: 'Marketing' },
            category_id: 3,
            uploaded_at: '2023-05-02'
        },
        {
            id: 5,
            title: 'Invoice #INV-2023-0051',
            file: '/documents/invoice-0051.pdf',
            extracted_text: 'Invoice for hardware purchases and installation services completed on April 18, 2023...',
            doc_type: 'Invoice',
            category: { id: 1, name: 'Financial' },
            category_id: 1,
            uploaded_at: '2023-04-20'
        }
    ];

    const getDocumentIcon = (docType?: string) => {
        switch (docType?.toLowerCase()) {
            case 'invoice':
                return <FileSpreadsheet className='h-4 w-4 text-[#38BDF8]' />;
            case 'contract':
                return <FileText className='h-4 w-4 text-[#1E3A8A]' />;
            case 'report':
                return <FileCode className='h-4 w-4 text-[#10B981]' />;
            default:
                return <FileText className='h-4 w-4' />;
        }
    };

    const handleViewDocument = (document: Document) => {
        setSelectedDocument(document);
        setIsModalOpen(true);
    };

    const handleDownloadDocument = (id: number) => {
        console.log(`Downloading document with ID: ${id}`);
        // Here you would typically call an API to download the document
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            {/* Desktop Table View */}
            <div className='animate-fade-in hidden overflow-hidden rounded-xl border bg-white shadow-xs md:block'>
                <Table>
                    <TableHeader>
                        <TableRow className='dark:bg-background bg-[#F9FAFB]'>
                            <TableHead className='w-[300px]'>Title</TableHead>
                            <TableHead>Extracted Text</TableHead>
                            <TableHead className='w-[120px]'>Document Type</TableHead>
                            <TableHead className='w-[120px]'>Category</TableHead>
                            <TableHead className='w-[150px]'>Uploaded Date</TableHead>
                            <TableHead className='w-[100px] text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.map((document) => (
                            <TableRow
                                key={document.id}
                                className='cursor-pointer transition-colors hover:bg-[#F1F5F9]'
                                onClick={() => handleViewDocument(document)}>
                                <TableCell className='font-medium'>{document.title}</TableCell>
                                <TableCell className='text-muted-foreground max-w-[300px] truncate'>
                                    {document.extracted_text || 'No text extracted'}
                                </TableCell>
                                <TableCell>
                                    <div className='flex items-center gap-2'>
                                        {getDocumentIcon(document.doc_type)}
                                        <span>{document.doc_type || 'Unknown'}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{document.category?.name || 'Uncategorized'}</TableCell>
                                <TableCell>{formatDate(document.uploaded_at)}</TableCell>
                                <TableCell className='text-right'>
                                    <div className='flex justify-end gap-2'>
                                        <Button
                                            variant='ghost'
                                            size='icon'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewDocument(document);
                                            }}
                                            className='h-8 w-8 text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A] dark:text-[#c4d2e4]'>
                                            <Eye className='h-4 w-4' />
                                            <span className='sr-only'>View</span>
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            size='icon'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDownloadDocument(document.id);
                                            }}
                                            className='h-8 w-8 text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A] dark:text-[#c4d2e4]'>
                                            <Download className='h-4 w-4' />
                                            <span className='sr-only'>Download</span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className='space-y-4 md:hidden'>
                {documents.map((document) => (
                    <div
                        key={document.id}
                        className='animate-fade-in-up rounded-xl border bg-white p-4 shadow-xs transition-colors hover:bg-[#F1F5F9]'
                        onClick={() => handleViewDocument(document)}>
                        <div className='mb-2 flex items-start justify-between'>
                            <div className='flex items-center gap-2'>
                                {getDocumentIcon(document.doc_type)}
                                <span className='text-sm font-medium text-[#334155] dark:text-[#c4d2e4]'>
                                    {document.doc_type || 'Unknown'}
                                </span>
                                {document.category && (
                                    <span className='ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600'>
                                        {document.category.name}
                                    </span>
                                )}
                            </div>
                            <span className='text-muted-foreground text-xs'>{formatDate(document.uploaded_at)}</span>
                        </div>
                        <h3 className='mb-2 font-medium'>{document.title}</h3>
                        <p className='text-muted-foreground mb-3 line-clamp-2 text-sm'>
                            {document.extracted_text || 'No text extracted'}
                        </p>
                        <div className='mt-2 flex justify-end gap-2'>
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewDocument(document);
                                }}
                                className='h-8 text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A] dark:text-[#c4d2e4]'>
                                <Eye className='mr-1 h-4 w-4' />
                                View
                            </Button>
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownloadDocument(document.id);
                                }}
                                className='h-8 text-[#334155] hover:bg-[#F1F5F9] hover:text-[#1E3A8A] dark:text-[#c4d2e4]'>
                                <Download className='mr-1 h-4 w-4' />
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
    );
}
