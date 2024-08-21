import { Character } from './character.model';

export class Characters {
  info: CharacterInfo | undefined;
  results: Character[] | undefined;
}

export class CharacterInfo {
  count: number | undefined;
  pages: number | undefined;
  next: string | undefined;
  prev: string | undefined;
}
