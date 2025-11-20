import React, { useState } from "react";
import "../styles/PodcastModal.css";
import "../styles/styles.css"
import closeBtn from "../assets/cross-black.png"
import calendar from "../assets/calendar.png"
import { genres  } from "../data";
import { formatDate } from "../utils/formatDate";
import { getGenreTitle } from "../utils/getGenreTitle";

export default function PodcastModal({podcast, closeModal}) {

    const showGenres = getGenreTitle(podcast.id, genres)
    const showSeasons = Array.from({length: podcast.seasons }, (_, index) => index + 1);
    console.log(showSeasons)
    
    return(
        <section className = {`modal ${podcast ? "display-modal" : ""}`}>
            <div className="modal-content">

                <div className="title-btn-wrapper">
                    <h1 className="modal-title">{podcast.title}</h1>
                    <div className="close-btn" onClick={closeModal}>
                        <img src={closeBtn} alt="cross button" />
                    </div>
                </div>

                <div className="flex-wrapper">
                
                    <div className="pod-img">
                        <img src={podcast.image} alt={podcast.title} />
                    </div>

                    <div className="pod-info-container">
                        <div className="pod-description">
                            <p>Description</p>
                            <p className="pod-info">{podcast.description}</p>

                            <p>Genres</p>
                            <div className="genre-flex">
                                {showGenres.map((genre, index) => (
                                    <div key={index} className="genre-item">{genre}</div>
                                )) }
                            </div>

                            <div className="date">
                                <img src={calendar} alt="a calender icon" />
                                <p className="date-formatted">Last Updated: {formatDate(podcast.updated )} </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pod-season-container">
                    <h2>Seasons</h2>

                    <div className="season-list-container">
                        <div className="season-list">
                           
                                { Array.from({length: podcast.seasons }, (_, index) => (
                                    <div className="seasons-clm">
                                        <p className="season-title" key={index}>Season {index + 1}</p>
                                    </div>
                                ))}
                        </div>
                    </div>

                </div>
    
            </div>
        </section>
    );
}