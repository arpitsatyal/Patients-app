export function parseDate(inputDate: Date): string {
  const parsedDate = new Date(inputDate);
  let month: string | number = parsedDate.getMonth();
  let date: string | number = parsedDate.getDay();
  const year = parsedDate.getFullYear();
  if (month < 10 || date < 10) {
    month = `0${month}`;
    date = `0${date}`;
  }
  const formattedDate = `${year}-${month}-${date}`;
  return formattedDate;
}
