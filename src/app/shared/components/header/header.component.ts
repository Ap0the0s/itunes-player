import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { ITunesArtist } from 'src/app/interfaces/itunes-artist.interface';
import { ItunesService } from 'src/app/services/itunes.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('autocomplete', { static: false })
  public autocomplete!: AutoCompleteComponent;

  public searchResults: ITunesArtist[] = [];

  constructor(
    private _state: StateService,
    private _iTunesService: ItunesService
  ) {}

  ngAfterViewInit() {
    this.autocomplete.filterChange
      .asObservable()
      .pipe(
        filter((searchValue) => searchValue.length > 2),
        tap(() => (this.autocomplete.loading = true)),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchValue) => this._iTunesService.getArtists(searchValue))
      )
      .subscribe(
        (data) => {
          this.searchResults = data;
          this.autocomplete.loading = false;
        },
        () => (this.autocomplete.loading = false)
      );
  }

  /**
   * set selected artist to the store
   * @param artistName - selected artist
   */
  setCurrentArtist(artistName: string): void {
    const selectedArtist = this.searchResults.find(
      (el) => el.artistName === artistName
    );
    this._state.setCurrentArtist(selectedArtist);
  }
}
