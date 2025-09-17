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
import SystemService from "../root/System/SystemService/SystemService.mjs";
////////////////////////////////////////////////CONSTANTS//////////////////////////////////////////////////

let tooldata;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadTools(){
    tooldata = await ToolLoader.init();
    if(!tooldata){
        throw new Error("Core service initialisation failed");
    }
    return tooldata;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadParser(syntaxData){
    const processor = new CommandParser(syntaxData);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function loadSystemService(){

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
async function initialize(){
    try{
        const data = await loadTools();
        await loadParser(data.ocf);
        await loadSystemService();
    }catch(err){
        console.log(err.message);
        console.log(err.stack);
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
    initialize,
}
await initialize();