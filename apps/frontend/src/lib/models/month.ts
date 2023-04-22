export enum Month {
	JANUARY = 'JANUARY',
	FEBRUARY = 'FEBRUARY',
	MARCH = 'MARCH',
	APRIL = 'APRIL',
	MAY = 'MAY',
	JUNE = 'JUNE',
	JULY = 'JULY',
	AUGUST = 'AUGUST',
	SEPTEMBER = 'SEPTEMBER',
	OCTOBER = 'OCTOBER',
	NOVEMBER = 'NOVEMBER',
	DECEMBER = 'DECEMBER'
}

export function isMonth(value?: unknown): value is Month {
	if (!value) return false;
	return Object.keys(Month).some((month) => month === value);
}

export function getMonthById(id: number): Month | undefined {
	return Object.values(Month).at(id);
}
