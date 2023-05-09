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
        this.crossVerticalPosX = width * spec.verticalCrossDistanceFromLeft;
        this.crossHorizontalHeight = spec.hasEqualCrossWidthAndHeight ? this.crossVerticalWidth : this.height * spec.horizontalCrossProportion;
        this.crossHorizontalPosY = this.height * spec.horizontalCrossDistanceFromTop;
        this.hasInnerCross = spec.hasInnerCross;

        if(spec.hasInnerCross) {
            this.innerCrossVerticalWidth = width * spec.verticalInnerCrossProportion;
            this.innerCrossVerticalPosX = width * spec.verticalInnerCrossDistanceFromLeft;
            this.innerCrossHorizontalHeight = spec.hasEqualCrossWidthAndHeight ? this.innerCrossVerticalWidth : this.height * spec.horizontalInnerCrossProportion;
            this.innerCrossHorizontalPosY = this.height * spec.horizontalInnerCrossDistanceFromTop;
        }

        return this;
    }

    colourize(colour: FlagColour): Flag {
        this.backgroundColour = colour.backgroundColour;
        this.crossColour = colour.crossColour;
        this.innerCrossColour = colour.innerCrossColour;
        return this;
    }

    paint() {
        const flagDiagramSvg = document.getElementById("diag-flag");
        const crossHorizontal = document.getElementById("diag-flag-cross-h");
        const crossVertical = document.getElementById("diag-flag-cross-v");
        const innerCrossHorizontal = document.getElementById("diag-flag-innercross-h");
        const innerCrossVertical = document.getElementById("diag-flag-innercross-v");
        const background = document.getElementById("diag-flag-background");

        if (crossHorizontal == null || crossVertical == null || innerCrossHorizontal == null || innerCrossVertical == null || background == null || flagDiagramSvg == null) {
            throw new Error("Could not find one of the SVG elements");
        }

        crossHorizontal.style.fill = this.crossColour;
        crossVertical.style.fill = this.crossColour;
        background.style.fill = this.backgroundColour;

        flagDiagramSvg.setAttribute("width", this.width.toString());
        flagDiagramSvg.setAttribute("height", this.height.toString());
        flagDiagramSvg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
        background.setAttribute("width", this.width.toString());
        background.setAttribute("height", this.height.toString());

        crossHorizontal.setAttribute("height", this.crossHorizontalHeight.toString());
        crossHorizontal.setAttribute("width", this.width.toString());
        crossHorizontal.setAttribute("y", this.crossHorizontalPosY.toString());

        crossVertical.setAttribute("width", this.crossVerticalWidth.toString());
        crossVertical.setAttribute("height", this.height.toString());
        crossVertical.setAttribute("x", this.crossVerticalPosX.toString());

        if (!this.hasInnerCross) {
            innerCrossHorizontal.setAttribute("display", "none");
            innerCrossVertical.setAttribute("display", "none");
        }
        else {
            innerCrossHorizontal.setAttribute("display", "inline");
            innerCrossVertical.setAttribute("display", "inline");

            innerCrossHorizontal.style.fill = this.innerCrossColour;
            innerCrossVertical.style.fill = this.innerCrossColour;

            innerCrossHorizontal.setAttribute("height", this.innerCrossHorizontalHeight.toString());
            innerCrossHorizontal.setAttribute("width", this.width.toString());
            innerCrossHorizontal.setAttribute("y", this.innerCrossHorizontalPosY.toString());

            innerCrossVertical.setAttribute("width", this.innerCrossVerticalWidth.toString());
            innerCrossVertical.setAttribute("height", this.height.toString());
            innerCrossVertical.setAttribute("x", this.innerCrossVerticalPosX.toString());
        }

        return this;
    }
}