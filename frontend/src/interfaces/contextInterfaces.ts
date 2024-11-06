export interface TaskContextType {
    filter: string;
    searchQuery: string;
    setFilter: (filter: string) => void;
    setSearchQuery: (query: string) => void;
}

export interface TaskProviderProps {
    children: React.ReactNode;
}
