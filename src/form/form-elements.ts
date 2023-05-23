export class FormElements {
    // Template buttons
    static readonly btn_useTemplateSweden = document.getElementById('flag-template-sweden') as HTMLButtonElement;
    static readonly btn_useTemplateDenmark = document.getElementById('flag-template-denmark') as HTMLButtonElement;
    static readonly btn_useTemplateNorway = document.getElementById('flag-template-norway') as HTMLButtonElement;
    static readonly btn_useTemplateFinland = document.getElementById('flag-template-finland') as HTMLButtonElement;
    static readonly btn_useTemplateIceland = document.getElementById('flag-template-iceland') as HTMLButtonElement;

    // Widht and height inputs
    static readonly input_flagWidth = document.getElementById('flag-width') as HTMLInputElement;
    static readonly input_flagWidthNumber = document.getElementById('flag-width-number') as HTMLInputElement;
    static readonly span_flagHeight = document.getElementById('flag-height-number-label') as HTMLSpanElement;	

    // Flag ratio
    static readonly input_flagRatioCustom = document.getElementById('flag-ratio-custom') as HTMLInputElement;
    static readonly input_flagRatioCustomNumber = document.getElementById('flag-ratio-custom-number') as HTMLInputElement;
    static readonly radio_flagAspectRatioLikeSweden = document.getElementById('flag-aspect-ratio-like-sweden') as HTMLInputElement;
    static readonly radio_flagAspectRatioLikeDenmark = document.getElementById('flag-aspect-ratio-like-denmark') as HTMLInputElement;
    static readonly radio_flagAspectRatioLikeNorway = document.getElementById('flag-aspect-ratio-like-norway') as HTMLInputElement;
    static readonly radio_flagAspectRatioLikeFinland = document.getElementById('flag-aspect-ratio-like-finland') as HTMLInputElement;
    static readonly radio_flagAspectRatioLikeIceland = document.getElementById('flag-aspect-ratio-like-iceland') as HTMLInputElement;

    // Flag colours
    static readonly input_flagBackgroundColour = document.getElementById('flag-background-colour') as HTMLInputElement;
    static readonly input_flagCrossColour = document.getElementById('flag-cross-colour') as HTMLInputElement;
    static readonly input_flagInnerCrossColour = document.getElementById('flag-innercross-colour') as HTMLInputElement;
    
    // Flag cross settings
    static readonly input_flagCrossHorizontalHeight = document.getElementById('flag-cross-h-height') as HTMLInputElement;
    static readonly input_flagCrossHorizontalHeightNumber = document.getElementById('flag-cross-h-height-number') as HTMLInputElement;
    static readonly input_flagCrossVerticalWidth = document.getElementById('flag-cross-v-width') as HTMLInputElement;
    static readonly input_flagCrossVerticalWidthNumber = document.getElementById('flag-cross-v-width-number') as HTMLInputElement;
    static readonly input_flagCrossHorizontalOffset = document.getElementById('flag-cross-h-top') as HTMLInputElement;
    static readonly input_flagCrossHorizontalOffsetNumber = document.getElementById('flag-cross-h-top-number') as HTMLInputElement;
    static readonly input_flagCrossVerticalOffset = document.getElementById('flag-cross-v-left') as HTMLInputElement;
    static readonly input_flagCrossVerticalOffsetNumber = document.getElementById('flag-cross-v-left-number') as HTMLInputElement;

    // Flag innercross settings
    static readonly input_flagHasInnerCrossYes = document.getElementById('flag-has-innercross-yes') as HTMLInputElement;
    static readonly input_flagHasInnerCrossNo = document.getElementById('flag-has-innercross-no') as HTMLInputElement;
    static readonly input_flagInnerCrossHorizontalHeight = document.getElementById('flag-innercross-h-height') as HTMLInputElement;
    static readonly input_flagInnerCrossHorizontalHeightNumber = document.getElementById('flag-innercross-h-height-number') as HTMLInputElement;
    static readonly input_flagInnerCrossVerticalWidth = document.getElementById('flag-innercross-v-width') as HTMLInputElement;
    static readonly input_flagInnerCrossVerticalWidthNumber = document.getElementById('flag-innercross-v-width-number') as HTMLInputElement;

}