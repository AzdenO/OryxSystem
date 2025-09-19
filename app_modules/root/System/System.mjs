/**
 * @class System
 * @description A class to encapsulate all back-end services, logic, etc.
 * @version 0.1
 * @author DRAW
 */
///////////////////////////////////////////////////////////////////////////////////////////////////////
export default class System {

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * @constructor Constructor for system object, requiring the system initialisation module and security
     * module. Security is initialised upon application startup, and so is not included in SystemInitMod
     * @param secondary
     * @param core
     * @param Parser
     */
    constructor(core, secondary, Parser) {

        this.core = core;
        this.secondary = secondary;
        this.parser = Parser;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * @function processor
     * @description Centralised object function for processing command strings received by the IPC
     * @param {String} command_string
     * @param {any} args Any arguments the command would require
     */
    async processor(command_string, args){
        const taskData = this.parser.parseCommand(command_string, args)
        const res = taskData.service;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    offload(taskData){
        switch(service){
            case "Security":
                this.core.Security.handle(taskData)
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
}