import { FlagSpec } from "./flag-spec.js";
import { InputForm } from "./input-form.js";

export class FlagSpecBuilder {
    aspectRatio = 0;

    verticalCrossProportion = 0; // the proportion of the width of the flag that the vertical cross takes up
    verticalInnerCrossProportion = 0;
    verticalCrossDistanceFromLeft = 0;
    verticalInnerCrossDistanceFromLeft = 0;

    horizontalCrossProportion = 0; // the proportion of the height of the flag that the horizontal cross takes up
    horizontalInnerCrossProportion = 0;
    horizontalCrossDistanceFromTop = 0;
    horizontalInnerCrossDistanceFromTop = 0;

    constructor() {
    }
    
    withTemplateName(templateName: string) {
        switch (templateName) {
            case 'norway':
                {
                    this.aspectRatio = 1.375;
                    this.verticalCrossProportion = 0.1818;
                    this.horizontalCrossProportion = 0.25;
                    this.verticalInnerCrossProportion = 0.0909;
                    this.horizontalInnerCrossProportion = 0.125;
                    this.horizontalCrossDistanceFromTop = 0.375;
                    this.horizontalInnerCrossDistanceFromTop = 0.4375;
                    this.verticalCrossDistanceFromLeft = 0.2727;
                    this.verticalInnerCrossDistanceFromLeft = 0.3181;
                    break;
                }
            case 'denmark':
                {
                    this.aspectRatio = 1.321;
                    this.verticalCrossProportion = 0.1081;
                    this.horizontalCrossProportion = 0.1428;
                    this.verticalInnerCrossProportion = 0;
                    this.horizontalInnerCrossProportion = 0;
                    this.horizontalCrossDistanceFromTop = 0.4285;
                    this.horizontalInnerCrossDistanceFromTop = 0;
                    this.verticalCrossDistanceFromLeft = 0.3243;
                    this.verticalInnerCrossDistanceFromLeft = 0;
                    break;
                }
            case 'finland':
                {
                    this.aspectRatio = 1.636;
                    this.verticalCrossProportion = 0.166;
                    this.horizontalCrossProportion = 0.2727;
                    this.verticalInnerCrossProportion = 0;
                    this.horizontalInnerCrossProportion = 0;
                    this.horizontalCrossDistanceFromTop = 0.3636;
                    this.horizontalInnerCrossDistanceFromTop = 0;
                    this.verticalCrossDistanceFromLeft = 0.2777;
                    this.verticalInnerCrossDistanceFromLeft = 0;
                    break;
                }
            case 'iceland':
                {
                    this.aspectRatio = 1.389;
                    this.verticalCrossProportion = 0.16;
                    this.horizontalCrossProportion = 0.2222;
                    this.verticalInnerCrossProportion = 0.08;
                    this.horizontalInnerCrossProportion = 0.1111;
                    this.horizontalCrossDistanceFromTop =  0.3888;
                    this.horizontalInnerCrossDistanceFromTop = 0.4444;
                    this.verticalCrossDistanceFromLeft = 0.28;
                    this.verticalInnerCrossDistanceFromLeft = 0.32;
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
                    this.horizontalCrossDistanceFromTop =  0.4;
                    this.horizontalInnerCrossDistanceFromTop = 0;
                    this.verticalCrossDistanceFromLeft = 0.3125;
                    this.verticalInnerCrossDistanceFromLeft = 0;
                    break;
                }
        }

        return this;
    }

    withUserInputs(userInputs: InputForm) {
        this.aspectRatio = userInputs.flagRatioCustom;
        this.verticalCrossProportion = userInputs.flagCrossVWidth;
        this.horizontalCrossProportion = userInputs.flagCrossHHeight;
        this.verticalInnerCrossProportion = userInputs.flagInnerCrossVWidth;
        this.horizontalInnerCrossProportion = userInputs.flagInnerCrossHHeight;
        this.horizontalCrossDistanceFromTop =  userInputs.flagCrossHTop;
        this.horizontalInnerCrossDistanceFromTop = userInputs.flagInnerCrossHTop;
        this.verticalCrossDistanceFromLeft = userInputs.flagCrossVLeft;
        this.verticalInnerCrossDistanceFromLeft = userInputs.flagInnerCrossVLeft;

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
            this.horizontalInnerCrossDistanceFromTop,
            this.verticalCrossDistanceFromLeft,
            this.verticalInnerCrossDistanceFromLeft
        )
    }
}