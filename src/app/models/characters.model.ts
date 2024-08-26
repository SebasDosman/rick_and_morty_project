import { Character } from './character.model';

export class Characters {
  info!: CharacterInfo;
  results!: Character[];
}

export class CharacterInfo {
  count!: number;
  pages!: number;
  next!: string;
  prev!: string;
}
