export function filterPodcasts(podcasts, selectedGenre, genres, getGenreTitle) {
    if (selectedGenre) return podcasts.filter(podcast => getGenreTitle(podcast.id, genres).includes(selectedGenre));
    return podcasts;
}
