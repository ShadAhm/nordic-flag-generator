import { FlagSpecBuilder } from "./flag-spec-builder.js";
import { FlagColourBuilder } from "./flag-colour-builder.js";

attachEventListeners();
const flagColorBuilder = new FlagColourBuilder();
const flagSpecBuilder = new FlagSpecBuilder();

function attachEventListeners() {
    const flagBackgroundColourInput = document.getElementById('flag-background-colour');
    flagBackgroundColourInput.addEventListener('change', updateFlagColourFromInput);

    const flagCrossColourInput = document.getElementById('flag-cross-colour');
    flagCrossColourInput.addEventListener('change', updateFlagColourFromInput);

    const flagInnerCrossColourInput = document.getElementById('flag-innercross-colour');
    flagInnerCrossColourInput.addEventListener('change', updateFlagColourFromInput);

    const flagHasInnerCrossYesInput = document.getElementById('flag-inner-cross-yes');
    flagHasInnerCrossYesInput.addEventListener('change', updateFlag);

    const flagHasInnerCrossNoInput = document.getElementById('flag-inner-cross-no');
    flagHasInnerCrossNoInput.addEventListener('change', updateFlag);

    const flagRatioSwedenInput = document.getElementById('flag-ratio-sweden');
    flagRatioSwedenInput.addEventListener('change', updateFlag);

    const flagRatioDenmarkInput = document.getElementById('flag-ratio-denmark');
    flagRatioDenmarkInput.addEventListener('change', updateFlag);

    const flagRatioNorwayInput = document.getElementById('flag-ratio-norway');
    flagRatioNorwayInput.addEventListener('change', updateFlag);

    const flagRatioFinlandInput = document.getElementById('flag-ratio-finland');
    flagRatioFinlandInput.addEventListener('change', updateFlag);

    const flagRatioIcelandInput = document.getElementById('flag-ratio-iceland');
    flagRatioIcelandInput.addEventListener('change', updateFlag);

    const flagTemplateSwedenInput = document.getElementById('flag-template-sweden');
    flagTemplateSwedenInput.addEventListener('change', updateFlagTemplate);

    const flagTemplateDenmarkInput = document.getElementById('flag-template-denmark');
    flagTemplateDenmarkInput.addEventListener('change', updateFlagTemplate);

    const flagTemplateNorwayInput = document.getElementById('flag-template-norway');
    flagTemplateNorwayInput.addEventListener('change', updateFlagTemplate);

    const flagTemplateFinlandInput = document.getElementById('flag-template-finland');
    flagTemplateFinlandInput.addEventListener('change', updateFlagTemplate);

    const flagTemplateIcelandInput = document.getElementById('flag-template-iceland');
    flagTemplateIcelandInput.addEventListener('change', updateFlagTemplate);
}

function updateFlag() {
    const {
        innerCrossColour,
        crossColour,
        backgroundColour,
        flagRatio,
        hasInnerCross,
        flagTemplate
    } = readUserInputs();

    updateFlagColours(innerCrossColour, crossColour, backgroundColour, hasInnerCross);
    updateFlagDimensions(flagRatio);
}

function updateFlagTemplate() {
    const flagTemplate = readFromRadioButtons("flag-template");
    const { backgroundColour, crossColour, innerCrossColour } = flagColorBuilder.withTemplate(flagTemplate).build();

    updateFlagColours(innerCrossColour, crossColour, backgroundColour, false);
    updateFlagDimensions(flagTemplate);
}

function updateFlagColourFromInput() {
    const { backgroundColour, crossColour, innerCrossColour } = flagColorBuilder.withColours(
        document.getElementById("flag-background-colour").value,
        document.getElementById("flag-cross-colour").value,
        document.getElementById("flag-innercross-colour").value
    ).build();

    updateFlagColours(innerCrossColour, crossColour, backgroundColour, false);
}

function readUserInputs() {
    const innerCrossColour = document.getElementById("flag-innercross-colour").value;
    const crossColour = document.getElementById("flag-cross-colour").value;
    const backgroundColour = document.getElementById("flag-background-colour").value;
    const flagRatio = readFromRadioButtons("flag-ratio");
    const flagTemplate = readFromRadioButtons("flag-template");
    const hasInnerCross = readFromRadioButtons("flag-has-inner-cross") == 'yes';

    return {
        innerCrossColour,
        crossColour: crossColour,
        backgroundColour,
        flagRatio,
        hasInnerCross,
        flagTemplate
    }
}

function readFromRadioButtons(whichName) {
    const radios = document.getElementsByName(whichName);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function updateFlagColours(innerCrossColour, CrossColour, backgroundColour, hasInnerCross) {
    const crossHorizontal = document.getElementById("diag-flag-cross-h");
    const crossVertical = document.getElementById("diag-flag-cross-v");
    const innerCrossHorizontal = document.getElementById("diag-flag-innercross-h");
    const innerCrossVertical = document.getElementById("diag-flag-innercross-v");
    const background = document.getElementById("diag-flag-background");

    // innerCrossVertical.style.opacity = hasInnerCross ? 1 : 0;
    // innerCrossHorizontal.style.opacity = hasInnerCross ? 1 : 0;

    crossHorizontal.style.fill = CrossColour;
    crossVertical.style.fill = CrossColour;
    innerCrossHorizontal.style.fill = innerCrossColour;
    innerCrossVertical.style.fill = innerCrossColour;

    background.style.fill = backgroundColour;
}

function updateFlagDimensions(flagRatio) {
    var {
        width,
        height,
        innerCrossHorizontalHeight,
        innerCrossHorizontalPosY,
        innerCrossVerticalWidth,
        innerCrossVerticalPosX,
        crossHorizontalHeight,
        crossHorizontalPosY,
        crossVerticalWidth,
        crossVerticalPosX
    } = flagSpecBuilder
        .withWidth(450)
        .withTemplateName(flagRatio)
        .build();

    const flagDiagramSvg = document.getElementById("diag-flag");
    flagDiagramSvg.setAttribute("width", width);
    flagDiagramSvg.setAttribute("height", height);
    flagDiagramSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const flagBackground = document.getElementById("diag-flag-background");
    flagBackground.setAttribute("width", width);
    flagBackground.setAttribute("height", height);

    const crossHorizontal = document.getElementById("diag-flag-cross-h");
    crossHorizontal.setAttribute("width", width);
    crossHorizontal.setAttribute("height", crossHorizontalHeight);
    crossHorizontal.setAttribute("y", crossHorizontalPosY);

    const crossVertical = document.getElementById("diag-flag-cross-v");
    crossVertical.setAttribute("height", height);
    crossVertical.setAttribute("width", crossVerticalWidth);
    crossVertical.setAttribute("x", crossVerticalPosX);

    const innerCrossHorizontal = document.getElementById("diag-flag-innercross-h");
    innerCrossHorizontal.setAttribute("width", width);
    innerCrossHorizontal.setAttribute("height", innerCrossHorizontalHeight);
    innerCrossHorizontal.setAttribute("y", innerCrossHorizontalPosY);

    const innerCrossVertical = document.getElementById("diag-flag-innercross-v");
    innerCrossVertical.setAttribute("height", height);
    innerCrossVertical.setAttribute("width", innerCrossVerticalWidth);
    innerCrossVertical.setAttribute("x", innerCrossVerticalPosX);
}