/**
 * Fetches the list of podcasts from the API.
 *
 * @async
 * @function fetchPodcastsAPI
 * @param {AbortSignal} signal - Optional AbortController signal to cancel the request.
 * @returns {Promise<Array>} Resolves with an array of podcast objects.
 * @throws {Error} Throws if the network request fails or if the API response is invalid.
 */
export async function fetchPodcastsAPI(id, signal) {
    const res = await fetch("https://podcast-api.netlify.app/", { signal });

    if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
        throw new Error("Unexpected response format from API.");
    }

    return data;
}
