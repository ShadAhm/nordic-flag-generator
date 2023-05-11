export class FlagSpec {
    constructor(public aspectRatio: number, 
      public  verticalCrossProportion: number, 
      public  verticalInnerCrossProportion: number, 
      public  horizontalCrossProportion: number, 
      public horizontalCrossDistanceFromTop: number, 
      public horizontalInnerCrossProportion: number, 
      public verticalCrossDistanceFromLeft: number, 
      public hasInnerCross: boolean,
      public hasEqualCrossWidthAndHeight: boolean) {
        this.aspectRatio = aspectRatio;
        this.verticalCrossProportion = verticalCrossProportion;
        this.verticalInnerCrossProportion = verticalInnerCrossProportion;
        this.horizontalCrossProportion = horizontalCrossProportion;
        this.horizontalCrossDistanceFromTop =  horizontalCrossDistanceFromTop;
        this.horizontalInnerCrossProportion = horizontalInnerCrossProportion;
        this.verticalCrossDistanceFromLeft = verticalCrossDistanceFromLeft;
        this.hasInnerCross = hasInnerCross;
        this.hasEqualCrossWidthAndHeight = hasEqualCrossWidthAndHeight;
      }
}