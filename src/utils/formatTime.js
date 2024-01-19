import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDate(date) {
  // return format(new Date(date), "dd MMMM yyyy");
  return format(new Date(date), "dd-MM-yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
export function formatDateTime(isoString) {
  const dateTime = new Date(isoString);

  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = dateTime.getFullYear();

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // Định dạng số để đảm bảo hiển thị dưới dạng 01, 02, ..., 09
  const formattedDay = (day < 10) ? `0${day}` : day;
  const formattedMonth = (month < 10) ? `0${month}` : month;
  const formattedHours = (hours < 10) ? `0${hours}` : hours;
  const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;

  const formattedDateTime = `${formattedHours}h${formattedMinutes} NGÀY ${formattedDay}/${formattedMonth}/${year}`;

  return formattedDateTime;
}