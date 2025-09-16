/**
 * @enum ClassReferences
 * @description Enumerator encapsulating a number of commonly inherited classes. Used to validate certain
 * modules/classes etc. comply with certain standardisation requirements, such as the composition of tool
 * classes
 * @version 0.1
 * @author DRAW
 */
import Tool from "../../../../root/services/ToolAbstract.mjs";
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const ClassReferences = {
    TOOLABSTRACT: Tool,
}