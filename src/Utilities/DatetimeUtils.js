/* eslint-disable no-extend-native */
import { DAYS, MONTHS } from "./DataConstants";

export const date = new Date();

String.prototype.transformDateFormat = function () {
  const newFormatDate =
    new Date(parseInt(this) * 1000).getDate() +
    " " +
    MONTHS[new Date(parseInt(this) * 1000).getMonth()];
  return newFormatDate;
};

String.prototype.transformDay = function () {
  return DAYS[new Date(parseInt(this) * 1000).getDay()];
};

String.prototype.transformDateTime = function () {
  return new Date(parseInt(this) * 1000);
};

String.prototype.transformTime = function () {
  return new Date(parseInt(this) * 1000).getHours();
};

export function getUTCDatetime() {
  const utcTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });

  const isoDateString = new Date().toISOString();
  const utcDate = isoDateString.split("T")[0].concat(" ", utcTime);
  return utcDate;
}

export function getUTCTime() {
  const utcTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });

  return utcTime;
}
