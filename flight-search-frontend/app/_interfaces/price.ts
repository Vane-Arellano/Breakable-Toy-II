import { FeeI } from "./fee";

export type CurrencyCode = "USD" | "EUR" | "MXN"; 

export interface PriceI {
    currency: CurrencyCode; // ISO currency code like "USD"
    base: string; 
    grandTotal: string; // Total price including fees
    fees?: FeeI[];
}