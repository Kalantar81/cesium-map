import { Component, ElementRef, OnInit } from '@angular/core';
import { Cartesian3, Color, Entity, EntityCollection, Viewer } from 'cesium';
import { CesiumEntityGeometry } from '../../enums/cesium-entity-geometry';
import {
  AssetForCesium,
  AttackForCesium,
  CesiumAttack,
  CesiumDeployment,
  CesiumMapModel,
  DeploymentForCesium,
} from '../../interfaces/cesium-map-model';
import { CesiumOptions } from '../../interfaces/cesium-options';
import { CesiumEntitiesService } from '../../services/cesium-entities.service';

@Component({
  selector: 'app-cesium-container',
  templateUrl: './cesium-container.component.html',
  styleUrls: ['./cesium-container.component.scss'],
})
export class CesiumContainerComponent implements OnInit {
  public assets: Array<Entity | Entity.ConstructorOptions> = [];
  public deployments: Array<CesiumDeployment> = [];
  public attacks: Array<CesiumAttack> = [];

  // public deploymentEntities: Array<Entity | Entity.ConstructorOptions>[] = [];
  // public attackEntities: EntityCollection[];

  private options: CesiumOptions;

  setOptions(options: CesiumOptions) {
    this.options = {
      metadata: {
        assets: assetEntities,
        deployments: deploymentEntities,
        attacks: attacksEntities,
      },
    };
  }

  constructor(private cesiumEntitiesService: CesiumEntitiesService) {
    this.options = {
      metadata: {
        assets: assetEntities,
        deployments: deploymentEntities,
        attacks: attacksEntities,
      },
    };
  }

  ngOnInit(): void {
    this.assets = this.convertAssets(this.options.metadata.assets);
    this.deployments = this.convertDeployments(
      this.options.metadata.deployments
    );
    this.attacks = this.convertAttacks(this.options.metadata.attacks);
  }

  private convertAssets(
    assets: AssetForCesium[]
  ): Array<Entity | Entity.ConstructorOptions> {
    const cesiumAssets: Array<Entity | Entity.ConstructorOptions> = [];
    for (let index = 0; index < assets.length; index++) {
      cesiumAssets.push(
        this.cesiumEntitiesService.convertAssetToCesiumEntity(assets[index])
      );
    }
    return cesiumAssets;
  }

  private convertDeployments(
    deployments: DeploymentForCesium[]
  ): Array<CesiumDeployment> {
    const cesiumDeployments: Array<CesiumDeployment> = [];
    for (let index = 0; index < deployments.length; index++) {
      cesiumDeployments.push(
        this.cesiumEntitiesService.covertDeploymentToCesiumEntity(
          deployments[index]
        )
      );
    }

    return cesiumDeployments;
  }

  private convertAttacks(attacks: AttackForCesium[]): Array<CesiumAttack> {
    const cesiumAttacks: Array<CesiumAttack> = [];

    for (let index = 0; index < attacks.length; index++) {
      cesiumAttacks.push(
        this.cesiumEntitiesService.covertAttackToCesiumEntity(attacks[index])
      );
    }

    return cesiumAttacks;
  }
}

const assetEntities: AssetForCesium[] = [
  {
    name: 'protection zone',
    color: 'yellow',
    borderColor: 'black',
    geometry: CesiumEntityGeometry.Polygon,
    coordinates: [
      {
        latitude: -2358138.847340281,
        longitude: -3744072.459541374,
        height: 4581158.5714175375,
      },
      {
        latitude: -2357231.4925370603,
        longitude: -3745103.7886602185,
        height: 4580702.9757762635,
      },
      {
        latitude: -2355912.902205431,
        longitude: -3744249.029778454,
        height: 4582402.154378103,
      },
      {
        latitude: -2357208.0209552636,
        longitude: -3743553.4420488174,
        height: 4581961.863286629,
      },
    ],
  },
];

const deploymentEntities: DeploymentForCesium[] = [
  {
    name: 'Deployment name',
    coordinates: [
      {
        latitude: -2358138.847340281,
        longitude: -3744072.459541374,
        height: 4581158.5714175375,
      },
      {
        latitude: -2357231.4925370603,
        longitude: -3745103.7886602185,
        height: 4580702.9757762635,
      },
      {
        latitude: -2355912.902205431,
        longitude: -3744249.029778454,
        height: 4582402.154378103,
      },
      {
        latitude: -2357208.0209552636,
        longitude: -3743553.4420488174,
        height: 4581961.863286629,
      },
    ],
    physicalModels: [
      {
        name: 'Radar',
        icon: 'assets/icons',
        location: {
          latitude: -2357735.2317587747,
          longitude: -3744628.7330273916,
          height: 4582173.281459299,
        },
        color: Color.SKYBLUE,
        pixelSize: 10,
        outlineColor: Color.YELLOW,
        outlineWidth: 3,
        showNameBackground: true,
        onGround: true,
      },
      {
        name: 'Sensor',
        icon: 'assets/icons',
        location: {
          latitude: -2357081.634845169,
          longitude: -3745040.1784181907,
          height: 4582173.281459299,
        },
        color: Color.SKYBLUE,
        pixelSize: 10,
        outlineColor: Color.YELLOW,
        outlineWidth: 3,
        showNameBackground: true,
        onGround: true,
      },
    ],
    geometry: CesiumEntityGeometry.Polygon,
    color: 'blue',
  },
];

const attacksEntities: AttackForCesium[] = [
  {
    name: 'Air attack',
    targetsMetadata: {
      name: 'Plane attack',
      location: {
        latitude: -2355120.4133791323,
        longitude: -3746273.830057786,
        height: 4582173.281459299,
      },
      color: Color.LIGHTBLUE,
      pixelSize: 20,
      outlineColor: Color.RED,
      outlineWidth: 3,
      nameColor: Color.BLACK,
      showNameBackground: true,
      onGround: false,
      trajectories: [
        {
          endPoint: {
            latitude: -2356712.8963028514,
            longitude: -3744454.309589595,
            height: 4581451.62392065,
          },
          lineWidth: 3,
          lineColor: Color.LIGHTBLUE,
        },
        {
          endPoint: {
            latitude: -2356938.818916629,
            longitude: -3743363.8452775367,
            height: 4582221.267376511,
          },
          lineWidth: 3,
          lineColor: Color.LIGHTBLUE,
        },
      ],
    },
  },
  {
    name: 'water attack',
    targetsMetadata: {
      name: 'Ship',
      // location: { latitude: -124.1058, longitude: 46.2515, height: 3000 },
      location: {
        latitude: -2478530.9668642893,
        longitude: -3659976.8202200984,
        height: 4586789.785458379,
      },
      color: Color.BLUE,
      pixelSize: 20,
      outlineColor: Color.RED,
      outlineWidth: 3,
      nameColor: Color.BLACK,
      showNameBackground: true,
      onGround: true,
      trajectories: [
        {
          endPoint: {
            latitude: -2357738.818916629,
            longitude: -3744363.8452795367,
            height: 4582221.267376511,
          },
          lineWidth: 3,
          lineColor: Color.BLUE,
        },
        {
          endPoint: {
            latitude: -2356712.8963028514,
            longitude: -3744654.309589595,
            height: 4581451.62392065,
          },
          lineWidth: 3,
          lineColor: Color.BLUE,
        },
      ],
    },
  },
  {
    name: 'ground attack',
    targetsMetadata: {
      name: 'Grad20',
      location: {
        latitude: -2370031.916535637,
        longitude: -3634817.2694530417,
        height: 4662991.599369745,
      },
      color: Color.GREEN,
      pixelSize: 20,
      outlineColor: Color.RED,
      outlineWidth: 3,
      nameColor: Color.BLACK,
      showNameBackground: true,
      onGround: true,
      trajectories: [
        {
          name: 'Attack from ground',
          endPoint: {
            latitude: -2356712.8963028514,
            longitude: -3744454.309589595,
            height: 4581451.62392065,
          },
          lineWidth: 3,
          lineColor: Color.GREEN,
        },
        {
          name: 'Attack from ground',
          endPoint: {
            latitude: -2356712.8963028514,
            longitude: -3744654.309589595,
            height: 4581451.62392065,
          },
          lineWidth: 3,
          lineColor: Color.GREEN,
        },
        {
          name: 'Attack from ground',
          endPoint: {
            latitude: -2356912.8963028514,
            longitude: -3744654.309589595,
            height: 4581451.62392065,
          },
          lineWidth: 3,
          lineColor: Color.GREEN,
        },
      ],
    },
  },
];
