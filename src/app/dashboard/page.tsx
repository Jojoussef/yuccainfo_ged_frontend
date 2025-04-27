import { DocumentFilters } from '@/components/document-filters';
import { DocumentSearch } from '@/components/document-search';
import { DocumentTable } from '@/components/document-table';

export default function Dashboard() {
    return (
        <div className='animate-fade-in space-y-6'>
            <div className='flex flex-col space-y-4'>
                <h1 className='text-3xl font-bold text-[#334155] dark:text-[#c4d2e4]'>Documents</h1>
                <p className='text-muted-foreground'>Manage and search through all your documents</p>
            </div>

            <DocumentSearch />
            <DocumentFilters />
            <DocumentTable />
        </div>
    );
}
