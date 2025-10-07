import type { Artist } from "./artist";
import type { ExternalUrls, Image, Restriction } from "./commonType";
export interface getNewReleasesResponse {
  albums: {
    href: string;
    limit: number;
    next: string | null; 
    offset: number;
    previous: string | null;
    total: number;
    items: SimplifiedAlbum[];
  };
}

export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: number; 
  available_markets?: string[];
  external_urls: ExternalUrls;

  href: string;
  id: string;
  images: Image[];

  name: string;
  release_date: string;
  release_date_precition: string;
  restrictions?: Restriction;
  type: string;
  uri: string;

  artists: Artist[];
}
