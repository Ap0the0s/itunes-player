import { Component, Input } from '@angular/core';
import { ITunesTrack } from 'src/app/interfaces/itunes-track.interface';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent {
  @Input() track!: ITunesTrack;

  constructor(public state: StateService) {}
}
