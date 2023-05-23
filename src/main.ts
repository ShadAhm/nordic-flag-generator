import { FlagSpecBuilder } from "./flag/flag-spec-builder.ts";
import { FlagColourBuilder } from "./flag/flag-colour-builder.ts";
import { Flag } from "./flag/flag.ts";
import { FormElements } from "./form/form-elements.ts";
import { FlagDiagram } from "./diagram/flag-diagram.ts";
import { FlagForm } from "./form/flag-form.ts";

attachEventListeners();
const flagColorBuilder = new FlagColourBuilder();
const flagSpecBuilder = new FlagSpecBuilder();

updateFlagFromInput();

function attachEventListeners(): void {
    FormElements.btn_useTemplateSweden?.addEventListener('click', useTemplate as EventListener);
    FormElements.btn_useTemplateDenmark?.addEventListener('click', useTemplate as EventListener);
    FormElements.btn_useTemplateNorway?.addEventListener('click', useTemplate as EventListener);
    FormElements.btn_useTemplateFinland?.addEventListener('click', useTemplate as EventListener);
    FormElements.btn_useTemplateIceland?.addEventListener('click', useTemplate as EventListener);

    FormElements.input_flagWidth?.addEventListener('change', updateFlagFromInput as EventListener);

    FormElements.input_flagBackgroundColour?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagCrossColour?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagInnerCrossColour?.addEventListener('change', updateFlagFromInput as EventListener);

    FormElements.input_flagHasInnerCrossYes?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagHasInnerCrossNo?.addEventListener('change', updateFlagFromInput as EventListener);

    FormElements.input_flagRatioCustom?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.radio_flagAspectRatioLikeSweden?.addEventListener('click', updateFlagRatioFromButton as EventListener);
    FormElements.radio_flagAspectRatioLikeDenmark?.addEventListener('click', updateFlagRatioFromButton as EventListener);
    FormElements.radio_flagAspectRatioLikeNorway?.addEventListener('click', updateFlagRatioFromButton as EventListener);
    FormElements.radio_flagAspectRatioLikeFinland?.addEventListener('click', updateFlagRatioFromButton as EventListener);
    FormElements.radio_flagAspectRatioLikeIceland?.addEventListener('click', updateFlagRatioFromButton as EventListener);

    FormElements.input_flagCrossHorizontalHeight?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagCrossVerticalWidth?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagInnerCrossHorizontalHeight?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagInnerCrossVerticalWidth?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagCrossHorizontalOffset?.addEventListener('change', updateFlagFromInput as EventListener);
    FormElements.input_flagCrossVerticalOffset?.addEventListener('change', updateFlagFromInput as EventListener);
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
        .colourize(flagColour);

    FlagDiagram.paint(flag);

    FlagForm.setValues(flagColour, flagSpec, flag);
}

function updateFlagRatioFromButton(e: PointerEvent) {
    const ratioTemplateName = (e.target as HTMLInputElement).value;

    const userInputs = FlagForm.getValues();

    const flagColour = flagColorBuilder
        .withUserInputs(userInputs)
        .build();

    let flagSpec = flagSpecBuilder
        .withUserInputs(userInputs)
        .withRatioTemplate(ratioTemplateName)
        .build();

    (document.getElementById("flag-ratio-custom") as HTMLInputElement).value = flagSpec.aspectRatio.toString();
    (document.getElementById("flag-ratio-custom-number") as HTMLInputElement).value = flagSpec.aspectRatio.toString();

    const flag = new Flag()
        .drawFromSpec(userInputs.flagWidth, flagSpec)
        .colourize(flagColour);

    FlagDiagram.paint(flag);

    FlagForm.setValues(flagColour, flagSpec, flag);
}

function updateFlagFromInput() {
    const userInputs = FlagForm.getValues();

    const flagColour = flagColorBuilder
        .withUserInputs(userInputs)
        .build();

    let flagSpec = flagSpecBuilder
        .withUserInputs(userInputs)
        .build();

    const flag = new Flag()
        .drawFromSpec(userInputs.flagWidth, flagSpec)
        .colourize(flagColour);

    FlagDiagram.paint(flag);

    FlagForm.setValues(flagColour, flagSpec, flag);
}