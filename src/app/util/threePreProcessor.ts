export class ThreePreProcessor {

  private returnMap: Map<number, any> = new Map<number, any[]>();

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.returnMap.set(i, []);
    }
  }

  processData(rawGeoJson: any): Map<number, any[]> {
    rawGeoJson.features.forEach((feature: any) => {
      this.returnMap.get(feature.properties.bird_risk).push(feature);
    });

    return this.returnMap;
  }
}
