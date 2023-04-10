import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { ItunesService } from './services/itunes.service';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { ITunesAlbum } from './interfaces/itunes-album.interface';
import { ITunesArtist } from './interfaces/itunes-artist.interface';
import { StorageService } from './services/storage.service';
import { ITunesTrack } from './interfaces/itunes-track.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  artist: ITunesArtist | undefined;
  albums: ITunesAlbum[] = [];
  tracks: ITunesTrack[] = [];

  albumsLoaderIsVisible: boolean = false;
  tracksLoaderIsVisible: boolean = false;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _state: StateService,
    private _iTunesService: ItunesService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this._state
      .getCurrentArtist()
      .pipe(
        takeUntil(this._destroy$),
        filter((artist) => artist !== undefined),
        tap((artist) => {
          this.albums = [];
          this.tracks = [];
          this.artist = artist;
          this.albumsLoaderIsVisible = true;
        })
      )
      .subscribe(
        (artist) => {
          if (artist) {
            this._iTunesService.getArtistAlbums(artist.artistId).subscribe(
              (albums) => {
                this.albumsLoaderIsVisible = false;
                this.albums = albums;
                this._storageService.setAlbums(artist.artistId, albums);
              },
              () => (this.albumsLoaderIsVisible = false)
            );
          }
        },
        () => {
          if (this.artist)
            this.albums = this._storageService.getAlbums(this.artist?.artistId);
        }
      );

    this._state
      .getCurrentAlbum()
      .pipe(
        takeUntil(this._destroy$),
        filter((album) => album !== undefined)
      )
      .subscribe((album) => {
        if (album)
          this._iTunesService
            .getAlbumTracks(album.collectionId)
            .subscribe((tracks) => {
              this.tracks = tracks;
            });
      });
  }

  /**
   * select current album and get a list of tracks
   * @param albumId - album Id
   */
  selectAlbum(albumId: number): void {
    const album = this.albums.find((el) => el.collectionId === albumId);
    if (album) {
      this._state.setCurrentAlbum(album);
    }

    this.tracksLoaderIsVisible = true;

    this._iTunesService.getAlbumTracks(albumId).subscribe(
      (tracks) => {
        this.tracks = tracks;
        this.tracksLoaderIsVisible = false;
      },
      () => (this.tracksLoaderIsVisible = false)
    );
  }

  /**
   * select current track and set it to the store
   * @param trackSrc - track source url
   */
  selectTrack(trackSrc: string): void {
    this._state.setCurrentTrackSrc(trackSrc);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
