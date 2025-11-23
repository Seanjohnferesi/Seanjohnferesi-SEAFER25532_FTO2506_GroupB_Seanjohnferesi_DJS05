import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { usePodcast } from "../context/PodcastContext.jsx";
import { fetchPodcastsAPI } from "../api/fetchPodcast.js";
import LoadingState from "../components/LoadingState";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import { genres } from "../data.js";
import { formatDate } from "../utils/formatDate.js";


export default function ShowDetail() {
    const { id } = useParams();
    const navigate = useNavigate()

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

    const fetchShow = useCallback(async (signal) => {
        setLoading(true)
        setError(null)

        try{
            const data = await fetchPodcastsAPI(id, signal);
            setPodcasts(data); //store in podcasts in podcast state
        } catch (err) {
            if (err.name === "AbortError") return;
            setError(err.message || "Failed to fetch show.");
        } finally {
            setLoading(false);
        }
    }, [id])

    useEffect(() => {
        const controller = new AbortController();
        fetchShow(controller.signal);
        return () => controller.abort();
    }, [fetchShow]);

    // Fetch seasons
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

    // Loading + error states
    if (loading) return <LoadingState />;
    if (error) return <p>{error}</p>;
    if (!podcasts || podcasts.length === 0) return <LoadingState />;

    if(!show) return <p>Show not found</p>;
   
    const showGenres = getGenreTitle(show.id, genres)
    return (
        <>
            <div 
                className="back-btn"
                onClick={() => navigate("/")}
            >
                <span>&#10139;</span>
                <span>back</span>
            </div>
            <section className="modal">
                
                <div className="modal-content">
                    <div className="title-btn-wrapper">
                        <div className="close-btn"></div>
                    </div>

                    <div className="flex-wrapper">
                        <div className="pod-img">
                            <img src={show.image} alt={show.title} />
                        </div>

                        <div className="pod-info-container">
                            <div className="pod-details">
                                <h1 className="modal-title">{show.title}</h1>
                                <p className="pod-info">{show.description}</p>

                                <div className="genre-date">
                                    <div className="genre-container">
                                        <div className="rt">
                                            <p className="gen-header">GENRES</p>
                                            <div className="genre-flex">
                                                {showGenres.map((genre, index) => (
                                                    <div key={index} className="genre-item">{genre}</div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="total-seasons">
                                            <p>TOTAL SEASONS</p>
                                            <p>{seasons.length} Seasons</p>
                                        </div>
                                    </div>

                                    <div className="date">
                                        <div className="date-details">
                                            <p>LAST UPDATED</p>
                                            <p className="date-formatted">{formatDate(show.updated)}</p>
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

                    {/* Seasons Info */}
                    <div className="pod-season-container">
                        <div className="title-dropdown">
                            <h2>Current Season</h2>

                            <select onChange={(s) => setSelectedSeason(Number(s.target.value))}>
                                {seasons.map((s, index) => (
                                    <option key={index} value={index}>
                                        Season {index + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="season-list-container">
                            {currentSeason && (
                                <div className="seasons-clm">
                                    <img src={show.image} alt={`${show.title} Cover Page`} />
                                    <div className="season-details">
                                        <p className="season-title">
                                            Season {selectedSeason + 1}: {currentSeason.title}
                                        </p>
                                        <p>introduction to basics and foundational concepts</p>
                                        <div className="season-meta">
                                            <span>{currentSeason?.episodes.length} Episodes</span>
                                            <span>&#8226;</span>
                                            <span>Released {new Date(show.updated)
                                                .toLocaleDateString("en-Us", {
                                                    year : "numeric"
                                                }
                                            )}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                                    <div className="episode-container">
                                        <img src={show.image} alt={show.title} />
                                        <div className="episode-details">
                                            <p className="episode-title">Episode 1: Introduction to the Basics</p>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quasi ex </p>
                                        
                                            <div className="episode-meta">
                                                <span>45 min</span>
                                                <span>&#8226;</span>
                                                <span>Jan 1, 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
            
                    </div>
                </section>
    )
}