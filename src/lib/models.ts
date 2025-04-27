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
