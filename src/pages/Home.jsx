import { useCallback, useEffect} from "react";

// Data / Context
import { genres } from "../data.js";
import { usePodcast } from "../context/PodcastContext.jsx";

// API / Utils
import { fetchPodcastsAPI } from "../api/fetchPodcast.js";
import { paginatePodcasts } from "../utils/pagination.js";

// Components
import Header from "../components/Header";
import Filter from "../components/Filter";
import PodcastCard from "../components/PodcastCard";
import PodcastModal from "../components/PodcastModal";
import Pagination from "../components/Pagination";
import LoadingState from "../components/LoadingState";

// Styles
import "../styles/Home.css";
import "../styles/LoadingState.css";
import "../styles/styles.css";

export default function Home() {
    const {
        podcasts, setPodcasts,
        loading, setLoading,
        error, setError,
        selectedPodcast, setSelectedPodcast,
        currentPage, setCurrentPage,
        itemsPerpage,
        searchFiltered,
    } = usePodcast()

const fetchPodcasts = useCallback(async (signal) => { 
        setLoading(true);
        setError(null);

        try {
            const data = await fetchPodcastsAPI(signal);
            setPodcasts(data)

        } catch (err) {
            // if fetch was aborted or cancelled, do nothing
            if (err.name === "AbortError") return;
            setError(err.message || "Unknown error while fetching podcasts.");
            setPodcasts([]);

        } finally {
            setLoading(false);
        }
    }, []);
    


/**
 * Fetches podcasts when component mounts and cleans up on unmount.
 * Uses AbortController to cancel fetch requests if component unmounts early.
 */
    useEffect(() => {
        const controller = new AbortController();
        fetchPodcasts(controller.signal);
        return () => controller.abort();
    }, [fetchPodcasts]);

    if(loading) return <LoadingState/>


    // PAGINATION
    const currentPodcast = paginatePodcasts(searchFiltered, currentPage, itemsPerpage)
    

    return (
        <main className="app-root">
                <Header />
                <Filter/>

                <section className="podcast-grid">
                {currentPodcast.map((podcast) => (
                    <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
                </section>

                <Pagination />

                {selectedPodcast && (
                <PodcastModal 
                    podcast={selectedPodcast} 
                />
            )}
        </main>
    )
}