export function parseDate(inputDate: Date): string {
  const parsedDate = new Date(inputDate);
  let month: string | number = parsedDate.getMonth() + 1;
  let date: string | number = parsedDate.getDate();
  const year = parsedDate.getFullYear();
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  const formattedDate = `${year}-${month}-${date}`;
  return formattedDate;
}
