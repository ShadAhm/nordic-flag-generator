import { FlagColour } from './flag-colour.js';

export class FlagColourBuilder {
    backgroundColour;
    crossColour;
    innerCrossColour;

    constructor() {
    }

    withColours(backgroundColour, crossColour, innerCrossColour) {
        this.backgroundColour = backgroundColour;
        this.crossColour = crossColour;
        this.innerCrossColour = innerCrossColour;

        return this;
    }

    withTemplate(templateName) {
        switch (templateName) {
            case 'norway':
                {
                    this.backgroundColour = 'green';
                    this.crossColour = 'orange';
                    this.innerCrossColour = 'black';
                    break;
                }
            case 'denmark':
                {
                    this.backgroundColour = 'red';
                    this.crossColour = 'white';
                    this.innerCrossColour = 'white';
                    break;
                }
            case 'finland':
                {
                    this.backgroundColour = 'white';
                    this.crossColour = 'blue';
                    this.innerCrossColour = 'blue';
                    break;
                }
            case 'iceland':
                {
                    this.backgroundColour = 'blue';
                    this.crossColour = 'red';
                    this.innerCrossColour = 'pink';
                    break;
                }
            case 'sweden':
            default:
                {
                    this.backgroundColour = 'blue';
                    this.crossColour = 'yellow';
                    this.innerCrossColour = 'yellow';
                    break;
                }
        }

        return this;
    }

    build() {
        return new FlagColour(this.backgroundColour, this.crossColour, this.innerCrossColour);
    }
}