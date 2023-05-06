import { FlagSpecBuilder } from "./flag-spec-builder.js";
import { FlagColourBuilder } from "./flag-colour-builder.js";
import { Flag } from "./flag.js";
 
attachEventListeners();
const flagColorBuilder = new FlagColourBuilder();
const flagSpecBuilder = new FlagSpecBuilder();

function attachEventListeners() {
    document.getElementById('flag-template-sweden').addEventListener('change', useTemplate);
    document.getElementById('flag-template-denmark').addEventListener('change', useTemplate);
    document.getElementById('flag-template-norway').addEventListener('change', useTemplate);
    document.getElementById('flag-template-finland').addEventListener('change', useTemplate);
    document.getElementById('flag-template-iceland').addEventListener('change', useTemplate);

    document.getElementById('flag-background-colour').addEventListener('change', updateFlagColourFromInput);
    document.getElementById('flag-cross-colour').addEventListener('change', updateFlagColourFromInput);
    document.getElementById('flag-innercross-colour').addEventListener('change', updateFlagColourFromInput);
    document.getElementById('flag-ratio-sweden').addEventListener('change', updateFlagRatio);
    document.getElementById('flag-ratio-denmark').addEventListener('change', updateFlagRatio);
    document.getElementById('flag-ratio-norway').addEventListener('change', updateFlagRatio);
    document.getElementById('flag-ratio-finland').addEventListener('change', updateFlagRatio);
    document.getElementById('flag-ratio-iceland').addEventListener('change', updateFlagRatio);
    document.getElementById('flag-ratio-custom').addEventListener('change', updateFlagRatio);
    // document.getElementById('flag-inner-cross-yes').addEventListener('change', updateFlag);
    // document.getElementById('flag-inner-cross-no').addEventListener('change', updateFlag);
}

function updateFlagRatio() {
}

function useTemplate() {
    const flagTemplateName = readFromRadioButtons("flag-template");
    const flagWidth = 500;

    const flagColour = flagColorBuilder
        .withTemplate(flagTemplateName)
        .build();
    const flagSpec = flagSpecBuilder
        .withTemplateName(flagTemplateName)
        .build();

    new Flag()
        .drawFromSpec(flagWidth, flagSpec)
        .colourize(flagColour)
        .paint();

    document.getElementById("flag-background-colour").value = flagColour.backgroundColour;
    document.getElementById("flag-cross-colour").value = flagColour.crossColour;
    document.getElementById("flag-innercross-colour").value = flagColour.innerCrossColour;

    setRadioButton('flag-ratio', flagTemplateName);

    document.getElementById("flag-ratio-custom").value = flagSpec.aspectRatio;
    document.getElementById("flag-cross-v-width").value = flagSpec.verticalCrossProportion;
    document.getElementById("flag-cross-h-height").value = flagSpec.horizontalCrossProportion;
    document.getElementById("flag-innercross-v-width").value = flagSpec.verticalInnerCrossProportion;
    document.getElementById("flag-innercross-h-height").value = flagSpec.horizontalInnerCrossProportion;

    document.getElementById("flag-cross-v-left").value = flagSpec.verticalCrossDistanceFromLeft;
    document.getElementById("flag-cross-h-top").value = flagSpec.horizontalCrossDistanceFromTop;
    document.getElementById("flag-innercross-v-left").value = flagSpec.verticalInnerCrossDistanceFromLeft;
    document.getElementById("flag-innercross-h-top").value = flagSpec.horizontalInnerCrossDistanceFromTop;
}

function updateFlagColourFromInput() {
}

function readFromRadioButtons(whichName) {
    const radios = document.getElementsByName(whichName);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function setRadioButton(whichName, whichValue) {
    const radios = document.getElementsByName(whichName);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].value == whichValue) {
            radios[i].checked = true;
        }
    }
}