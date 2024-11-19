export class ThreePreProcessor {

  private returnMap: Map<number, any> = new Map<number, any[]>();

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.returnMap.set(i, []);
    }
  }

  processData(rawGeoJson: any): Map<number, any[]> {
    rawGeoJson.features.forEach((feature: any) => {
      this.returnMap.get(this.selectLayerFromHeight(feature.geometry.coordinates[2])).push(feature);
    });

    return this.returnMap;
  }

  selectLayerFromHeight(height: number): number {
    if (height >= 12000)
      return 10;
    else if (height >= 10000 && height < 12000)
      return 9;
    else if  (height >= 8000 && height < 10000)
      return 8;
    else if  (height >= 6000 && height < 8000)
      return 7;
    else if  (height >= 5000 && height < 6000)
      return 6;
    else if  (height >= 4000 && height < 5000)
      return 5;
    else if  (height >= 3000 && height < 4000)
      return 4;
    else if  (height >= 2000 && height < 3000)
      return 3;
    else if  (height >= 1000 && height < 2000)
      return 2;
    else
      return 1;

  }

}
