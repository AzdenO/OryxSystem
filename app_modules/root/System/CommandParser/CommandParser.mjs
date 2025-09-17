/**
 * @module CommandParser
 * @description Module to encapsulate parsing logic of commands recieved via IPC
 * @version 0.1
 * @author DRAW
 */
//import ParserTree from "./Utilities/ParserTree.json" with {type: "json"};
import ParserGenerator from "./Utilities/ParserGenerator.mjs";
//////////////////////////////////////////////////////////////////////////////////////////////////
export default class CommandParser {

    //////////////////////////////////////////////////////////////////////////////////////////////
    constructor(syntaxdata){
        if(true/*ParserTree===null*/){
            const syntaxTree = ParserGenerator(syntaxdata);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
}