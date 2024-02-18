export class FormatDate {
   /**
    * @param {string} isoDate - date in iso format
    * @returns {string} the date in the format - January 30, 2024.
    */
   public static toLocale = (isoDate: string | undefined) => {
      const options: Intl.DateTimeFormatOptions = {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      };
      if (isoDate) {
         const date = new Date(isoDate);
         return date.toLocaleDateString('en-US', options);
      }
      return undefined;
   };
}
