import { FlagSpec } from "./flag-spec.js";
import { InputForm } from "./input-form.js";

export class FlagSpecBuilder {
    aspectRatio = 0;

    verticalCrossProportion = 0; // the proportion of the width of the flag that the vertical cross takes up
    verticalInnerCrossProportion = 0;
    verticalCrossDistanceFromLeft = 0;

    horizontalCrossProportion = 0; // the proportion of the height of the flag that the horizontal cross takes up
    horizontalInnerCrossProportion = 0;
    horizontalCrossDistanceFromTop = 0;

    hasInnerCross: boolean = false;
    hasEqualCrossWidthAndHeight: boolean = false; 

    constructor() {
    }
    
    withTemplateName(templateName: string) {
        switch (templateName) {
            case 'norway':
                {
                    this.aspectRatio = 1.375;
                    this.verticalCrossProportion = 0.1818;
                    this.horizontalCrossProportion = 0.25;
                    this.horizontalCrossDistanceFromTop = 0.5;
                    this.verticalCrossDistanceFromLeft = 0.3636;
                    this.hasInnerCross = true;
                    this.verticalInnerCrossProportion = 0.5;
                    this.horizontalInnerCrossProportion = 0.5;
                    this.hasEqualCrossWidthAndHeight = false;
                    break;
                }
            case 'denmark':
                {
                    this.aspectRatio = 1.321;
                    this.verticalCrossProportion = 0.1081;
                    this.horizontalCrossProportion = 0.1428;
                    this.verticalInnerCrossProportion = 0;
                    this.horizontalInnerCrossProportion = 0;
                    this.horizontalCrossDistanceFromTop = 0.5;
                    this.verticalCrossDistanceFromLeft = 0.3783;
                    this.hasInnerCross = false;
                    this.hasEqualCrossWidthAndHeight = false;
                    break;
                }
            case 'finland':
                {
                    this.aspectRatio = 1.636;
                    this.verticalCrossProportion = 0.166;
                    this.horizontalCrossProportion = 0.2727;
                    this.verticalInnerCrossProportion = 0;
                    this.horizontalInnerCrossProportion = 0;
                    this.horizontalCrossDistanceFromTop = 0.5;
                    this.verticalCrossDistanceFromLeft = 0.3055;
                    this.hasInnerCross = false;
                    this.hasEqualCrossWidthAndHeight = false;
                    break;
                }
            case 'iceland':
                {
                    this.aspectRatio = 1.389;
                    this.verticalCrossProportion = 0.16;
                    this.horizontalCrossProportion = 0.2222;
                    this.verticalInnerCrossProportion = 0.5;
                    this.horizontalInnerCrossProportion = 0.5;
                    this.horizontalCrossDistanceFromTop = 0.5;
                    this.verticalCrossDistanceFromLeft = 0.32;
                    this.hasInnerCross = true;
                    this.hasEqualCrossWidthAndHeight = false;
                    break;
                }
            case 'sweden':
            default:
                {
                    this.aspectRatio = 1.6;
                    this.verticalCrossProportion = 0.125;
                    this.horizontalCrossProportion = 0.2;
                    this.verticalInnerCrossProportion = 0;
                    this.horizontalInnerCrossProportion = 0;
                    this.horizontalCrossDistanceFromTop =  0.5;
                    this.verticalCrossDistanceFromLeft = 0.375;
                    this.hasInnerCross = false;
                    this.hasEqualCrossWidthAndHeight = false;
                    break;
                }
        }

        return this;
    }

    withUserInputs(userInputs: InputForm) {
        this.aspectRatio = userInputs.flagRatioCustom;
        this.hasInnerCross = userInputs.flagHasInnerCross;
        this.verticalCrossProportion = userInputs.flagCrossVWidth;
        this.horizontalCrossProportion = userInputs.flagCrossHHeight;
        this.verticalInnerCrossProportion = userInputs.flagInnerCrossVWidth;
        this.horizontalInnerCrossProportion = userInputs.flagInnerCrossHHeight;
        this.horizontalCrossDistanceFromTop =  userInputs.flagCrossHTop;
        this.verticalCrossDistanceFromLeft = userInputs.flagCrossVLeft;

        return this;
    }

    withRatio(ratio: number) {
        this.aspectRatio = ratio;
        return this;
    }

    withRatioTemplate(ratioTemplateName: string) {
        switch (ratioTemplateName) {
            case 'norway': {
                this.aspectRatio = 1.375;
                break;
            }
            case 'denmark': {
                this.aspectRatio = 1.321;
                break;
            }
            case 'finland': {
                this.aspectRatio = 1.636;
                break;
            }
            case 'iceland': {
                this.aspectRatio = 1.389;
                break;
            }
            case 'sweden':
            default: {
                this.aspectRatio = 1.6;
                break;
            }
        }

        return this;
    }

    build() {
        return new FlagSpec(
            this.aspectRatio,
            this.verticalCrossProportion,
            this.verticalInnerCrossProportion,
            this.horizontalCrossProportion,
            this.horizontalCrossDistanceFromTop,
            this.horizontalInnerCrossProportion,
            this.verticalCrossDistanceFromLeft,
            this.hasInnerCross,
            this.hasEqualCrossWidthAndHeight
        )
    }
}