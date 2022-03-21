import * as actions from "../action-types";

export const currentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const week = date.getDay();
  const endDate = new Date(year, month + 1, 0);
  const prevMonthEndDate = new Date(year, month, 0);
  return {
    type: actions.SET_DATE,
    payload: {
      month,
      year,
      day,
      week,
      endDate: {
        day: endDate.getDate(),
        week: endDate.getDay(),
      },
      prevMonthEndDate: {
        day: prevMonthEndDate.getDate(),
        week: prevMonthEndDate.getDay(),
      },
    },
  };
};
