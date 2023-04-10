import { Component, Input } from '@angular/core';
import { ITunesAlbum } from 'src/app/interfaces/itunes-album.interface';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
  @Input() album!: ITunesAlbum;

  constructor(public state: StateService) {}
}
