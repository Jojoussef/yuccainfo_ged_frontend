'use client';

import type React from 'react';
import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Check, FileUp, X } from 'lucide-react';

interface FileInfo {
    name: string;
    size: number;
    type: string;
}

export function UploadForm() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
    const [documentType, setDocumentType] = useState('');
    const [documentTitle, setDocumentTitle] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [errors, setErrors] = useState<{ file?: string; type?: string; title?: string }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file type
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/png',
            'image/jpeg',
            'image/jpg'
        ];

        if (!validTypes.includes(file.type)) {
            setErrors({ ...errors, file: 'Invalid file type. Please upload PDF, Word, or image files.' });
            return;
        }

        // Reset file error if exists
        if (errors.file) {
            setErrors({ ...errors, file: undefined });
        }

        setSelectedFile({
            name: file.name,
            size: file.size,
            type: file.type
        });

        // Auto-generate title from filename (remove extension)
        const titleFromFilename = file.name.replace(/\.[^/.]+$/, '');
        setDocumentTitle(titleFromFilename);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        // Check file type
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/png',
            'image/jpeg',
            'image/jpg'
        ];

        if (!validTypes.includes(file.type)) {
            setErrors({ ...errors, file: 'Invalid file type. Please upload PDF, Word, or image files.' });
            return;
        }

        // Reset file error if exists
        if (errors.file) {
            setErrors({ ...errors, file: undefined });
        }

        setSelectedFile({
            name: file.name,
            size: file.size,
            type: file.type
        });

        // Auto-generate title from filename (remove extension)
        const titleFromFilename = file.name.replace(/\.[^/.]+$/, '');
        setDocumentTitle(titleFromFilename);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.includes('pdf')) return 'PDF';
        if (fileType.includes('word')) return 'DOC';
        if (fileType.includes('image')) return 'IMG';
        return 'FILE';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form
        let hasErrors = false;
        const newErrors: { file?: string; type?: string; title?: string } = {};

        if (!selectedFile) {
            newErrors.file = 'Please select a file to upload';
            hasErrors = true;
        }

        if (!documentType) {
            newErrors.type = 'Please select a document type';
            hasErrors = true;
        }

        if (!documentTitle.trim()) {
            newErrors.title = 'Please enter a document title';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // Show uploading state
        setIsUploading(true);

        // Simulate API call
        setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);

            // Redirect to dashboard after success
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        }, 2000);
    };

    return (
        <Card className='animate-slide-in mx-auto max-w-2xl rounded-xl shadow-lg'>
            <CardHeader>
                <CardTitle className='text-xl'>Upload a New Document</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* File Upload Area */}
                    <div className='space-y-2'>
                        <Label htmlFor='file'>Document File</Label>
                        <div
                            className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                                errors.file
                                    ? 'border-[#EF4444] bg-[#EF4444]/5'
                                    : 'border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50'
                            }`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}>
                            {!selectedFile ? (
                                <div className='flex flex-col items-center gap-2'>
                                    <FileUp className='text-muted-foreground h-10 w-10' />
                                    <div>
                                        <p className='font-medium'>Drag and drop your file here or click to browse</p>
                                        <p className='text-muted-foreground mt-1 text-sm'>
                                            Supports PDF, Word (.doc, .docx), Images (.png, .jpg, .jpeg)
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className='flex h-10 w-10 items-center justify-center rounded-md bg-[#F1F5F9] font-medium text-[#1E3A8A]'>
                                            {getFileIcon(selectedFile.type)}
                                        </div>
                                        <div className='text-left'>
                                            <p className='max-w-[300px] truncate font-medium'>{selectedFile.name}</p>
                                            <p className='text-muted-foreground text-sm'>
                                                {formatFileSize(selectedFile.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type='button'
                                        variant='ghost'
                                        size='icon'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFile();
                                        }}
                                        className='h-8 w-8 rounded-full'>
                                        <X className='h-4 w-4' />
                                        <span className='sr-only'>Remove file</span>
                                    </Button>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                id='file'
                                type='file'
                                className='hidden'
                                accept='.pdf,.doc,.docx,.png,.jpg,.jpeg'
                                onChange={handleFileChange}
                            />
                        </div>
                        {errors.file && <p className='text-sm font-medium text-[#EF4444]'>{errors.file}</p>}
                    </div>

                    {/* Document Type */}
                    <div className='space-y-2'>
                        <Label htmlFor='document-type'>Document Type</Label>
                        <Select value={documentType} onValueChange={setDocumentType}>
                            <SelectTrigger id='document-type' className={errors.type ? 'border-[#EF4444]' : ''}>
                                <SelectValue placeholder='Select document type' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='invoice'>Invoice</SelectItem>
                                <SelectItem value='contract'>Contract</SelectItem>
                                <SelectItem value='report'>Report</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && <p className='text-sm font-medium text-[#EF4444]'>{errors.type}</p>}
                    </div>

                    {/* Document Title */}
                    <div className='space-y-2'>
                        <Label htmlFor='document-title'>Document Title</Label>
                        <Input
                            id='document-title'
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            placeholder='Enter document title'
                            className={errors.title ? 'border-[#EF4444]' : ''}
                        />
                        {errors.title && <p className='text-sm font-medium text-[#EF4444]'>{errors.title}</p>}
                    </div>

                    {/* Upload Button */}
                    <Button
                        type='submit'
                        className='w-full bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90'
                        disabled={isUploading || uploadSuccess}>
                        {isUploading ? (
                            <>
                                <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                                Uploading...
                            </>
                        ) : uploadSuccess ? (
                            <>
                                <Check className='mr-2 h-4 w-4' />
                                Uploaded Successfully!
                            </>
                        ) : (
                            'Upload Document'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className='flex justify-center border-t pt-6'>
                <p className='text-muted-foreground text-sm'>
                    Maximum file size: 10MB. For larger files, please contact support.
                </p>
            </CardFooter>
        </Card>
    );
}
