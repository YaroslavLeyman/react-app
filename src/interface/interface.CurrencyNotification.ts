export interface CurrencyNotification {
  threshold: number;
  direction: "up" | "down";
  time: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  id: string;
  isAlertEnabled: boolean;
  isNotified: boolean;
  date: string | null;
}
