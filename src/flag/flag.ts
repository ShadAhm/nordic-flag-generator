import { FlagSpec } from "./flag-spec";
import { FlagColour } from "./flag-colour";

export class Flag {
    public height: number = 0;
    public width: number = 0;
    public crossVerticalWidth: number = 0;
    public crossVerticalPosX: number = 0;
    public crossHorizontalHeight: number = 0;
    public crossHorizontalPosY: number = 0;
    public innerCrossVerticalWidth: number = 0;
    public innerCrossVerticalPosX: number = 0;
    public innerCrossHorizontalHeight: number = 0;
    public innerCrossHorizontalPosY: number = 0;
    public backgroundColour: string = '';
    public crossColour: string = '';
    public innerCrossColour: string = '';
    public hasInnerCross = false;

    constructor() {
    }

    drawFromSpec(width: number, spec: FlagSpec): Flag {
        this.width = width;
        this.height = width / spec.aspectRatio;

        this.crossVerticalWidth = width * spec.verticalCrossProportion;
        this.crossHorizontalHeight = spec.hasEqualCrossWidthAndHeight ? this.crossVerticalWidth : this.height * spec.horizontalCrossProportion;

        this.crossVerticalPosX = width * spec.verticalCrossDistanceFromLeft - (this.crossVerticalWidth / 2);
        this.crossHorizontalPosY = this.height * spec.horizontalCrossDistanceFromTop - (this.crossHorizontalHeight / 2);
        this.hasInnerCross = spec.hasInnerCross;

        if(spec.hasInnerCross) {
            this.innerCrossVerticalWidth = this.crossVerticalWidth * spec.verticalInnerCrossProportion;
            this.innerCrossVerticalPosX = width * spec.verticalCrossDistanceFromLeft - (this.innerCrossVerticalWidth / 2);
            this.innerCrossHorizontalHeight = spec.hasEqualCrossWidthAndHeight ? this.innerCrossVerticalWidth : this.crossHorizontalHeight * spec.horizontalInnerCrossProportion;
            this.innerCrossHorizontalPosY = this.height * spec.horizontalCrossDistanceFromTop - (this.innerCrossHorizontalHeight / 2);
        }

        return this;
    }

    colourize(colour: FlagColour): Flag {
        this.backgroundColour = colour.backgroundColour;
        this.crossColour = colour.crossColour;
        this.innerCrossColour = colour.innerCrossColour;
        return this;
    }
}