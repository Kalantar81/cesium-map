import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CesiumContainerComponent } from './components/cesium-container/cesium-container.component';
import { CesiumMapComponent } from './components/cesium-map/cesium-map.component';
import { CesiumEntitiesService } from './services/cesium-entities.service';

@NgModule({
  declarations: [CesiumContainerComponent, CesiumMapComponent],
  imports: [CommonModule],

  providers: [CesiumEntitiesService],

  exports: [CesiumContainerComponent],
})
export class CesiumModule {}
