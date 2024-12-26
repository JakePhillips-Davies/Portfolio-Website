import { Kernel } from "../../../../-BIOS/Boot/Kernel.js";
import { FileSys } from "../../../../-BIOS/Sys16/FileSys.js";
import { CommonCommands } from "./CommonCommands.js";

export class Terminal {
    //
    // ░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    // ░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    // ░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    private static terminalFlair : string = "\\> ";


    //
    // ░█░█░█▀█░█▀▄░▀█▀░█▀█░█▀▄░█░░░█▀▀░█▀▀
    // ░▀▄▀░█▀█░█▀▄░░█░░█▀█░█▀▄░█░░░█▀▀░▀▀█
    // ░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀▀▀
    //
    private element : Element;
    public GetElement() : Element {return this.element;}
    
    private outputField : Element;
    public GetOutputField() : Element {return this.outputField;}

    private inputField : Element;
    public GetInputField() : Element {return this.inputField;}
    
    private input : HTMLInputElement;
    public GetInput() : HTMLInputElement {return this.input;}

    private currentDirectory : any;
    public CurrentDirectory() : any {return this.currentDirectory;}
    public CurrentPath() : string {return this.currentDirectory.path;}
    public SetDirectory(newDir_ : any) {this.currentDirectory = newDir_;}

    private runningCommand : boolean = false;

    private runningFile : boolean = false;//==
        public StartRunningFile() : void { this.runningFile = true; }
        public StopRunningFile() : void { this.runningFile = false; }
    //==

    private commandMap : Map<string, Array<any>>;//==
        
        public ClearCommandMap() : void { this.commandMap = new Map<string, Array<any>>(); }

        public AddToCommandMap(input_ : string, mapTo_ : Array<any>) {
            this.commandMap.set(input_, mapTo_);
        }

        public CommandMap() { return this.commandMap; }

    //==



    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    */
    constructor(parent_ : Element) {

        this.ClearCommandMap();
        CommonCommands.AddCommandsTo(this);

        // Set the current directory to -C
        this.currentDirectory = Kernel.GetDrive("-C");
        
        // Add to dom
        let terminalElement : Element = document.createElement("terminal");
        this.element = parent_.appendChild(terminalElement);

        // Add the input field
        let terminalInputFieldElement : Element = document.createElement("inputField");
        terminalInputFieldElement.innerHTML = "<pre> </pre>";
        this.inputField = this.element.appendChild(terminalInputFieldElement);
        this.FormatTerminalPath();

        // Add the input itself
        let terminalInputElement : HTMLInputElement = document.createElement("input");
        this.input = this.inputField.appendChild(terminalInputElement);
        this.input.addEventListener("keypress", (e:any) => {
            if (e.key === "Enter") {
                this.RunCommand(this.input.value);
                this.input.value = "";
            }
        });

        // Add the output field
        let terminalTextElement : Element = document.createElement("pre");
        terminalTextElement.innerHTML = "";
        this.outputField = this.element.appendChild(terminalTextElement);
        
        this.PrintLn("");
    }



    //
    // ░█▄█░█▀▀░▀█▀░█░█░█▀█░█▀▄░█▀▀
    // ░█░█░█▀▀░░█░░█▀█░█░█░█░█░▀▀█
    // ░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀░░▀▀▀
    //
    private GetTerminalPath() {
        return this.currentDirectory.path + Terminal.terminalFlair
    }
    public FormatTerminalPath() {
        this.inputField.getElementsByTagName("pre")[0].innerHTML = this.GetTerminalPath();
    }

    public RunCommand(commandFull_ : string) {
        if (this.runningFile) {
            return;
        }

        if (this.runningCommand) {
            return;
        }

        this.runningCommand = true;


        //
        // Run command
        //

        this.PrintLn(this.GetTerminalPath() + commandFull_);

                                                            // stole from stack overflow somewhere, I hate regex
        let commandSplit : Array<string> = commandFull_.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/); 

        let command = commandSplit[0].toLowerCase();
        
        if (this.commandMap.get(command) != null) {
            this.commandMap.get(command)[0] (commandSplit, this);
        }else {
            this.PrintLn("Error: command not found");
        }
        
        this.PrintLn("");

        //
        // 
        //


        this.runningCommand = false;
    }

    // Logs
    public PrintLn(toPrint : string) {
        this.outputField.innerHTML += toPrint + "\n";
    }
    public Print(toPrint : string) {
        this.outputField.innerHTML += toPrint;
    }

    public PrintDirectory(path_ : string) {
        let inputDirectory : any = FileSys.GetDirectoryByExactPath(path_);

        //josh.PrintLn(path_);

        if (inputDirectory == null) {
            this.PrintLn("Error: directory not found!");
            return;
        }
        
        this.PrintLn(" ");
        this.PrintLn("   Directory of " + inputDirectory.path);
        this.PrintLn(" ");

        //counters
        let fileNum : number = 0;
        let folderNum : number = 0;
        
        inputDirectory.children.forEach(childDirectory_ => {
            let name : string = childDirectory_.name.padEnd(22, " ");
            let size : string = childDirectory_.size.padEnd(10, " ");
            let modified : string = childDirectory_.modified.padEnd(10, " ");
            
            let dirIndicatorString : string = " ";
            if (childDirectory_.type == "folder") {
                dirIndicatorString = " &ltDIR&gt ";

                folderNum++;
            }else {
                fileNum++;
            }
            let dirIndicator : string = dirIndicatorString.padEnd(7, " ");
        
            this.PrintLn(name + dirIndicator + size + modified);
        });
        
        this.PrintLn(fileNum.toString().padStart(22, " ") + " File(s)");
        this.PrintLn(folderNum.toString().padStart(22, " ") + " Folder(s)");
    }

    public ClearOut() {
        this.outputField.innerHTML = "";
    }


}