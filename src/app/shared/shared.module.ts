import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { HeaderComponent } from './components/header/header.component';
import { PlayerComponent } from './components/player/player.component';
import { AlbumComponent } from './components/album/album.component';
import { TrackComponent } from './components/track/track.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PlayerComponent,
    AlbumComponent,
    TrackComponent,
  ],
  imports: [CommonModule, DropDownsModule, IndicatorsModule],
  exports: [
    DropDownsModule,
    IndicatorsModule,
    HeaderComponent,
    PlayerComponent,
    AlbumComponent,
    TrackComponent,
  ],
})
export class SharedModule {}
