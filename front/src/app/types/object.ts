export interface CloudObject {
    id: any;
    name: string;
    type: 'file' | 'folder';
    size: number;
    starred: boolean;
    updateTime: string;
    lastViewed?: string;
    path: string;
    owner: string;
    ext?: string;
}
