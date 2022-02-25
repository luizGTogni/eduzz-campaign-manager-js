export interface IFormatMoney {
	value: string | number;
	locales: string;
	currency: string;
	showSymbol?: boolean;
	removeCents?: boolean;
}
