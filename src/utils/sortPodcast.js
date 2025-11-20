/**
 * Sorts an array of podcasts based on a given sort value.
 *
 * @param {Array} filtered - Array of podcast objects to sort
 * @param {string} sortValue - Sort type: "upDown" for A-Z, "downUp" for Z-A, "newest" for most recent
 * @returns {Array} A new array of podcasts sorted according to sortValue
 */
export function sortPodcasts(filtered, sortValue) {
    return [...filtered].sort((a, b) => {
        if (sortValue === "upDown") return a.title.localeCompare(b.title);
        if (sortValue === "downUp") return b.title.localeCompare(a.title);
        if (sortValue === "newest") return new Date(b.updated) - new Date(a.updated);
        return 0;
    });
}
