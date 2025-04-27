'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Check, ChevronDown } from 'lucide-react';

type DocumentType = 'All' | 'Invoice' | 'Contract' | 'Report';

export function DocumentFilters() {
    const [selectedType, setSelectedType] = useState<DocumentType>('All');

    const documentTypes: DocumentType[] = ['All', 'Invoice', 'Contract', 'Report'];

    return (
        <div className='flex flex-wrap items-center gap-2'>
            <span className='text-sm font-medium text-[#334155] dark:text-[#c4d2e4]'>Filter by:</span>

            {/* Document Type Filter */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='bg-white'>
                        {selectedType}
                        <ChevronDown className='ml-2 h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuGroup>
                        {documentTypes.map((type) => (
                            <DropdownMenuItem
                                key={type}
                                className='flex cursor-pointer items-center justify-between'
                                onClick={() => setSelectedType(type)}>
                                {type}
                                {selectedType === type && <Check className='h-4 w-4' />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Filter Buttons */}
            <div className='mt-2 flex w-full flex-wrap gap-2 md:hidden'>
                {documentTypes.map((type) => (
                    <Button
                        key={type}
                        variant={selectedType === type ? 'default' : 'outline'}
                        size='sm'
                        className={selectedType === type ? 'bg-[#1E3A8A] text-white' : 'bg-white text-[#334155]'}
                        onClick={() => setSelectedType(type)}>
                        {type}
                    </Button>
                ))}
            </div>
        </div>
    );
}
