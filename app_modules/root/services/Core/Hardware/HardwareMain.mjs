import Config from "./HardwareConfig.json" with {type: "json"};
//////////////////////////////////////////////////////////////////////////////
export default class HardwareController{

    //////////////////////////////////////////////////////////////////////////
    constructor(args){
        this.console = args[0];
        this.library = args[1];
        this.FileSystem = args[2];
        this.Processor = (this.library.request(["process"])).process;

    }
    //////////////////////////////////////////////////////////////////////////
    async init(){
        console.log(await this.getMotherboardSerial())
    }
    //////////////////////////////////////////////////////////////////////////
    async getMotherboardSerial() {
        return new Promise((resolve, reject) => {
            const cmd = 'Get-WmiObject Win32_BaseBoard | Select-Object -ExpandProperty SerialNumber';
            this.Processor.exec(`powershell -Command "${cmd}"`, (err, stdout, stderr) => {
                if (err) return reject(err);
                resolve(stdout.trim());
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////
}