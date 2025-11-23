import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { usePodcast } from "../context/PodcastContext.jsx";
import { fetchPodcastsAPI } from "../api/fetchPodcast.js";
import LoadingState from "../components/LoadingState";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import { genres } from "../data.js";
import { formatDate } from "../utils/formatDate.js";

/**
 * ShowDetail component displays detailed information about a specific podcast show,
 * including its description, genres, seasons, and episodes.
 *
 * @component
 * @returns {JSX.Element} The rendered show detail page
 */
export default function ShowDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        podcasts,
        setPodcasts,
        setLoading,
        error,
        setError,
        loading,
        seasons,
        setSeasons,
        selectedSeason,
        setSelectedSeason
    } = usePodcast();

    const show = podcasts.find(p => p.id === id);
    const currentSeason = seasons[Number(selectedSeason)];
    const showGenres = getGenreTitle(show?.id, genres);
    const lastUpdated = show ? new Date(show.updated).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
    }) : "";

    /**
     * Fetch main show data from the API.
     *
     * @param {AbortSignal} signal - Signal to cancel fetch request if needed
     */
    const fetchShow = useCallback(async (signal) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchPodcastsAPI(id, signal);
            setPodcasts(data);
        } catch (err) {
            if (err.name === "AbortError") return;
            setError(err.message || "Failed to fetch show.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        const controller = new AbortController();
        fetchShow(controller.signal);
        return () => controller.abort();
    }, [fetchShow]);

    /**
     * Fetch all seasons for the current show from the API.
     *
     * @param {AbortSignal} signal - Signal to cancel fetch request if needed
     */
    const fetchSeasons = useCallback(async (signal) => {
        if (!show) return;

        try {
            const res = await fetch(`https://podcast-api.netlify.app/id/${show.id}`, { signal });
            const data = await res.json();
            setSeasons(data.seasons || []);
        } catch (err) {
            if (err.name === "AbortError") return;
            console.error("Failed to fetch seasons:", err);
        }
    }, [show, setSeasons]);

    useEffect(() => {
        const controller = new AbortController();
        fetchSeasons(controller.signal);
        return () => controller.abort();
    }, [fetchSeasons]);

    // Handle loading / error / empty states
    if (loading) return <LoadingState />;
    if (error) return <p>{error}</p>;
    if (!show) return <p>Show not found</p>;

    return (
        <>
            {/* Back Button */}
            <div className="back-btn" onClick={() => navigate("/")}>
                <span>&#10139;</span>
                <span>Back</span>
            </div>

            <section className="modal">
                <div className="modal-content">
                    {/* Header */}
                    <div className="title-btn-wrapper">
                        <div className="close-btn"></div>
                    </div>

                    {/* Main show info */}
                    <div className="flex-wrapper">
                        <div className="pod-img">
                            <img src={show.image} alt={show.title} />
                        </div>
                        <div className="pod-info-container">
                            <div className="pod-details">
                                <h1 className="modal-title">{show.title}</h1>
                                <p className="pod-info">{show.description}</p>

                                <div className="genre-date">
                                    {/* Genres */}
                                    <div className="genre-container">
                                        <div className="rt">
                                            <p className="gen-header">GENRES</p>
                                            <div className="genre-flex">
                                                {showGenres.map((genre, index) => (
                                                    <div key={index} className="genre-item">{genre}</div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Seasons info */}
                                        <div className="total-seasons">
                                            <p>TOTAL SEASONS</p>
                                            <p>{seasons.length} Seasons</p>
                                        </div>
                                        </div>

                                        {/* Episodes and last updated */}
                                        <div className="date">
                                            <div className="date-details">
                                                <p>LAST UPDATED</p>
                                                <p className="date-formatted">{lastUpdated}</p>
                                            </div>
                                            <div className="total-episodes">
                                                <p>TOTAL EPISODES</p>
                                                <p>{seasons.reduce((total, s) => total + (s.episodes?.length || 0),0)} Episodes</p>
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seasons dropdown + episode list */}
                    <div className="pod-season-container">
                        <div className="title-dropdown">
                            <h2>Current Season</h2>
                            <select onChange={(e) => setSelectedSeason(Number(e.target.value))}>
                                {seasons.map((s, index) => (
                                    <option key={index} value={index}>
                                        Season {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="season-list-container">
                            {/* Current season */}
                            {currentSeason && (
                                <div className="seasons-clm">
                                    <img src={show.image} alt={`${show.title} Cover Page`} />
                                    <div className="season-details">
                                        <p className="season-title">Season {selectedSeason + 1}: {currentSeason.title}</p>
                                        <p>introduction to basics and foundational concepts</p>
                                        <div className="season-meta">
                                            <span>{currentSeason.episodes.length} Episodes</span>
                                            <span>&#8226;</span>
                                            <span>Released {new Date(show.updated).getFullYear()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Episodes */}
                            <div className="season-list">
                                {currentSeason?.episodes.map((ep,index) => (
                                    <div className="episode-container" key={index}>
                                        <img src={currentSeason.image} alt={ep.title} />
                                        <div className="episode-details">
                                            <p className="episode-title">Episode {index + 1}: {ep.title}</p>
                                            <p className="episode-desc">{ep.description}</p>
                                            <div className="episode-meta">
                                                <span>45 min</span>
                                                <span>&#8226;</span>
                                                <span>{lastUpdated}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
