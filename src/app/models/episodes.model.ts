import { Episode } from './episode.model';

export class Episodes {
  info: EpisodeInfo | undefined;
  results: Episode[] | undefined;
}

export class EpisodeInfo {
  count: number | undefined;
  pages: number | undefined;
  next: string | undefined;
  prev: string | undefined;
}
