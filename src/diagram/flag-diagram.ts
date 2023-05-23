import { Flag } from "../flag/flag";
import { DiagramElements } from "./diagram-elements";

export class FlagDiagram {
    static paint(flag: Flag): void {
        const flagDiagramSvg = DiagramElements.diagram_flagDiagramSvg;
        const crossHorizontal = DiagramElements.diagram_crossHorizontal;
        const crossVertical = DiagramElements.diagram_crossVertical;
        const innerCrossHorizontal = DiagramElements.diagram_innerCrossHorizontal;
        const innerCrossVertical =  DiagramElements.diagram_innerCrossVertical;
        const background =  DiagramElements.diagram_background;

        if (crossHorizontal == null || crossVertical == null || innerCrossHorizontal == null || innerCrossVertical == null || background == null || flagDiagramSvg == null) {
            throw new Error("Could not find one of the SVG elements");
        }

        crossHorizontal.style.fill = flag.crossColour;
        crossVertical.style.fill = flag.crossColour;
        background.style.fill = flag.backgroundColour;

        flagDiagramSvg.setAttribute("width", flag.width.toString());
        flagDiagramSvg.setAttribute("height", flag.height.toString());
        flagDiagramSvg.setAttribute("viewBox", `0 0 ${flag.width} ${flag.height}`);
        background.setAttribute("width", flag.width.toString());
        background.setAttribute("height", flag.height.toString());

        crossHorizontal.setAttribute("height", flag.crossHorizontalHeight.toString());
        crossHorizontal.setAttribute("width", flag.width.toString());
        crossHorizontal.setAttribute("y", flag.crossHorizontalPosY.toString());

        crossVertical.setAttribute("width", flag.crossVerticalWidth.toString());
        crossVertical.setAttribute("height", flag.height.toString());
        crossVertical.setAttribute("x", flag.crossVerticalPosX.toString());

        if (!flag.hasInnerCross) {
            innerCrossHorizontal.setAttribute("display", "none");
            innerCrossVertical.setAttribute("display", "none");
        }
        else {
            innerCrossHorizontal.setAttribute("display", "inline");
            innerCrossVertical.setAttribute("display", "inline");

            innerCrossHorizontal.style.fill = flag.innerCrossColour;
            innerCrossVertical.style.fill = flag.innerCrossColour;

            innerCrossHorizontal.setAttribute("height", flag.innerCrossHorizontalHeight.toString());
            innerCrossHorizontal.setAttribute("width", flag.width.toString());
            innerCrossHorizontal.setAttribute("y", flag.innerCrossHorizontalPosY.toString());

            innerCrossVertical.setAttribute("width", flag.innerCrossVerticalWidth.toString());
            innerCrossVertical.setAttribute("height", flag.height.toString());
            innerCrossVertical.setAttribute("x", flag.innerCrossVerticalPosX.toString());
        }
    }
}