import { createContext, useContext, useState } from "react";
import { filterPodcasts } from "../utils/filterPodcasts.js";
import { sortPodcasts } from "../utils/sortPodcast.js";
import { searchPodcast } from "../utils/search.js";
import { genres } from "../data.js";
import { getGenreTitle } from "../utils/getGenreTitle.js";


const PodcastContext = createContext();

export const usePodcast = () => useContext(PodcastContext)

export function Podcast({ children }) {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerpage = 6;
    const [sort, setSort] = useState("");
    const [selectedGenre , setSelectedGenre] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(0);

    // These need to be inside the component
    const filtered = filterPodcasts(podcasts, selectedGenre, genres, getGenreTitle);
    const sortedItems = sortPodcasts(filtered, sort);
    const searchFiltered = searchPodcast(sortedItems, searchInput);
    const totalItems = searchFiltered.length;

    return (
        <PodcastContext.Provider value={{
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
            searchFiltered,
            totalItems,
            sort,
            setSort,
            selectedGenre,
            setSelectedGenre,
            searchInput,
            setSearchInput,
            seasons,
            setSeasons,
            selectedSeason,
            setSelectedSeason
        }}>
            {children}
        </PodcastContext.Provider>
    );
}
