export interface EventItem {
  id: string;
  year: number;
  description: string;
}

export interface HistoricalEvent {
  id: string;
  start: number;
  end: number;
  title: string;
  children: EventItem[];
}
