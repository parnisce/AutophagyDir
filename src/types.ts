export type ContentType = 'article' | 'video' | 'podcast' | 'research' | 'guide' | 'newsletter' | 'social' | 'press-release' | 'blog' | 'picture';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    aiSummary: string;
    fullDescription: string[];
    category: string;
    type: ContentType;
    source: string;
    sourceUrl: string;
    date: string;
    imageUrl?: string;
    views: number;
    readTime?: number;
    icon: string;
    tags: string[];
}

export interface EncyclopediaEntry {
    id: string;
    title: string;
    content: string;
    section: 'basics' | 'strategies' | 'nutrition' | 'tools';
}
