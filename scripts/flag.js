export class Flag {
    height;
    width;
    crossVerticalWidth;
    crossVerticalPosX;
    crossHorizontalHeight;
    crossHorizontalPosY;
    innerCrossVerticalWidth;
    innerCrossVerticalPosX;
    innerCrossHorizontalHeight;
    innerCrossHorizontalPosY;
    backgroundColour;
    crossColour;
    innerCrossColour;

    constructor() {
    }

    drawFromSpec(width, spec) {
        this.width = width;
        this.height = width / spec.aspectRatio;

        this.crossVerticalWidth = width * spec.verticalCrossProportion;
        this.crossVerticalPosX = width * spec.verticalCrossDistanceFromLeft;
        this.crossHorizontalHeight = this.height * spec.horizontalCrossProportion;
        this.crossHorizontalPosY = this.height  *  spec.horizontalCrossDistanceFromTop;

        this.innerCrossVerticalWidth = width * spec.verticalInnerCrossProportion;
        this.innerCrossVerticalPosX = width  *  spec.verticalInnerCrossDistanceFromLeft;
        this.innerCrossHorizontalHeight = this.height * spec.horizontalInnerCrossProportion;
        this.innerCrossHorizontalPosY = this.height * spec.horizontalInnerCrossDistanceFromTop;

        return this;
    }

    colourize(colour) {
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
    
        crossHorizontal.style.fill = this.crossColour;
        crossVertical.style.fill = this.crossColour;
        innerCrossHorizontal.style.fill = this.innerCrossColour;
        innerCrossVertical.style.fill = this.innerCrossColour;
    
        background.style.fill = this.backgroundColour;

        flagDiagramSvg.setAttribute("width", this.width);
        flagDiagramSvg.setAttribute("height", this.height);
        flagDiagramSvg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
        background.setAttribute("width", this.width);
        background.setAttribute("height", this.height);

        crossHorizontal.setAttribute("height", this.crossHorizontalHeight);
        crossHorizontal.setAttribute("width", this.width);
        crossHorizontal.setAttribute("y", this.crossHorizontalPosY);

        crossVertical.setAttribute("width", this.crossVerticalWidth);
        crossVertical.setAttribute("height", this.height);
        crossVertical.setAttribute("x", this.crossVerticalPosX);

        innerCrossHorizontal.setAttribute("height", this.innerCrossHorizontalHeight);
        innerCrossHorizontal.setAttribute("width", this.width);
        innerCrossHorizontal.setAttribute("y", this.innerCrossHorizontalPosY);

        innerCrossVertical.setAttribute("width", this.innerCrossVerticalWidth);
        innerCrossVertical.setAttribute("height", this.height);
        innerCrossVertical.setAttribute("x", this.innerCrossVerticalPosX);

        return this;
    }
}