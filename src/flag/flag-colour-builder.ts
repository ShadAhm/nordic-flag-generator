import { FlagColour } from './flag-colour.ts';
import { InputFormModel } from '../form/input-form-model.ts';

export class FlagColourBuilder {
    private backgroundColour: string = '';
    private crossColour: string = '';
    private innerCrossColour: string = '';

    constructor() {
    }

    withTemplate(templateName: string): FlagColourBuilder {
        switch (templateName) {
            case 'norway':
                {
                    this.backgroundColour = '#ba0c2f';
                    this.crossColour = '#ffffff';
                    this.innerCrossColour = '#00205b';
                    break;
                }
            case 'denmark':
                {
                    this.backgroundColour = '#bf0028';
                    this.crossColour = '#ffffff';
                    this.innerCrossColour = '#ffffff';
                    break;
                }
            case 'finland':
                {
                    this.backgroundColour = '#ffffff';
                    this.crossColour = '#0d2c6e';
                    this.innerCrossColour = '#0d2c6e';
                    break;
                }
            case 'iceland':
                {
                    this.backgroundColour = '#1b52a0';
                    this.crossColour = '#ffffff';
                    this.innerCrossColour = '#d31931';
                    break;
                }
            case 'sweden':
            default:
                {
                    this.backgroundColour = '#236bab';
                    this.crossColour = '#f9cd00';
                    this.innerCrossColour = '#f9cd00';
                    break;
                }
        }

        return this;
    }

    withUserInputs(userInputs: InputFormModel): FlagColourBuilder {
        this.backgroundColour = userInputs.flagBackgroundColour;
        this.crossColour = userInputs.flagCrossColour;
        this.innerCrossColour = userInputs.flagInnerCrossColour;

        return this;
    }

    build(): FlagColour {
        return new FlagColour(this.backgroundColour, this.crossColour, this.innerCrossColour);
    }
}
