import { Flag } from "../flag/flag";
import { FlagColour } from "../flag/flag-colour";
import { FlagRatio } from "../flag/flag-ratio";
import { FlagSpec } from "../flag/flag-spec";
import { FormElements } from "./form-elements";
import { InputFormModel } from "./input-form-model";

export class FlagForm {
    static setValues(flagColour: FlagColour, flagSpec: FlagSpec, flag: Flag): void {
        FormElements.input_flagBackgroundColour.value = flagColour.backgroundColour;
        FormElements.input_flagCrossColour.value = flagColour.crossColour;
        FormElements.input_flagInnerCrossColour.value = flagColour.innerCrossColour;

        FlagForm.setRadioButton('flag-aspect-ratio', FlagRatio.getRatioName(flagSpec.aspectRatio));

        FormElements.input_flagRatioCustom.value = flagSpec.aspectRatio.toString();
        FormElements.input_flagRatioCustomNumber.value = flagSpec.aspectRatio.toString();

        FormElements.input_flagCrossVerticalWidth.value = flagSpec.verticalCrossProportion.toString();
        FormElements.input_flagCrossVerticalWidthNumber.value = flagSpec.verticalCrossProportion.toString();

        FormElements.input_flagCrossHorizontalHeight.value = flagSpec.horizontalCrossProportion.toString();
        FormElements.input_flagCrossHorizontalHeightNumber.value = flagSpec.horizontalCrossProportion.toString();

        FormElements.input_flagCrossVerticalOffset.value = flagSpec.verticalCrossDistanceFromLeft.toString();
        FormElements.input_flagCrossVerticalOffsetNumber.value = flagSpec.verticalCrossDistanceFromLeft.toString();

        FormElements.input_flagCrossHorizontalOffset.value = flagSpec.horizontalCrossDistanceFromTop.toString();
        FormElements.input_flagCrossHorizontalOffsetNumber.value = flagSpec.horizontalCrossDistanceFromTop.toString();

        FlagForm.setRadioButton('flag-has-innercross', flag.hasInnerCross ? 'yes' : 'no');

        if (flag.hasInnerCross) {
            FormElements.input_flagInnerCrossColour.disabled = false;
            FormElements.input_flagInnerCrossVerticalWidth.disabled = false;
            FormElements.input_flagInnerCrossVerticalWidthNumber.disabled = false;
            FormElements.input_flagInnerCrossHorizontalHeight.disabled = false;
            FormElements.input_flagInnerCrossHorizontalHeightNumber.disabled = false;
            FormElements.input_flagInnerCrossVerticalWidth.value = flagSpec.verticalInnerCrossProportion.toString();
            FormElements.input_flagInnerCrossVerticalWidthNumber.value = flagSpec.verticalInnerCrossProportion.toString();
            FormElements.input_flagInnerCrossHorizontalHeight.value = flagSpec.horizontalInnerCrossProportion.toString();
            FormElements.input_flagInnerCrossHorizontalHeightNumber.value = flagSpec.horizontalInnerCrossProportion.toString();
        }
        else {
            FormElements.input_flagInnerCrossColour.disabled = true;
            FormElements.input_flagInnerCrossVerticalWidth.disabled = true;
            FormElements.input_flagInnerCrossVerticalWidthNumber.disabled = true;
            FormElements.input_flagInnerCrossHorizontalHeight.disabled = true;
            FormElements.input_flagInnerCrossHorizontalHeightNumber.disabled = true;
        }

        FormElements.input_flagWidth.value = flag.width.toString();
        FormElements.input_flagWidthNumber.value = flag.width.toString();

        FormElements.span_flagHeight.innerText = flag.height.toString();
    }


    static setRadioButton(whichName: string, whichValue: string): void {
        const radios = document.getElementsByName(whichName);
        for (let i = 0; i < radios.length; i++) {
            let radioInput = radios[i] as HTMLInputElement;

            if (radioInput.value == whichValue) {
                radioInput.checked = true;
            }
        }
    }

    static getValues(): InputFormModel {
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

        const formModel = new InputFormModel().mapFormValues(values);

        return formModel;
    }
}