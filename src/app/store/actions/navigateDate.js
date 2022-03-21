import * as actions from "../action-types";
let adjustMonth = 0;

export const elaborateLocalDate = (localDate) => {
  return {
    year: localDate.getFullYear(),
    month: localDate.getMonth(),
    day: localDate.getDate(),
    week: localDate.getDay(),
    endDate: new Date(localDate.getFullYear(), localDate.getMonth() + 1, 0),
    prevMonthEndDate: new Date(
      localDate.getFullYear(),
      localDate.getMonth(),
      0
    ),
  };
};

export const returnElaboratedDate = (localDate) => {
  const {
    year,
    month,
    day,
    week,
    endDate,
    prevMonthEndDate,
  } = elaborateLocalDate(localDate);

  return {
    type: actions.NAVIGATE_DATE,
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

export const navigateDatePrev = (systemDate) => {
  const localDate = new Date(systemDate.year, systemDate.month - 1, 1);

  return returnElaboratedDate(localDate);
};

export const navigateDateNext = (systemDate) => {
  const localDate = new Date(systemDate.year, systemDate.month + 1, 1);

  return returnElaboratedDate(localDate);
};

export const navigateDateExact = (pickedDate) => {
  const localDate = new Date(pickedDate.year, pickedDate.month, pickedDate.day);
  const tobeSent = returnElaboratedDate(localDate);
  tobeSent.type = actions.NAVIGATE_DATE_EXACT;
  return tobeSent;
};

export const syncToSystemDate = (systemDate) => {
  adjustMonth = 0;
  return {
    type: actions.SYNC_DATE,
    payload: {
      ...systemDate,
    },
  };
};
