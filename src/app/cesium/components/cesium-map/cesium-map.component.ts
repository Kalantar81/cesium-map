import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ArcType,
  Cartesian2,
  Cartesian3,
  Color,
  createWorldTerrain,
  Entity,
  HeightReference,
  HorizontalOrigin,
  PolylineArrowMaterialProperty,
  PolylineOutlineMaterialProperty,
  VerticalOrigin,
  Viewer,
} from 'cesium';
import {
  CesiumAttack,
  CesiumDeployment,
} from '../../interfaces/cesium-map-model';

@Component({
  selector: 'app-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.scss'],
})
export class CesiumMapComponent implements OnInit {
  @Input('assets')
  assets: Array<Entity | Entity.ConstructorOptions> = [];

  @Input('deployments')
  deployments: Array<CesiumDeployment> = [];

  @Input('attacks')
  attacks: Array<CesiumAttack> = [];

  @ViewChild('cesiumMap')
  viewer: Viewer;

  private trajectories: Array<Entity.ConstructorOptions> = [];

  constructor(private el: ElementRef) {
    this.viewer = new Viewer(this.el.nativeElement, {
      terrainProvider: createWorldTerrain(),
    });
    this.viewer.scene.globe.depthTestAgainstTerrain = true;
  }

  ngOnInit(): void {
    this.cesiumIcon();
    this.drawAttacks();
    this.drawDeploymentEntities();
    this.drawPolygon();
  }

  private drawPolygon(): void {
    this.viewer.entities.add(this.assets[0]);

    const e = this.viewer.entities;

    this.viewer.zoomTo(e);
  }

  private drawAttacks(): void {
    for (let index = 0; index < this.attacks.length; index++) {
      this.viewer.entities.add(this.attacks[index].target);
      if (this.attacks[index].trajectories.length > 0) {
        this.trajectories = this.trajectories.concat(
          ...this.attacks[index].trajectories
        );
      }
    }
    this.drawTrajectories();
  }

  private drawTrajectories(): void {
    for (let index = 0; index < this.trajectories.length; index++) {
      this.viewer.entities.add(this.trajectories[index]);
    }
  }

  private drawDeploymentEntities(): void {
    for (
      let index = 0;
      index < this.deployments[0].physicalModels.length;
      index++
    ) {
      this.viewer.entities.add(this.deployments[0].physicalModels[index]);
    }
  }

  private cesiumIcon(): void {
    this.viewer.entities.add({
      position: new Cartesian3(
        -2357281.634845169,
        -3745540.1784181907,
        4582173.281459299
      ),
      billboard: {
        image: 'assets/icons/svg/bmcIcon.SVG',
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
      label: {
        text: 'CCU',
        heightReference: HeightReference.CLAMP_TO_GROUND,
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BASELINE,
        fillColor: Color.BLACK,
        showBackground: false,
        font: '14pt sans-serif',
      },
    });

    this.viewer.entities.add({
      position: new Cartesian3(
        -2357781.634845169,
        -3745040.1784181907,
        4582173.281459299
      ),
      billboard: {
        image: 'assets/icons/svg/radarIcon.SVG',
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
      label: {
        text: 'Radar',
        heightReference: HeightReference.CLAMP_TO_GROUND,
        horizontalOrigin: HorizontalOrigin.LEFT,
        verticalOrigin: VerticalOrigin.BASELINE,
        fillColor: Color.BLACK,
        showBackground: false,
        font: '14pt sans-serif',
      },
    });
  }
}
