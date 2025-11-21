import { useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { usePodcast } from "../context/PodcastContext.jsx";
import { fetchPodcastsAPI } from "../api/fetchPodcast.js";
import LoadingState from "../components/LoadingState";
import { getGenreTitle } from "../utils/getGenreTitle.js";
import { genres } from "../data.js";
import { formatDate } from "../utils/formatDate.js";


export default function ShowDetail() {
    const {id} = useParams();
    const {podcasts, setPodcasts, setLoading, error, setError, loading} = usePodcast();

    const fetchShow = useCallback(async (signal) => {
        setLoading(true)
        setError(null)

        try{
            const data = await fetchPodcastsAPI(id, signal);
            setPodcasts([data]); //store in podcasts in podcast state
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

    const show = podcasts[0]
    if(!show) return <p>Show not found</p>;

    const showGenres = getGenreTitle(show.id, genres)

    return (
        <section className = {`modal ${show ? "display-modal" : ""}`}>
                    <div className="modal-content">
        
                        <div className="title-btn-wrapper">
                            <h1 className="modal-title">{show.title}</h1>
                            <div className="close-btn" >
                            </div>
                        </div>
        
                        <div className="flex-wrapper">
                        
                            <div className="pod-img">
                                <img src={show.image} alt={show.title} />
                            </div>
        
                            <div className="pod-info-container">
                                <div className="pod-description">
                                    <p>Description</p>
                                    <p className="pod-info">{show.description}</p>
        
                                    <p>Genres</p>
                                    <div className="genre-flex">
                                        {showGenres.map((genre, index) => (
                                            <div key={index} className="genre-item">{genre}</div>
                                        )) }
                                    </div>
        
                                    <div className="date">
                                        {/* <img src={calendar} alt="a calender icon" /> */}
                                        <p className="date-formatted">Last Updated: {formatDate(show.updated )} </p>
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
                                                <p className="season-title" key={index}>Season {index + 1}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
        
                        </div>
            
                    </div>
                </section>
    )
}