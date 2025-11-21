export function searchPodcast(sortedItems, searchInput) {
    return sortedItems.filter(podcast => 
        podcast.title?.toLowerCase().includes(searchInput.toLowerCase())
    );
}