/**
 * @param {string} isoDate - date in iso format
 * @returns {string} the date in the format - January 30, 2024.
 */
export const formatDate = (isoDate: string) => {
  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', options);
};
