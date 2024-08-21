import { LocationRef } from "./location-ref.model";

export class Character {
  id: number | undefined;
  name: string | undefined;
  status: string | undefined;
  species: string | undefined;
  type: string | undefined;
  gender: string | undefined;
  origin: LocationRef | undefined;
  location: LocationRef | undefined;
  image: string | undefined;
  episode: string[] | undefined;
  url: string | undefined;
  created: string | undefined;
}
