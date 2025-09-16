/**
 * @class CommsHandler
 * @description Primary source of communication between the back end and front-end
 * @version 0.1
 * @author DRAW
 */
//////////////////////////////////////////////////////////////////////////////////////////
export default class CommsHandler {

    //////////////////////////////////////////////////////////////////////////////////////
    /**
     * @constructor
     * @description constructor for comms handler. Utilises electrons inter-process communication
     *
     * @param {IPCMain} ipc The inter process communicator instance
     * @param {System} system An object encapsulating all services in the backend
     */
    constructor(ipc, system) {
        this.ipc = ipc;
        this.system = system;
    }
    //////////////////////////////////////////////////////////////////////////////////////
}