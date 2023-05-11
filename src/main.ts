import { FlagSpecBuilder } from "./flag-spec-builder.js";
import { FlagColourBuilder } from "./flag-colour-builder.js";
import { Flag } from "./flag.js";
import { InputForm } from "./input-form.js";
import { FlagColour } from "./flag-colour.js";
import { FlagSpec } from "./flag-spec.js";

attachEventListeners();
const flagColorBuilder = new FlagColourBuilder();
const flagSpecBuilder = new FlagSpecBuilder();

updateFlagFromInput(null);

function attachEventListeners(): void {
        document.getElementById('flag-template-sweden')?.addEventListener('click', useTemplate as EventListener);
        document.getElementById('flag-template-denmark')?.addEventListener('click', useTemplate as EventListener);
        document.getElementById('flag-template-norway')?.addEventListener('click', useTemplate as EventListener);
        document.getElementById('flag-template-finland')?.addEventListener('click', useTemplate as EventListener);
        document.getElementById('flag-template-iceland')?.addEventListener('click', useTemplate as EventListener);

        document.getElementById('flag-width')?.addEventListener('change', updateFlagFromInput as EventListener);

        document.getElementById('flag-background-colour')?.addEventListener('change', updateFlagFromInput as EventListener);
        document.getElementById('flag-cross-colour')?.addEventListener('change', updateFlagFromInput as EventListener);
        document.getElementById('flag-innercross-colour')?.addEventListener('change', updateFlagFromInput as EventListener);

        document.getElementById('flag-ratio-custom')?.addEventListener('change', updateFlagFromInput  as EventListener);
        document.getElementById('flag-aspect-ratio-like-sweden')?.addEventListener('click', updateFlagFromInput as EventListener);
        document.getElementById('flag-aspect-ratio-like-denmark')?.addEventListener('click', updateFlagFromInput as EventListener);
        document.getElementById('flag-aspect-ratio-like-norway')?.addEventListener('click', updateFlagFromInput as EventListener);
        document.getElementById('flag-aspect-ratio-like-finland')?.addEventListener('click', updateFlagFromInput as EventListener);
        document.getElementById('flag-aspect-ratio-like-iceland')?.addEventListener('click', updateFlagFromInput as EventListener);

        document.getElementById('flag-cross-v-width')?.addEventListener('change', updateFlagFromInput as EventListener);
        document.getElementById('flag-cross-h-height')?.addEventListener('change', updateFlagFromInput as EventListener);
        document.getElementById('flag-innercross-v-width')?.addEventListener('change', updateFlagFromInput as EventListener);
        document.getElementById('flag-innercross-h-height')?.addEventListener('change', updateFlagFromInput as EventListener);
        document.getElementById('flag-cross-v-left')?.addEventListener('change', updateFlagFromInput as EventListener);
        document.getElementById('flag-cross-h-top')?.addEventListener('change', updateFlagFromInput as EventListener);
}

function useTemplate(e: PointerEvent) {
    const inputFlagTemplateName = (e.target as HTMLInputElement).value;
    const flagWidth = parseFloat((document.getElementById("flag-width") as HTMLInputElement)?.value || '420');

    const flagColour = flagColorBuilder
        .withTemplate(inputFlagTemplateName)
        .build();
    const flagSpec = flagSpecBuilder
        .withTemplateName(inputFlagTemplateName)
        .build();

    const flag = new Flag()
        .drawFromSpec(flagWidth, flagSpec)
        .colourize(flagColour)
        .paint();

    setKnobsBasedOnTemplate(flagColour, inputFlagTemplateName, flagSpec, flag);
}

function updateFlagFromInput(e: PointerEvent | null) {
    const isRatioButton = 
        (e?.target as HTMLInputElement)
        ?.attributes
        .getNamedItem('data-is-ratio-button')
        ?.value == 'true' ? true : false;

    const userInputs = getFormValues();

    const flagColour = flagColorBuilder
        .withUserInputs(userInputs)
        .build();
    const flagSpec = flagSpecBuilder
        .withUserInputs(userInputs)
        .build();

    new Flag()
        .drawFromSpec(userInputs.flagWidth, flagSpec)
        .colourize(flagColour)
        .paint();
}

function setKnobsBasedOnTemplate(flagColour: FlagColour, flagTemplateName: string, flagSpec: FlagSpec, flag: Flag) {
    (document.getElementById("flag-background-colour") as HTMLInputElement).value = flagColour.backgroundColour;
    (document.getElementById("flag-cross-colour") as HTMLInputElement).value = flagColour.crossColour;
    (document.getElementById("flag-innercross-colour") as HTMLInputElement).value = flagColour.innerCrossColour;

    setRadioButton('flag-ratio', flagTemplateName);
    
    (document.getElementById("flag-ratio-custom") as HTMLInputElement).value = flagSpec.aspectRatio.toString();
    (document.getElementById("flag-cross-v-width") as HTMLInputElement).value = flagSpec.verticalCrossProportion.toString();
    (document.getElementById("flag-cross-h-height") as HTMLInputElement).value = flagSpec.horizontalCrossProportion.toString();
    (document.getElementById("flag-cross-v-left") as HTMLInputElement).value = flagSpec.verticalCrossDistanceFromLeft.toString();
    (document.getElementById("flag-cross-h-top") as HTMLInputElement).value = flagSpec.horizontalCrossDistanceFromTop.toString();

    setRadioButton('flag-has-innercross', flagTemplateName == 'iceland' || flagTemplateName == 'norway' ? 'yes' : 'no');
    (document.getElementById("flag-innercross-v-width") as HTMLInputElement).value = flagSpec.verticalInnerCrossProportion.toString();
    (document.getElementById("flag-innercross-h-height") as HTMLInputElement).value = flagSpec.horizontalInnerCrossProportion.toString();

    (document.getElementById("flag-width-number") as HTMLInputElement).value = flag.width.toString();
    (document.getElementById("flag-height") as HTMLInputElement).value = flag.height.toString();
    (document.getElementById("flag-height-number") as HTMLInputElement).value = flag.height.toString();
}

function setImplicit(flag: Flag) {
    (document.getElementById("flag-width-number") as HTMLInputElement).value = flag.width.toString();
    (document.getElementById("flag-height") as HTMLInputElement).value = flag.height.toString();
    (document.getElementById("flag-height-number") as HTMLInputElement).value = flag.height.toString();
}

function setRadioButton(whichName: string, whichValue: string) {
    const radios = document.getElementsByName(whichName);
    for (let i = 0; i < radios.length; i++) {
        let radioInput = radios[i] as HTMLInputElement;

        if (radioInput.value == whichValue) {
            radioInput.checked = true;
        }
    }
}

function getFormValues(): InputForm {
    const inputs = document.querySelectorAll('input');
    let values: Record<string, string | number> = {};

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

    const formModel = new InputForm().mapFormValues(values);

    return formModel;
}