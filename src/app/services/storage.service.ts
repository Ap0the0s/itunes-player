import { Injectable } from '@angular/core';
import { ITunesAlbum } from '../interfaces/itunes-album.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * get cached albums by artist from the local storage
   * @param artistId - key in storage
   * @returns ITunesAlbum[]
   */
  getAlbums(artistId: number): ITunesAlbum[] {
    const value = localStorage.getItem(artistId.toString());
    return value ? (JSON.parse(value) as ITunesAlbum[]) : [];
  }

  /**
   * store albums in the local storage
   * @param artistId - key
   * @param albums - value
   */
  setAlbums(artistId: number, albums: ITunesAlbum[]): void {
    localStorage.setItem(artistId.toString(), JSON.stringify(albums));
  }
}
