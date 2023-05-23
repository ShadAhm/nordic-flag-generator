export class InputFormModel {
    flagBackgroundColour: string = '';
    flagCrossColour: string = '';
    flagCrossHHeight: number = 0;
    flagCrossHTop: number = 0;
    flagCrossVLeft: number = 0;
    flagCrossVWidth: number = 0;
    flagInnerCrossColour: string = '';
    flagInnerCrossHHeight: number = 0;
    flagInnerCrossVWidth: number = 0;
    flagRatioCustom: number = 0;
    flagWidth: number = 0;
    flagHasInnerCross: boolean = false;
  
    mapFormValues(formValues: Record<string, string | number>): InputFormModel {
      this.flagBackgroundColour = formValues['flag-background-colour'] as string;
      this.flagCrossColour = formValues['flag-cross-colour'] as string;
      this.flagCrossHHeight = Number(formValues['flag-cross-h-height']);
      this.flagCrossHTop = Number(formValues['flag-cross-h-top']);
      this.flagCrossVLeft = Number(formValues['flag-cross-v-left']);
      this.flagCrossVWidth = Number(formValues['flag-cross-v-width']);
      this.flagInnerCrossColour = formValues['flag-innercross-colour'] as string;
      this.flagInnerCrossHHeight = Number(formValues['flag-innercross-h-height']);
      this.flagInnerCrossVWidth = Number(formValues['flag-innercross-v-width']);
      this.flagRatioCustom = Number(formValues['flag-ratio-custom']);
      this.flagWidth = Number(formValues['flag-width']);
      this.flagHasInnerCross = formValues['flag-has-innercross-yes'] as string == 'yes';

      console.log('user inputs', this);

      return this;
    }
  }