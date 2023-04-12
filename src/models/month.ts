export enum Month {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER",
}

export function isMonth(value: string): value is Month {
  return Object.keys(Month).includes(value) === true;
}
