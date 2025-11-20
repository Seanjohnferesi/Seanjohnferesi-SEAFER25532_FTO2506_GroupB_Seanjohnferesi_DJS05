import "../styles/Header.css"
import searchIcon from "../assets/search.png"
import appIcon from "../assets/app-icon.png"
import "../styles/styles.css"
import man from "../assets/man.png"
import { usePodcast } from "../context/PodcastContext.jsx"

export default function Header() {
    const {searchInput, setSearchInput, setCurrentPage} = usePodcast()
    
    return (
        <header className="app-header">
            <div className="icon-name-wrapper">
                <img src={appIcon} alt="app icon" />
                <h1 className="header-title">Forger Talks</h1>
            </div>

            <div className="profile-wrapper">

                <input 
                    type="text"
                    name="search" 
                    className="search-bar" 
                    placeholder="Search"
                    value={searchInput}
                    onChange={(search) => {setSearchInput(search.target.value); setCurrentPage(1)}}
                />
            

                <img src={searchIcon} className="search-icon" alt="search icon" />
                
                <img src={man} className ="profile" alt="a man" />
            </div>
        </header>
    )
}