/* Convert an ISO string to a readable date
 * example: 2011-10-05T14:48:00.000Z ---> March 10, 2011
 */
const ISOStringToReadableDate = (ISOString) => {
  const date = new Date(ISOString);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

export default ISOStringToReadableDate;
