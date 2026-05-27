export interface Link {
    href: string;
}

export interface PhotoDetail {
    id: number;
    titre: string;
    file: string;
    descr: string;
    format: string;
    type: string;
    width: number;
    height: number;
    url: Link;
}

export interface PhotoResponse {
    type: string;
    photo: PhotoDetail;
    links: {
        categorie: Link;
        comments: Link;
    };
}

export interface PhotoVignette {
    id: number;
    titre: string;
    file: string;
    thumbnail: Link;
    original: Link;
}

export interface GalleryItem {
    photo: PhotoVignette;
    links: {
        self: Link;
    };
}

export interface Gallery {
    type: string;
    count: number;
    size: number;
    links: {
        next: Link;
        prev: Link;
        first: Link;
        last: Link;
    };
    photos: GalleryItem[];
}

export interface Categorie {
    id: number;
    nom: string;
    descr: string;
}

export interface CategorieResponse {
    type: string;
    categorie: Categorie;
}

export interface Commentaire {
    id: number;
    titre: string;
    content: string;
    pseudo: string;
    date: string;
}

export interface CommentsResponse {
    type: string;
    count: number;
    size: number;
    comments: Commentaire[];
}