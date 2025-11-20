/**
 * Returns the titles of genres that include a given podcast ID.
 *
 * @param {string | number} podcastId - The ID of the podcast to check.
 * @param {Array<Object>} genres - An array of genre objects. Each genre should have a `shows` array and a `title` string.
 * @returns {Array<string>} An array of genre titles that include the podcast ID.
 */
export function getGenreTitle(podcastId, genres) {
    return genres
        .filter(genre => genre.shows.includes(podcastId))
        .map(gen => gen.title);
}
