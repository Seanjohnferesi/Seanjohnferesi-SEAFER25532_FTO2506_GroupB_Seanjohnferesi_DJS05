/**
 * Returns a slice of podcasts for the current page.
 *
 * @param {Array} podcasts - Array of filtered/searched podcasts
 * @param {number} currentPage - Current page number
 * @param {number} itemsPerpage - Number of items per page
 * @returns {Array} Podcasts for the current page
 */
export function paginatePodcasts(podcasts, currentPage, itemsPerpage) {
    const indexOfLastPodcast = currentPage * itemsPerpage;
    const indexOfFirstPodcast = indexOfLastPodcast - itemsPerpage;
    return podcasts.slice(indexOfFirstPodcast, indexOfLastPodcast);
}
