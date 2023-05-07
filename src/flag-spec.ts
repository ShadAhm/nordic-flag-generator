export class FlagSpec {
    constructor(public aspectRatio: number, public  verticalCrossProportion: number, public  verticalInnerCrossProportion: number, public  horizontalCrossProportion: number, public horizontalCrossDistanceFromTop: number, public horizontalInnerCrossProportion: number, public horizontalInnerCrossDistanceFromTop: number, public verticalCrossDistanceFromLeft: number, public verticalInnerCrossDistanceFromLeft: number) {
        this.aspectRatio = aspectRatio;
        this.verticalCrossProportion = verticalCrossProportion;
        this.verticalInnerCrossProportion = verticalInnerCrossProportion;
        this.horizontalCrossProportion = horizontalCrossProportion;
        this.horizontalCrossDistanceFromTop =  horizontalCrossDistanceFromTop;
        this.horizontalInnerCrossProportion = horizontalInnerCrossProportion;
        this.horizontalInnerCrossDistanceFromTop = horizontalInnerCrossDistanceFromTop;
        this.verticalCrossDistanceFromLeft = verticalCrossDistanceFromLeft;
        this.verticalInnerCrossDistanceFromLeft = verticalInnerCrossDistanceFromLeft;
      }
}