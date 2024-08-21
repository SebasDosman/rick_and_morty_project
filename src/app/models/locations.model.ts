import { Location } from "./location.model";

export class Locations {
  info: LocationInfo | undefined;
  results: Location[] | undefined;
}

export class LocationInfo {
  count: number | undefined;
  pages: number | undefined;
  next: string | undefined;
  prev: string | undefined;
}
