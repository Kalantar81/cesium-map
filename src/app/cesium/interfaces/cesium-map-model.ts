import { Color, Entity } from 'cesium';
import { CesiumEntityGeometry } from '../enums/cesium-entity-geometry';

export interface CesiumMapModel {
  assets: AssetForCesium[];
  deployments: DeploymentForCesium[];
  attacks: AttackForCesium[];
}

export interface AssetForCesium {
  name: string;
  color: string;
  geometry: CesiumEntityGeometry;
  coordinates: Coordinate[];
  borderColor?: string;
}

export interface Coordinate {
  longitude: number;
  latitude: number;
  height?: number;
}

export interface DeploymentForCesium {
  name: string;
  physicalModels: PointEntity[];
  coordinates?: Coordinate[];
  geometry?: CesiumEntityGeometry;
  color?: string;
}

export interface CesiumDeployment {
  name: string;
  physicalModels: Array<Entity.ConstructorOptions>;
}

export interface CesiumAttack {
  name: string;
  target: Entity.ConstructorOptions;
  trajectories: Array<Entity.ConstructorOptions>;
}

export interface PointEntity {
  name: string;
  location: Coordinate;
  icon?: string;
  color?: Color;
  pixelSize?: number;
  outlineColor?: Color;
  outlineWidth?: number;
  nameColor?: Color;
  nameFont?: string;
  showNameBackground?: boolean;
  onGround?: boolean;
}

export interface AttackForCesium {
  name: string;
  targetsMetadata: TargetMetadata;
}

export interface TargetMetadata extends PointEntity {
  trajectories: Array<TargetTrajectory>;
}

export interface TargetTrajectory {
  endPoint: Coordinate;
  lineWidth: number;
  lineColor: Color;
  name?: string;
}
