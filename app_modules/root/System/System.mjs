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
     * @param systemInitMod
     * @param Security
     */
    constructor(systemInitMod, Security, Parser) {

        this.systemInitMod = systemInitMod;
        this.security = Security;
        this.parser = Parser;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    async initiateSystem(){

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * @function processor
     * @description Centralised object function for processing command strings received by the IPC
     * @param {String} command_string
     */
    async processor(command_string){

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////
}