import { Location } from "./location.model";

export class Locations {
  info!: LocationInfo;
  results!: Location[];
}

export class LocationInfo {
  count!: number;
  pages!: number;
  next!: string;
  prev!: string;
}
