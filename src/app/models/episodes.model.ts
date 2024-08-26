import { Episode } from './episode.model';

export class Episodes {
  info!: EpisodeInfo;
  results!: Episode[];
}

export class EpisodeInfo {
  count!: number;
  pages!: number;
  next!: string;
  prev!: string;
}
