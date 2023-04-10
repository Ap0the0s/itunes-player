import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ITunesAlbum } from '../interfaces/itunes-album.interface';
import { ITunesArtist } from '../interfaces/itunes-artist.interface';
import { ITunesTrack } from '../interfaces/itunes-track.interface';

@Injectable({
  providedIn: 'root',
})
export class ItunesService {
  constructor(private http: HttpClient) {}

  /**
   * get the list of artists by search string value
   * @param searchValue - search string
   * @returns Observable<ITunesArtist[]>
   */
  public getArtists(searchValue: string): Observable<ITunesArtist[]> {
    searchValue = searchValue.trim();

    return this.http
      .jsonp<any>(
        `${environment.searchApiUrl}media=music&entity=musicArtist&limit=10&term=${searchValue}`,
        'callback'
      )
      .pipe(map((data) => data.results));
  }

  /**
   * get the list of artist albums by artist Id
   * @param artistId
   * @returns Observable<ITunesAlbum[]>
   */
  getArtistAlbums(artistId: number): Observable<ITunesAlbum[]> {
    return this.http
      .jsonp<any>(
        `${environment.lookUpApiUrl}id=${artistId}&entity=album`,
        'callback'
      )
      .pipe(
        map((data) =>
          data.results.filter(
            (el: ITunesAlbum) => el.wrapperType === 'collection'
          )
        )
      );
  }

  /**
   * get the list of album tracks by album Id
   * @param albumId
   * @returns Observable<ITunesTrack[]>
   */
  getAlbumTracks(albumId: number): Observable<ITunesTrack[]> {
    return this.http
      .jsonp<any>(
        `${environment.lookUpApiUrl}id=${albumId}&entity=song`,
        'callback'
      )
      .pipe(
        map((data) =>
          data.results.filter((el: ITunesAlbum) => el.wrapperType === 'track')
        )
      );
  }
}
