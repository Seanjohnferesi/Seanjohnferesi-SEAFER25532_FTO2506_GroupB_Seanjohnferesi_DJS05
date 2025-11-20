import { useState } from "react";
import React from "react";
import "../styles/Pagination.css"
import { usePodcast } from "../context/PodcastContext.jsx";

export default function Pagination() {
    const { totalItems, itemsPerpage, currentPage, setCurrentPage } = usePodcast()
    const totalPages = Math.ceil(totalItems / itemsPerpage);

    const handleClick = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="pagination">
            {Array.from({length: totalPages }, (_, index) => (
                <button 
                    key = {index + 1}
                    onClick={() => handleClick(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

