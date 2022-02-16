import { Injectable } from '@angular/core';
import {
  Cartesian2,
  Cartesian3,
  Color,
  Entity,
  HeightReference,
  HorizontalOrigin,
  LabelGraphics,
  PointGraphics,
  PolylineArrowMaterialProperty,
  VerticalOrigin,
  ArcType,
  MaterialProperty,
} from 'cesium';

import {
  AssetForCesium,
  AttackForCesium,
  CesiumAttack,
  CesiumDeployment,
  Coordinate,
  DeploymentForCesium,
  PointEntity,
  TargetTrajectory,
} from '../interfaces/cesium-map-model';

@Injectable({
  providedIn: 'root',
})
export class CesiumEntitiesService {
  constructor() {}

  public convertAssetToCesiumEntity(
    asset: AssetForCesium
  ): Entity | Entity.ConstructorOptions {
    const polygonPositions: Cartesian3[] = [];

    for (let index = 0; index < asset.coordinates.length; index++) {
      polygonPositions.push(
        new Cartesian3(
          asset.coordinates[index].latitude,
          asset.coordinates[index].longitude,
          asset.coordinates[index].height
        )
      );
    }

    const polygon: Entity | Entity.ConstructorOptions = {
      polygon: {
        hierarchy: {
          holes: [],
          positions: polygonPositions,
        },
        material: Color.BLUE.withAlpha(0.5),
        // material: Color.fromCssColorString('blue'),
      },
    };
    return polygon;
  }

  public covertDeploymentToCesiumEntity(
    deployment: DeploymentForCesium
  ): CesiumDeployment {
    const physicalModelEntities: Array<Entity.ConstructorOptions> = [];

    for (let index = 0; index < deployment.physicalModels.length; index++) {
      physicalModelEntities.push(
        this.cesiumPointEntity(deployment.physicalModels[index])
      );
    }
    return {
      name: deployment.name,
      physicalModels: physicalModelEntities,
    };
  }

  public covertAttackToCesiumEntity(attack: AttackForCesium): CesiumAttack {
    const cesiumTrajectories: Array<Entity.ConstructorOptions> = [];
    const startPoint: Cartesian3 = this.convertCoordinateToCesiumPosition(
      attack.targetsMetadata.location
    );
    for (
      let index = 0;
      index < attack.targetsMetadata.trajectories.length;
      index++
    ) {
      cesiumTrajectories.push(
        this.cesiumPolylineEntity(
          startPoint,
          attack.targetsMetadata.trajectories[index]
        )
      );
    }

    return {
      name: attack.name,
      target: this.cesiumPointEntity(attack.targetsMetadata),
      trajectories: cesiumTrajectories,
    };
  }

  private cesiumPolylineEntity(
    startPoint: Cartesian3,
    lineEntity: TargetTrajectory
  ): Entity.ConstructorOptions {
    const endPoint: Cartesian3 = this.convertCoordinateToCesiumPosition(
      lineEntity.endPoint
    );
    const positions: Cartesian3[] = [startPoint, endPoint];
    const lineColor: MaterialProperty = lineEntity.lineColor
      ? new PolylineArrowMaterialProperty(lineEntity.lineColor)
      : new PolylineArrowMaterialProperty(Color.RED);

    /**  To get the line by relief you nedd define:
     * {
     * arcType: ArcType.GEODESIC,
     * clampToGround: true
     * }
     */
    const cesiumPolylineEntity: Entity.ConstructorOptions = {
      name: lineEntity.name ? lineEntity.name : 'trajectory',
      polyline: {
        positions,
        width: lineEntity.lineWidth ? lineEntity.lineWidth : 3,
        arcType: ArcType.NONE,
        material: lineColor,
        clampToGround: false,
      },
    };
    return cesiumPolylineEntity;
  }

  private convertCoordinateToCesiumPosition(location: Coordinate): Cartesian3 {
    const position: Cartesian3 = location.height
      ? new Cartesian3(location.latitude, location.longitude, location.height)
      : new Cartesian3(location.latitude, location.longitude);

    const aaa: Cartesian3 = Cartesian3.fromDegrees(
      location.latitude,
      location.longitude,
      location.height
    );
    return position;
  }

  private cesiumPointEntity(
    pointEntity: PointEntity
  ): Entity.ConstructorOptions {
    const position: Cartesian3 = this.convertCoordinateToCesiumPosition(
      pointEntity.location
    );

    const point: PointGraphics.ConstructorOptions = {
      color: pointEntity.color ? pointEntity.color : Color.BLUEVIOLET,
      pixelSize: pointEntity.pixelSize ? pointEntity.pixelSize : 20,
      outlineColor: pointEntity.outlineColor
        ? pointEntity.outlineColor
        : Color.RED,
      outlineWidth: pointEntity.outlineWidth ? pointEntity.outlineWidth : 3,
      heightReference: pointEntity.onGround
        ? HeightReference.CLAMP_TO_GROUND
        : HeightReference.NONE,
    };

    const label: LabelGraphics.ConstructorOptions = {
      text: pointEntity.name,
      font: pointEntity.nameFont ? pointEntity.nameFont : '14pt sans-serif',
      heightReference: pointEntity.onGround
        ? HeightReference.CLAMP_TO_GROUND
        : HeightReference.NONE,
      horizontalOrigin: HorizontalOrigin.LEFT,
      verticalOrigin: VerticalOrigin.BASELINE,
      fillColor: Color.BLACK,
      showBackground: pointEntity.showNameBackground
        ? pointEntity.showNameBackground
        : false,
      backgroundColor: pointEntity.showNameBackground
        ? new Color(1, 1, 1, 0.7)
        : undefined,
      backgroundPadding: pointEntity.showNameBackground
        ? new Cartesian2(8, 4)
        : undefined,
      disableDepthTestDistance: Number.POSITIVE_INFINITY, // draws the label in front of terrain
    };

    const cesiumPointEntity: Entity.ConstructorOptions = {
      position,
      point,
      label,
    };

    return cesiumPointEntity;
  }
}
