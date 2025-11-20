import { createContext, useContext, useState } from "react";

const PodcastContext = createContext();

export const usePodcast = () => useContext(PodcastContext)

export function Podcast({children}) {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 6;
    const [sort, setSort] = useState("");
    const [selectedGenre , setSelectedGenre] = useState("");
    const [searchInput, setSearchInput] = useState("");

    return (
        <PodcastContext.Provider value = {{
            podcasts,
            setPodcasts,
            loading,
            setLoading,
            error,
            setError,
            selectedPodcast,
            setSelectedPodcast,
            currentPage,
            setCurrentPage,
            itemsPerpage,
            sort,
            setSort,
            selectedGenre,
            setSelectedGenre,
            searchInput,
            setSearchInput
        }}>
            {children}
        </PodcastContext.Provider>
    );
}