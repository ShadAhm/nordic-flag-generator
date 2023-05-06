import { FlagSpecBuilder } from "./flag-spec-builder.js";
import { FlagColourBuilder } from "./flag-colour-builder.js";
import { Flag } from "./flag.js";

attachEventListeners();
const flagColorBuilder = new FlagColourBuilder();
const flagSpecBuilder = new FlagSpecBuilder();

useTemplate();

function attachEventListeners() {
    document.getElementById('flag-template-sweden').addEventListener('change', useTemplate);
    document.getElementById('flag-template-denmark').addEventListener('change', useTemplate);
    document.getElementById('flag-template-norway').addEventListener('change', useTemplate);
    document.getElementById('flag-template-finland').addEventListener('change', useTemplate);
    document.getElementById('flag-template-iceland').addEventListener('change', useTemplate);

    document.getElementById('flag-width').addEventListener('change', updateFlagFromInput);

    document.getElementById('flag-background-colour').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-cross-colour').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-innercross-colour').addEventListener('change', updateFlagFromInput);
    
    document.getElementById('flag-ratio-custom').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-ratio-sweden').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-ratio-denmark').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-ratio-norway').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-ratio-finland').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-ratio-iceland').addEventListener('change', updateFlagFromInput);

    document.getElementById('flag-cross-v-width').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-cross-h-height').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-innercross-v-width').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-innercross-h-height').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-cross-v-left').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-cross-h-top').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-innercross-v-left').addEventListener('change', updateFlagFromInput);
    document.getElementById('flag-innercross-h-top').addEventListener('change', updateFlagFromInput);

    // document.getElementById('flag-inner-cross-yes').addEventListener('change', updateFlag);
    // document.getElementById('flag-inner-cross-no').addEventListener('change', updateFlag);
}

function useTemplate() {
    const inputFlagTemplateName = readFromRadioButtons("flag-template");
    const flagWidth = parseFloat(document.getElementById("flag-width").value);

    const flagColour = flagColorBuilder
        .withTemplate(inputFlagTemplateName)
        .build();
    const flagSpec = flagSpecBuilder
        .withTemplateName(inputFlagTemplateName)
        .build();

    new Flag()
        .drawFromSpec(flagWidth, flagSpec)
        .colourize(flagColour)
        .paint();

    setKnobsBasedOnTemplate(flagColour, inputFlagTemplateName, flagSpec);
}

function updateFlagFromInput() {
    const userInputs = getFormValues();

    const flagColour = flagColorBuilder
        .withUserInputs(userInputs)
        .build();
    const flagSpec = flagSpecBuilder
        .withUserInputs(userInputs)
        .build();

    new Flag()
        .drawFromSpec(userInputs['flag-width'], flagSpec)
        .colourize(flagColour)
        .paint();
}


function setKnobsBasedOnTemplate(flagColour, flagTemplateName, flagSpec) {
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

/*
    Outputs:
    flag-background-colour:"#bf0028"
    flag-cross-colour:"#ffffff"
    flag-cross-h-height:"0.1426"
    flag-cross-h-top:"0.4286"
    flag-cross-v-left:"0.3241"
    flag-cross-v-width:"0.1081"
    flag-inner-cross-no:"no"
    flag-innercross-colour:"#ffffff"
    flag-innercross-h-height:"0.0001"
    flag-innercross-h-top:"0.0001"
    flag-innercross-v-left:"0.0001"
    flag-innercross-v-width:"0.0001"
    flag-ratio-custom:"1.3"
    flag-ratio-norway:"norway"
    flag-template-denmark:"denmark"
    flag-width:"450"
*/
function getFormValues() {
    const inputs = document.querySelectorAll('input');
    const values = {};

    inputs.forEach(input => {
        if (input.type === 'radio' && !input.checked) {
            return; 
        }

        if (input.type === 'range') {
            values[input.id] = parseFloat(input.value);
        } else {
            values[input.id] = input.value;
        }
    });

    return values;
}