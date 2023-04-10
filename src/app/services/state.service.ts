import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITunesArtist } from '../interfaces/itunes-artist.interface';
import { ITunesAlbum } from '../interfaces/itunes-album.interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _currentArtist$ = new BehaviorSubject<ITunesArtist | undefined>(
    undefined
  );
  private _currentAlbum$ = new BehaviorSubject<ITunesAlbum | undefined>(
    undefined
  );
  private _currentTrackSrc$ = new BehaviorSubject<string>('');

  /**
   * get current artist from the store
   * @returns Observable<ITunesArtist | undefined>
   */
  public getCurrentArtist(): Observable<ITunesArtist | undefined> {
    return this._currentArtist$.asObservable();
  }

  /**
   * set current artist to the store
   * @param artist
   */
  public setCurrentArtist(artist: ITunesArtist | undefined): void {
    this._currentArtist$.next(artist);
  }

  /**
   * get current album from the store
   * @returns Observable<ITunesAlbum>
   */
  public getCurrentAlbum(): Observable<ITunesAlbum | undefined> {
    return this._currentAlbum$.asObservable();
  }

  /**
   * set current album to the store
   * @param album
   */
  public setCurrentAlbum(album: ITunesAlbum | undefined): void {
    this._currentAlbum$.next(album);
  }

  /**
   * get current track src from the store
   * @returns Observable<string>
   */
  public getCurrentTrackSrc(): Observable<string> {
    return this._currentTrackSrc$.asObservable();
  }

  /**
   * set current track src to the store
   * @param src
   */
  public setCurrentTrackSrc(src: string): void {
    this._currentTrackSrc$.next(src);
  }
}
