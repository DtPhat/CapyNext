export const formatSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  return formattedTime;
}

export function convertDateFormat(isoDate: string) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dateObj = new Date(isoDate);
  const monthIndex = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const month = months[monthIndex];
  const formattedDate = `${month} ${day < 10 ? '0' + day : day}, ${year}`;

  return formattedDate;
}
