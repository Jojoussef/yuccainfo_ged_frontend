import { UploadForm } from '@/components/upload-form';

export default function Upload() {
    return (
        <div className='animate-fade-in space-y-6'>
            <div className='flex flex-col space-y-4'>
                <h1 className='text-3xl font-bold text-[#334155] dark:text-[#c4d2e4]'>Upload Document</h1>
                <p className='text-muted-foreground'>Upload a new document to the system</p>
            </div>

            <UploadForm />
        </div>
    );
}
