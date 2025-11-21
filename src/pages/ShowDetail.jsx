import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { usePodcast } from "../context/PodcastContext.jsx";
import { fetchPodcastsAPI } from "../api/fetchPodcast.js";
import LoadingState from "../components/LoadingState";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import { genres } from "../data.js";
import { formatDate } from "../utils/formatDate.js";
import calendar from "../assets/calendar.png"


export default function ShowDetail() {
    const {id} = useParams();
    const {podcasts, setPodcasts, setLoading, error, setError, loading} = usePodcast();

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

    if (loading) return <LoadingState />
    if (error) return <p>{error}</p>
    if (!podcasts || podcasts.length === 0) return <LoadingState />;

    const show = podcasts.find(p => p.id === id)
    console.log(show)
   
    if(!show) return <p>Show not found</p>;
   
    const showGenres = getGenreTitle(show.id, genres)
    return (
        <section className = "modal">
                    <div className="modal-content">
        
                        <div className="title-btn-wrapper">
                            <div className="close-btn" >
                            </div>
                        </div>
        
                        <div className="flex-wrapper">
                        
                            <div className="pod-img">
                                <img src={show.image} alt={show.title} />
                            </div>
        
                            <div className="pod-info-container">
                                <div className="pod-description">
                                    <h1 className="modal-title">{show.title}</h1>
                                    <p className="pod-info">{show.description}</p>

                                    <div className="genre-date">
                                        <div className="genre-container">
                                            <div className="rt">
                                                <p className="gen-header">GENRES</p>
                                                <div className="genre-flex">
                                                    {showGenres.map((genre, index) => (
                                                        <div key={index} className="genre-item">{genre}</div>
                                                    )) }
                                                </div>
                                            </div>

                                            <div className="totals-seasons">
                                                <p>TOTAL SEASONS</p>
                                                <p>4 Seasons</p>
                                            </div>
                                        </div>

                                        <div className="date">
                                            <div className="date-details">
                                                <p>LAST UPDATED</p>
                                                <p className="date-formatted">{formatDate(show.updated )} </p>
                                            </div>

                                            <div className="total-episodes">
                                                <p>TOTAL EPISODES</p>
                                                <p>48 Episodes</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stats-flex">
                                    </div>

                                </div>
                            </div>
                        </div>
        
                        <div className="pod-season-container">
                            <h2>Seasons</h2>
        
                            <div className="season-list-container">
                                <div className="season-list">
                                   
                                        { Array.from({length: show.seasons }, (_, index) => (
                                            <div className="seasons-clm" key={index}>
                                                <p className="season-title">Season {index + 1}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        
            
                    </div>
                </section>
    )
}