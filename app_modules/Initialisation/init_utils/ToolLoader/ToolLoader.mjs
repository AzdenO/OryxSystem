/**
 * @module ToolLoader
 * @description Module that encapsulates module loading logic. "services/tools" act as application plugins
 * located at ./app_modules/root/services, with each segregated to its own directory containing module code files,
 * .ocf file, and any other resources necessary for service function
 */
import fs from "node:fs";
import path from "path";
import {pathToFileURL} from "url";
import ClassValidator from "./ToolValidation/ClassValidator.mjs";
import Config from "./LoaderConfig.json" with {type: "json"};
import {CoreLoadError} from "../InitErrors.mjs";
////////////////////////////////////////////////////////////////////////////////////////////////
const toolsdir = "../../../root/services";
let tools = {};
let ocfs ={};
let parentRefs;
let core = {};
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function readTools
 * @description Find all tool directories in the services directory
 * @returns String[] A list of directory names, correlating to the name of the tool
 */
function readDirectories(dir){

    return fs.readdirSync(dir).filter(
        file => {
            return fs.statSync(path.join(dir, file)).isDirectory();
        }
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////
function readJSON(path){
    const raw = fs.readFileSync(path, "utf8");
    return JSON.parse(raw);
}
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @function loadModule
 * @description Function which will load the default export from a module at the specified path
 * @param {String} path The path to the tools main javascript file
 * @param {String} name The name of the tool, derived from tool directory name
 * @returns {Promise<Class>} The imported class reference
 */
async function loadModule(path, name){

    const module = await import(pathToFileURL(path).href);
    return module.default;
}
////////////////////////////////////////////////////////////////////////////////////////////////
async function getOcf(path, serviceName){
    await fs.readFile(pathToFileURL(path), "utf8", (err, data) => {
        if(err){
            throw new Error(`Error loading OCF for tool: ${serviceName}`);
        }else{
            ocfs[serviceName] = data;
        }
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////
async function loadCore(){
    const coreDir = Config.ToolDirectories.ToolsDirectory+Config.ToolDirectories.Core;
    let current;

    try{

        for(const service of Config.CoreLoadOrder){
            current = service;
            const pathtomain = path.join(coreDir, service, `${service}Main.mjs`);
            const pathtoocf = path.join(coreDir, service, `${service}.ocf`);
            const pathtoconfig = path.join(coreDir, service, `${service}Config.json`);
            await getOcf(pathtoocf, service);
            const config = readJSON(pathtoconfig);
            const CoreService = await loadModule(pathtomain, service);

            if(config.CoreRequirements.length===0){
                core[service] = new CoreService();
            }else{
                let args = [];
                for(const requirement of config.CoreRequirements){
                    args.push(core[requirement]);
                }
                core[service] = new CoreService(args);
            }
            core[service].init();
        }

    }catch (e) {
        console.log(e.message);
        throw new CoreLoadError(current);
    }

}
////////////////////////////////////////////////////////////////////////////////////////////////
async function loadSecondaries(){
    const secondaryDir = Config.ToolDirectories.ToolsDirectory+Config.ToolDirectories.Secondary;
    const tooldirs = readDirectories(secondaryDir);

    if(tooldirs.length===0){
        return;
    }

    let successful = 0;
    let total = 0;

    for(const dir of tooldirs){
        const pathtomain = path.join(secondaryDir, dir, `${dir}Main.js`);
        const pathtoocf = path.join(secondaryDir, dir, `${dir}.ocf`);

        try{
            await getOcf(pathtoocf, dir);
            const Service = await loadModule(pathtomain, dir);
            const instance = new Service(core.Library);
            if(!ClassValidator.validateParent(parentRefs.TOOLABSTRACT, instance)){
                throw new Error(`Tool: ${keystring} does not comply with inheritance policy`);
            }
            instance.init();
            successful++;
            total++;
        }catch(e){
            total++;
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
async function init(){
    parentRefs = ClassValidator.getClassReferences();
    try{
        await loadCore();
        await loadSecondaries();
        core["Console"].Library = core["Library"];
        core["Library"].Security = core["Security"];
        return {
            ocf: ocfs,
            core: core,
            secondary: tools
        }

    }catch(e){
        return false;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
 export default {
    init,
}
await init();