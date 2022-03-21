import { months } from "../main/constants";
import dbKey from "../main/services";

export const updateDB = (
  existedEventsonTime,
  navigatedDate,
  year,
  month,
  date,
  getEvents
) => {
  let newURl = `${dbKey}${year}/${months[parseInt(month) - 1]}/${date}.json`;

  fetch(newURl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(existedEventsonTime),
  }).then(() => {
    let staleFlag =
      navigatedDate.year.toString() === year &&
      months[navigatedDate.month] === months[parseInt(month) - 1];
    if (staleFlag) {
      getEvents(navigatedDate);
    } else {
      const deletedEventDate = { year, month: parseInt(month) - 1 };
      getEvents(deletedEventDate);
    }
  });
};
