import { FlagColour } from './flag-colour.ts';
import { InputFormModel } from '../form/input-form-model.ts';

export class FlagColourBuilder {
    private backgroundColour: string = '';
    private crossColour: string = '';
    private innerCrossColour: string = '';

    namedColours: Record<string, string> = {
        'norwegian-red': '#ba0c2f',
        'norwegian-blue': '#00205b',
        'norwegian-white': '#ffffff',
        'danish-red': '#bf0028',
        'danish-white': '#ffffff',
        'finnish-blue': '#0d2c6e',
        'finnish-white': '#ffffff',
        'icelandic-blue': '#1b52a0',
        'icelandic-red': '#d31931',
        'icelandic-white': '#ffffff',
        'swedish-blue': '#236bab',
        'swedish-yellow': '#f9cd00',
    };

    constructor() {
    }

    withTemplate(templateName: string): FlagColourBuilder {
        switch (templateName) {
            case 'norway':
                {
                    this.backgroundColour = this.namedColours['norwegian-red'];
                    this.crossColour = this.namedColours['norwegian-white'];
                    this.innerCrossColour = this.namedColours['norwegian-blue'];
                    break;
                }
            case 'denmark':
                {
                    this.backgroundColour = this.namedColours['danish-red'];
                    this.crossColour = this.namedColours['danish-white'];
                    break;
                }
            case 'finland':
                {
                    this.backgroundColour = this.namedColours['finnish-white'];
                    this.crossColour = this.namedColours['finnish-blue'];
                    break;
                }
            case 'iceland':
                {
                    this.backgroundColour = this.namedColours['icelandic-blue'];
                    this.crossColour = this.namedColours['icelandic-white'];
                    this.innerCrossColour = this.namedColours['icelandic-red'];
                    break;
                }
            case 'sweden':
            default:
                {
                    this.backgroundColour = this.namedColours['swedish-blue'];
                    this.crossColour = this.namedColours['swedish-yellow'];
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
