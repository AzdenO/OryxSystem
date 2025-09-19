/**
 * @module ParserGenerator
 * @description Module exporting a single function to generate the syntax tree for the entire application, for the command
 * parser class to utilise
 * @version 0.1
 * @author DRAW
 *
 */
let syntax = null;

let tree = null;
let lookup = {};

//import ParserTree from "../../../SystemUtils/Types/ParserTree/ParserTree.mjs";
import TreeNode from "../../../SystemUtils/Types/ParserTree/Node.mjs";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Default export function which generates a tree from provided syntax data across all services, both core and secondary
 * @param data Object containing the OCF data for each service
 * @constructor
 */
export default function Generate(data){
    syntax = data;
    const rootNode = new TreeNode(null,false,"root");
    serviceIdentify(rootNode);
    return [tree, lookup];
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function serviceIdentify(rootNode){
    for(const[keystring, data] of Object.entries(syntax)){
        //console.log(keystring);
        if(data===""){
            //console.log("Data empty")
            continue;
        }
        let serviceNode = new TreeNode(null,false,false,keystring, "serviceRoot");
        try{
            generateServiceSubTree(keystring, data, serviceNode);

        }catch(err){
            console.log(err.message);
            console.log(err.stack);
        }
        rootNode.appendChild(serviceNode);

    }
    console.log(lookup);
    tree = rootNode;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateServiceSubTree(service, syntax, serviceNode){
    let syntaxPartitions = syntax.split("\r\n");

    for(let partition of syntaxPartitions){
        const tokens = partition.split(" ");
        if(tokens[0]==="F"){
            tokens.shift();
            parseFunction(tokens, serviceNode)
        }else if(tokens[0]==="T"){
            tokens.shift();
            parseType(tokens);
        }else if(tokens[0]==="END"){
            //console.log(JSON.stringify(serviceNode, null, 2));
            break;
        }else{
            console.log(tokens[0])
            throw new Error("Illegal token at line start");
        }
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Function to parse a function expression from ocf format. The definition for declaring a function expression can be found
 * elsewhere. But in essence, the parser expects first an opcode, encased in single quotes, followed by any data arguments. An
 * opcode must be a singleton, i.e. there cannot be multiple (+) and it cannot be optional ([])
 * @param {Array<String>} tokens An array of string tokens that make up the function expression
 * @param {TreeNode} serviceRoot The root of the services subtree in the syntax tree
 */
function parseFunction(tokens, serviceRoot){
    if(isOpCode(tokens[0])){//every function expression starts with an "opcode"
        let opNode = new TreeNode(
            null,
            false,
            false,
            tokens[0].replace(/'/g,""),
            "OpCode"
        );
        serviceRoot.appendChild(opNode);
        tokens.shift();
        let last = opNode;
        for(let token of tokens){//parse function arguments
            const node = parseArgument(token);
            last.appendChild(node);
            last = node;
        }
    }else{
        throw new Error("Illegal start to function expression");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function parseType(tokens){
    if(isType(tokens[0])){
        lookup[tokens[0].replace(/#/g,"")] = parseOptions(tokens[1])
    }else{
        throw new Error("Type definition syntax is invalid");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function parseOptions(optionStmt){
    const chars = optionStmt.split("");
    let options = [];
    if(chars[0]==="(" && chars[chars.length-1]===")"){
        let inner = optionStmt.replace(/[()]/g,"");
        let optionI = inner.split(",");
        for(const option of optionI){
            if(validOptionSyntax(option)){
                options.push(option.replace(/"/g,""));
            }
        }
        return options;
    }else{
        throw new Error("Options syntax for type definition is invalid");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Function to verify the structure of a function argument, including whether it is optional and whether it can accept
 * multiple arguments of this type
 * @param {String} token The token which is likely to be an argument
 * @return {TreeNode} a tree node
 */
function parseArgument(token){
    let chars = token.split("");
    let optional = false;
    let multiple = false;
    if(chars[0]==="["){//check if optional
    console.log(chars);
        for(let char of chars){
            if(char==="]"){
                optional = true;
                break;
            }
        }
        if(!optional){
            throw new Error("Option syntax is not closed")
        }
    }
    if(chars[chars.length-1]==="+"){
        multiple = true;
    }
    const val = token.replace(/[\[\]\\r+]/g,"")
    return new TreeNode(null,optional,multiple,val, "Argument")
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Function to check whether a token is an OpCode (describing a function for a service to use)
 * @param token
 * @returns {boolean}
 */
function isOpCode(token){
    let chars = token.split("");
    return chars[0] === "'" && chars[chars.length - 1] === "'";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isType(token){
    let chars = token.split("");
    return chars[0] === "#" && chars[chars.length - 1] === "#";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function validOptionSyntax(option){
    const chars = option.split("");
    return chars[0] === "\"" && chars[chars.length - 1] === "\"";
}