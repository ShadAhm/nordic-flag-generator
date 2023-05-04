function updateFlag() {
    const {
        innerCrossColor,
        CrossColor,
        backgroundColor,
        flagTemplate,
        hasInnerCross
    } = getFlagSettings();

    updateFlagColours(innerCrossColor, CrossColor, backgroundColor, hasInnerCross);
    updateFlagDimensions(flagTemplate);
}

function getFlagSettings() {
    const innerCrossColor = document.getElementById("flag-innercross-color").value;
    const CrossColor = document.getElementById("flag-cross-color").value;
    const backgroundColor = document.getElementById("flag-background-color").value;
    const flagTemplate = getFromFlagTemplateRadioButton();
    const hasInnerCross = getFromHasInnerCrossRadioButton();

    return {
        innerCrossColor,
        CrossColor,
        backgroundColor,
        flagTemplate,
        hasInnerCross
    }
}

function getFromFlagTemplateRadioButton() {
    const flagRatio = document.getElementsByName("flag-ratio");
    for (let i = 0; i < flagRatio.length; i++) {
        if (flagRatio[i].checked) {
            return flagRatio[i].value;
        }
    }
}

function getFromHasInnerCrossRadioButton() {
    const hasInnerCross = document.getElementsByName("flag-has-inner-cross");
    for (let i = 0; i < hasInnerCross.length; i++) {
        if (hasInnerCross[i].checked) {
            return hasInnerCross[i].value == 'yes';
        }
    }
}

function updateFlagColours(innerCrossColor, CrossColor, backgroundColor, hasInnerCross) {
    const innerCrossHorizontal = document.getElementById("diag-flag-innercross-h");
    const innerCrossVertical = document.getElementById("diag-flag-innercross-v");
    const CrossHorizontal = document.getElementById("diag-flag-cross-h");
    const CrossVertical = document.getElementById("diag-flag-cross-v");
    const background = document.getElementById("diag-flag-background");

    innerCrossVertical.style.opacity = hasInnerCross ? 1 : 0;
    innerCrossHorizontal.style.opacity = hasInnerCross ? 1 : 0;

    innerCrossHorizontal.style.fill = innerCrossColor;
    innerCrossVertical.style.fill = innerCrossColor;
    CrossHorizontal.style.fill = CrossColor;
    CrossVertical.style.fill = CrossColor;
    background.style.fill = backgroundColor;
}

function updateFlagDimensions(flagTemplate) {
    const width = 450;
    const flagRatio = getFlagRatioFromTemplate(flagTemplate);
    const height = calculateFlagHeight(width, flagRatio);

    const innerCrossHorizontalHeight = calculateInnerCrossHorizontalHeight(height, flagTemplate);
    const innerCrossHorizontalPosY = calculateInnerCrossHorizontalPosY(height, innerCrossHorizontalHeight);
    const innerCrossVerticalWidth = calculateInnerCrossVerticalWidth(width, flagTemplate);
    const innerCrossVerticalPosX = (width - innerCrossVerticalWidth) / 2;

    const CrossHorizontalHeight = height * 0.14;
    const CrossHorizontalPosY = (height - CrossHorizontalHeight) / 5;
    const CrossVerticalWidth = width * 0.14;
    const CrossVerticalPosX = (width - CrossVerticalWidth) / 5;

    const flagDiagramSvg = document.getElementById("diag-flag");
    flagDiagramSvg.setAttribute("width", width);
    flagDiagramSvg.setAttribute("height", height);
    flagDiagramSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const flagBackground = document.getElementById("diag-flag-background");
    flagBackground.setAttribute("width", width);
    flagBackground.setAttribute("height", height);

    const innerCrossHorizontal = document.getElementById("diag-flag-innercross-h");
    innerCrossHorizontal.setAttribute("width", width);
    innerCrossHorizontal.setAttribute("height", innerCrossHorizontalHeight);
    innerCrossHorizontal.setAttribute("y", innerCrossHorizontalPosY);

    const innerCrossVertical = document.getElementById("diag-flag-innercross-v");
    innerCrossVertical.setAttribute("height", height);
    innerCrossVertical.setAttribute("width", innerCrossVerticalWidth);
    innerCrossVertical.setAttribute("x", innerCrossVerticalPosX);

    const CrossHorizontal = document.getElementById("diag-flag-cross-h");
    CrossHorizontal.setAttribute("width", width);
    CrossHorizontal.setAttribute("height", CrossHorizontalHeight);
    CrossHorizontal.setAttribute("y", CrossHorizontalPosY);

    const CrossVertical = document.getElementById("diag-flag-cross-v");
    CrossVertical.setAttribute("height", height);
    CrossVertical.setAttribute("width", CrossVerticalWidth);
    CrossVertical.setAttribute("x", CrossVerticalPosX);
}

function calculateFlagHeight(width, aspectRatio) {
    return width / aspectRatio;
}

function getFlagRatioFromTemplate(flagTemplate) {
    switch (flagTemplate) {
        case 'sweden':
            return 1.6;
        case 'norway':
            return 1.375;
        case 'denmark':
            return 1.321;
        case 'finland':
            return 1.636;
        case 'iceland':
            return 1.389;
        default:
            return 1.6;
    }
}

function calculateInnerCrossHorizontalHeight(flagHeight, flagTemplate) {   
    let proportion = 0.2;
    
    switch (flagTemplate) {
        case 'sweden': 
            proportion = 0.2;
            break;
        case 'norway':
            proportion = 1; // todo
            break;
        case 'denmark':
            proportion = 0.1116; // todo
            break;
        case 'finland':
            proportion = 0.2727;
            break;
        case 'iceland':
            proportion = 1; // todo
            break;
    }

    return flagHeight * proportion;
}

function calculateInnerCrossVerticalWidth(flagWidth, flagTemplate) {
    let proportion = 0.125;
    
    switch (flagTemplate) {
        case 'sweden': 
            proportion = 0.125;
            break;
        case 'norway':
            proportion = 1; // todo
            break;
        case 'denmark':
            proportion = 0.1429; // todo
            break;
        case 'finland':
            proportion = 0.1667;
            break;
        case 'iceland':
            proportion = 1; // todo
            break;
    }

    return flagWidth * proportion;
}

function calculateInnerCrossHorizontalPosY(flagHeight, innerCrossHorizontalHeight) {
    return (flagHeight - innerCrossHorizontalHeight) / 2;
}