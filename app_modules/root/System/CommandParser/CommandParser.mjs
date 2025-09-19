/**
 * @module CommandParser
 * @description Module to encapsulate parsing logic of commands
 * @version 0.1
 * @author DRAW
 */
//import ParserTree from "./Utilities/ParserTree.json" with {type: "json"};
import ParserGenerator from "./Utilities/ParserGenerator.mjs";

//////////////////////////////////////////////////////////////////////////////////////////////////
export default class CommandParser {

    //////////////////////////////////////////////////////////////////////////////////////////////
    constructor(syntaxdata, console){
        if(true/*ParserTree===null*/){
            [this.tree, this.lookup] = ParserGenerator(syntaxdata);
            this.console = console;
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    parseCommand(command_string){
        let taskData = {
            service: null,
            command: null
        }
        const tokens = command_string.split(" ");
        let verifiedService = false;
        for(const child of this.tree.children){//service identification
            if(child.value === tokens[0]){
                taskData.service = child.value;
                tokens.shift();
                taskData.command = tokens;
                this.searchChildren(child, tokens, true);
                break
            }
        }
        if(!verifiedService){
            throw new Error(`Commanding parsing failed, no service called ${tokens[0]}`);
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    searchChildren(node, stack, recur=true){
        for(const child of node.children){
            switch(child.type){
                case "OpCode":
                    if(this.validateArgument(stack[0], child)){
                        stack.shift();
                        if(!stack.length===0){
                            this.searchChildren(child, stack, true);
                            return true;
                        }else{
                            return true;
                        }
                    }
                    break;
                case "Argument":
                    if(this.validateOperation(stack[0],child.getValue())){
                        stack.shift();
                        if(!stack.length===0){
                            this.searchChildren(child, stack, true);
                            return true;
                        }else{
                            return true;
                        }
                    }
                    break;
                default:
                    throw new Error("Unknown node type");
            }
        }
        throw new Error(`Service does not process provided keyword(s)`);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    validateOperation(input, equalTo){
        if(input===equalTo){
            return true;
        }else{
            return false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    validateArgument(input, node){

    }
    ///////////////////////////////////////////////////////////////////////////////////////////
}