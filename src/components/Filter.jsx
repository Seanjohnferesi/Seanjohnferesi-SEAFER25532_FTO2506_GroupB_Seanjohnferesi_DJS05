import { useState}  from "react"
import { genres } from "../data.js";

export default function Filter({selectedGenre, setSelectedGenre, sort, setSort}) {

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
                <option value="">Recently Updated</option>
                <option value="newest">Newest</option>
                <option value="upDown">A - Z</option>
                <option value="downUp">Z - A</option>
            </select>
        </div>
    )
}