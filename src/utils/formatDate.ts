import { format as fnsFormat, isValid } from "date-fns"

// display examples are given as their value to compare
// and use as the actual "type" in the switch statement below
export const displayTypes = {
  ORDINAL_DAY: "16th",
  MONTH_DAY: "01/25",
  MONTH_DAY_YEAR: "01/25/20",
  TIME: "12:45",
  TIME_AM_PM: "12:45AM",
  WEEKDAYNAME_MONTH_DAY: "Monday 01/24",
  WEEKDAYNAME_MONTH_DAY_TIME: "Monday 01/24 7:45",
  MONTHNAME_DAY_YEAR: "January 02, 2020",
  MONTHNAME_DAY_YEAR_TIME: "November 11, 2020 12:45AM",
  MONTHNAME_SHORT_DAY: "Nov 11",
  MONTHNAME_SHORT_DAY_YEAR: "Nov 11, 2020",
  MONTHNAME_SHORT_DAY_YEAR_TIME: "Nov 11, 2020 12:45AM",
  MONTHNAME_DAY: "November 01",
}

const getDateWithOrdinal = (date: Date): string => {
  const d = date.getDate()
  if (d > 3 && d < 21) return `${d}th`
  switch (d % 10) {
    case 1:
      return `${d}st`
    case 2:
      return `${d}nd`
    case 3:
      return `${d}rd`
    default:
      return `${d}th`
  }
}

// formatting can be found here: https://date-fns.org/v2.0.0-alpha.27/docs/format
export default (inputDate: string | Date, format = displayTypes.WEEKDAYNAME_MONTH_DAY): string => {
  let date
  if (inputDate instanceof Date) {
    date = inputDate
  } else if (typeof inputDate === "string") {
    const newDate = new Date(inputDate)
    if (isValid(newDate)) {
      date = newDate
    } else {
      const replaceStringAttempt = new Date(inputDate.replace("T", " ").replace(/-/g, "/"))
      if (isValid(replaceStringAttempt)) {
        date = replaceStringAttempt
      }
    }
  }

  if (date) {
    switch (format) {
      case displayTypes.ORDINAL_DAY:
        return getDateWithOrdinal(date)

      case displayTypes.MONTH_DAY:
        return fnsFormat(date, "MM/dd")

      case displayTypes.MONTH_DAY_YEAR:
        return fnsFormat(date, "MM/dd/yy")

      case displayTypes.TIME:
        return fnsFormat(date, "hh:mm")

      case displayTypes.TIME_AM_PM:
        return fnsFormat(date, "h:mm a")

      case displayTypes.WEEKDAYNAME_MONTH_DAY:
        return fnsFormat(date, "EEEE MM/dd")

      case displayTypes.WEEKDAYNAME_MONTH_DAY_TIME:
        return fnsFormat(date, "EEEE MM/dd @ h:mma")

      case displayTypes.MONTHNAME_DAY_YEAR:
        return fnsFormat(date, "MMMM dd, yyyy")

      case displayTypes.MONTHNAME_DAY_YEAR_TIME:
        return fnsFormat(date, "MMMM dd, yyyy hh:mma")

      case displayTypes.MONTHNAME_SHORT_DAY_YEAR:
        return fnsFormat(date, "MMM dd, yyyy")

      case displayTypes.MONTHNAME_SHORT_DAY:
        return fnsFormat(date, "MMM dd")

      case displayTypes.MONTHNAME_SHORT_DAY_YEAR_TIME:
        return fnsFormat(date, "MMM dd, yyyy — h:mma")

      case displayTypes.MONTHNAME_DAY:
        return fnsFormat(date, "MMMM dd")
      default:
        return fnsFormat(date, format)
    }
  } else {
    console.error(`failed to format date: ${inputDate}`)
    return `${inputDate}`
  }
}
