import axiosService from '@/lib/axios';
import { ENDPOINTS } from '@/lib/endpoints';

export async function getDocument(documentId: string) {
    try {
        const { data } = await axiosService.get(ENDPOINTS.documents.detail(documentId), {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data || 'Failed to fetch document');
    }
}

export async function createDocument(document: any) {
    try {
        const { data } = await axiosService.post(ENDPOINTS.documents.create, document, {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data || 'Failed to create document');
    }
}

export async function updateDocument(documentId: string, document: any) {
    try {
        const { data } = await axiosService.put(ENDPOINTS.documents.update(documentId), document, {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data || 'Failed to update document');
    }
}

export async function partialUpdateDocument(documentId: string, document: any) {
    try {
        const { data } = await axiosService.patch(ENDPOINTS.documents.partialUpdate(documentId), document, {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data || 'Failed to partially update document');
    }
}

export async function deleteDocument(documentId: string) {
    try {
        const { data } = await axiosService.delete(ENDPOINTS.documents.delete(documentId), {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data || 'Failed to delete document');
    }
}

export async function getDocuments() {
    try {
        const { data } = await axiosService.get(ENDPOINTS.documents.list, {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    } catch (err: any) {
        throw new Error(err.response?.data || 'Failed to fetch documents');
    }
}
