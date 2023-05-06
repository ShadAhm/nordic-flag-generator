import { FlagColour } from './flag-colour.js';

export class FlagColourBuilder {
    backgroundColour;
    crossColour;
    innerCrossColour;

    constructor() {
    }

    withTemplate(templateName) {
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

    withUserInputs(userInputs) {
        this.backgroundColour = userInputs['flag-background-colour'];
        this.crossColour = userInputs['flag-cross-colour'];
        this.innerCrossColour = userInputs['flag-innercross-colour'];

        return this;
    }

    build() {
        return new FlagColour(this.backgroundColour, this.crossColour, this.innerCrossColour);
    }
}