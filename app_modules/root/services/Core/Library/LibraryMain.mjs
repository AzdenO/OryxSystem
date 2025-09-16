/**
 * @class Library
 * @description A pseudo-dependency manager that tools/services
 * can request certain libraries/dependencies from such as fs,
 * crypto, etc.
 * @version 0.1
 * @author DRAW
 */
import fs from "node:fs";
import crypto from "crypto";
import {LibraryReqCodes} from "./ReqCodeEnum.mjs";
import Argon from "argon2"
import * as Process from "child_process";
import Log from "../../../SystemUtils/Types/Log.mjs"
import * as child_process from "node:child_process";
/////////////////////////////////////////////////////////////////
export default class Library {

    /////////////////////////////////////////////////////////////
    constructor(args) {
        this.Console = args[0];
    }
    /////////////////////////////////////////////////////////////
    get(req_code){

        switch(req_code){
            case LibraryReqCodes.FS:
                return fs;
            case LibraryReqCodes.REQCODES:
                return LibraryReqCodes;
            case LibraryReqCodes.CONSOLE:
                return this.Console;
            case LibraryReqCodes.ENCRYPTION:
                return crypto;
            case LibraryReqCodes.HASHER:
                return Argon;
            case LibraryReqCodes.PROCESS:
                return Process;
        }

    }
    ////////////////////////////////////////////////////////////
    request(codes){

        let requested = {};
        try{
            for(const code of codes){
                requested[code] = this.get(code);
            }
        }catch(err){

        }
        return requested;
    }
    ///////////////////////////////////////////////////////////
    init(){

    }
}