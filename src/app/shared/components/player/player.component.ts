import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('player') playerRef: any;
  player: any;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(private _state: StateService) {}

  ngAfterViewInit() {
    this.player = this.playerRef.nativeElement;

    this._state
      .getCurrentTrackSrc()
      .pipe(
        takeUntil(this._destroy$),
        filter((src) => src !== '')
      )
      .subscribe((src) => {
        this.player.src = src;
        this.player.play();
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
