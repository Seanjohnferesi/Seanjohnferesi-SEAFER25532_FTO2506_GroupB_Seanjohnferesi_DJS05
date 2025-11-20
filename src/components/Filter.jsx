import { useState}  from "react"
import { genres } from "../data.js";
import { usePodcast } from "../context/PodcastContext.jsx";

export default function Filter() {
     const { selectedGenre, setSelectedGenre, sort, setSort } = usePodcast();
    return(
        <div className="filter">
            <h2>Filter by:</h2>

            <select 
                name="genres"
                value={selectedGenre}
                onChange = {(gen) => setSelectedGenre(gen.target.value)}
                
            >
                <option value="">All Genres</option>
                {genres.map(g => (
                    <option key={g.id} value={g.title}>
                        {g.title}
                    </option>
                ))}
            </select>

            <select 
                name="updates"
                value={sort}
                onChange={(pod) => setSort(pod.target.value)}    
            >
                <option value="">Default</option>
                <option value="newest">Newest</option>
                <option value="upDown">A - Z</option>
                <option value="downUp">Z - A</option>
            </select>
        </div>
    )
}