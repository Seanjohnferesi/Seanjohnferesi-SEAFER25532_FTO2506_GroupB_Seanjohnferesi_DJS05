/**
 * Converts a date string into a formatted date.
 *
 * @param {string} dateStr - A string representing a date (e.g., "2025-11-08").
 * @returns {string} A formatted date string in the format "Month Day, Year" (e.g., "November 8, 2025").
 */
export const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
