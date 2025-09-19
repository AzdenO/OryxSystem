/**
 * @module SystemInitialisation
 * @description Module to encapsulate all initialisation logic of all system services, tools, etc. The only
 * point where service/tool modules are imported, acting as point of dependency injection for better dependency
 * management
 * @version 0.1
 * @author DRAW
 */
///////////////////////////////////////////////////IMPORTS/////////////////////////////////////////////////
import ToolLoader from "./init_utils/ToolLoader/ToolLoader.mjs";
import CommandParser from "../root/System/CommandParser/CommandParser.mjs";
////////////////////////////////////////////////CONSTANTS//////////////////////////////////////////////////

let tooldata;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadTools(__dirname){
    tooldata = await ToolLoader.init(__dirname);
    if(!tooldata){
        throw new Error("Core service initialisation failed");
    }
    return tooldata;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadParser(syntaxData, console){
    return new CommandParser(syntaxData, console);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadSystemService(){

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function initialize(__dirname){
    try{
        const toolData = await loadTools(__dirname);
        const commandParser = await loadParser(toolData.ocf, toolData.core.Console);
        return{
            Core: toolData.core,
            Secondary: toolData.secondary,
            Parser: commandParser,
        }
    }catch(err){
        console.log(err.message);
        console.log("System init failure");
        console.log(err.stack);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
    initialize,
}
//await initialize();