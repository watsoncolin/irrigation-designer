export interface Sprinkler {
  [key: string]: string | number;
  id: string;
  zoneId: string;
  label: string;
  color: string;
  x: number;
  y: number;
  r: number;
  startAngle: number;
  endAngle: number;
}
