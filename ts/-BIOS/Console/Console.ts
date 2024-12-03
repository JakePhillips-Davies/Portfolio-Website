// ██████████████████████████████████████████████████████████████████████████████████████████████
// █▌                                                                                          ▐█
// █▌                                                                                          ▐█
// █▌     █████████  █████         █████████    █████████   █████████  ██████████  █████████   ▐█
// █▌    ███░░░░░███░░███         ███░░░░░███  ███░░░░░███ ███░░░░░███░░███░░░░░█ ███░░░░░███  ▐█
// █▌   ███     ░░░  ░███        ░███    ░███ ░███    ░░░ ░███    ░░░  ░███  █ ░ ░███    ░░░   ▐█
// █▌  ░███          ░███        ░███████████ ░░█████████ ░░█████████  ░██████   ░░█████████   ▐█
// █▌  ░███          ░███        ░███░░░░░███  ░░░░░░░░███ ░░░░░░░░███ ░███░░█    ░░░░░░░░███  ▐█
// █▌  ░░███     ███ ░███      █ ░███    ░███  ███    ░███ ███    ░███ ░███ ░   █ ███    ░███  ▐█
// █▌   ░░█████████  ███████████ █████   █████░░█████████ ░░█████████  ██████████░░█████████   ▐█
// █▌    ░░░░░░░░░  ░░░░░░░░░░░ ░░░░░   ░░░░░  ░░░░░░░░░   ░░░░░░░░░  ░░░░░░░░░░  ░░░░░░░░░    ▐█
// █▌                                                                                          ▐█
// █▌                                                                                          ▐█
// ██████████████████████████████████████████████████████████████████████████████████████████████
class consoleObj {
    //
    // ░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    // ░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    // ░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    private static consoleFlair : string = "\\> ";


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

    private runningCommand : boolean = false;



    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    */
    constructor(parent_ : Element) {
        // Set the current directory to -C-Drive
        this.currentDirectory = C_DRIVE;
        
        // Add to dom
        let consoleElement : Element = document.createElement("console");
        this.element = parent_.appendChild(consoleElement);

        // Add the input field
        let consoleInputFieldElement : Element = document.createElement("inputField");
        consoleInputFieldElement.innerHTML = "<pre>" + this.FormatConsolePath() + "</pre>";
        this.inputField = this.element.appendChild(consoleInputFieldElement);

        // Add the input itself
        let consoleInputElement : HTMLInputElement = document.createElement("input");
        this.input = this.inputField.appendChild(consoleInputElement);
        this.input.addEventListener("keypress", (e:any) => {
            if (e.key === "Enter") {
                this.RunCommand(this.input.value);
                this.input.value = "";
            }
        });

        // Add the output field
        let consoleTextElement : Element = document.createElement("pre");
        consoleTextElement.innerHTML = "";
        this.outputField = this.element.appendChild(consoleTextElement);
    }



    //
    // ░█▄█░█▀▀░▀█▀░█░█░█▀█░█▀▄░█▀▀
    // ░█░█░█▀▀░░█░░█▀█░█░█░█░█░▀▀█
    // ░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀░░▀▀▀
    //
    private FormatConsolePath() : string {
        return this.currentDirectory.path + consoleObj.consoleFlair
    }

    public RunCommand(commandFull_ : string) {
        if (this.runningCommand) {
            return;
        }

        this.runningCommand = true;

        this.PrintLn(this.FormatConsolePath() + commandFull_);

        let commandSplit : Array<string> = commandFull_.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/); // stole from stack overflow somewhere, I hate regex

        //console.log(commandSplit);

        switch (commandSplit[0].toLowerCase()) {
            case "dir":
                if (commandSplit.length <= 1) { // if only dir
                    this.PrintDirectory(this.currentDirectory.path);
                }else{ 
                    let inputtedPath = commandSplit[1].replaceAll('"', "");

                    if (inputtedPath.toLowerCase() == "-c\\") {
                        this.PrintDirectory(C_DRIVE.path);
                    }
                    else if (inputtedPath.toLowerCase().includes("-c\\")) { // changes based on whether the user calls -c\... or just ...
                        this.PrintDirectory(inputtedPath);
                    }
                    else {
                        this.PrintDirectory(this.currentDirectory.path + "\\" + inputtedPath);
                    }
                }
                break;

            case "cd":
                if (commandSplit.length <= 1) { // if only dir
                    this.PrintLn(this.currentDirectory.path);
                }else{ 
                    let inputtedPath = commandSplit[1].replaceAll('"', "");

                    if (inputtedPath.toLowerCase() == "-c\\") {
                        this.currentDirectory = GetDirectoryByExactPath(C_DRIVE.path);
                    }
                    else if (inputtedPath.toLowerCase().includes("-c\\")) { // changes based on whether the user calls -c\... or just ...
                        this.currentDirectory = GetDirectoryByExactPath(inputtedPath);
                    }
                    else {
                        this.currentDirectory = GetDirectoryByExactPath(this.currentDirectory.path + "\\" + inputtedPath);
                    }
                }
                this.inputField.getElementsByTagName("pre")[0].innerHTML = this.FormatConsolePath();
                break;
            
            case "cd..":
                if (this.currentDirectory.parentPath == "") {
                    this.PrintLn("Error: cannot go higher");
                }
                else {
                    this.currentDirectory = GetDirectoryByExactPath(this.currentDirectory.parentPath);
                    this.inputField.getElementsByTagName("pre")[0].innerHTML = this.FormatConsolePath();
                }
                break;

            case "help":
                this.PrintLn("dir [directory] : print contents of relative directory");
                break;
        
            default:
                this.PrintLn("Error: command not recognised");
                break;
        }

        this.PrintLn("");

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
        let inputDirectory : any = GetDirectoryByExactPath(path_);

        //josh.PrintLn(path_);

        if (inputDirectory == null) {
            this.PrintLn("Error: directory not found!");
            return;
        }
        
        this.PrintLn(" ");
        this.PrintLn(" Directory of " + inputDirectory.path);
        this.PrintLn(" ");

        //counters
        let fileNum : number = 0;
        let folderNum : number = 0;
        
        inputDirectory.children.forEach(childDirectory_ => { //Yea I hate this too lol, cba doing it better
            let name = "<span style=\"min-width:calc(var(--root-font-size)*10);display:inline-block;margin-right:calc(var(--root-font-size)*1)\">" + childDirectory_.name + "</span>";
            let size = "<span style=\"min-width:calc(var(--root-font-size)*5);display:inline-block;margin-right:calc(var(--root-font-size)*1)\">" + childDirectory_.size + "</span>";
            let modified = "<span style=\"min-width:calc(var(--root-font-size)*5);display:inline-block;margin-right:calc(var(--root-font-size)*1)\">" + childDirectory_.modified + "</span>";
            
            let dirIndicatorString : string = " ";
            if (childDirectory_.type == "folder") {
                dirIndicatorString = " &ltDIR&gt";

                folderNum++;
            }else {
                fileNum++;
            }

            let dirIndicator = "<span style=\"min-width:calc(var(--root-font-size)*3);display:inline-block;margin-right:calc(var(--root-font-size)*1)\">" + dirIndicatorString + "</span>";
        
            this.PrintLn(name + dirIndicator + size + modified);
        });
        
        this.PrintLn("                    " + fileNum + " File(s)");
        this.PrintLn("                    " + folderNum + " Folder(s)");
    }


}















// ███████████████████████████████████████████████████████████
// █▌                                                       ▐█
// █▌                                                       ▐█
// █▌   ██████   ██████   █████████   █████ ██████   █████  ▐█
// █▌  ░░██████ ██████   ███░░░░░███ ░░███ ░░██████ ░░███   ▐█
// █▌   ░███░█████░███  ░███    ░███  ░███  ░███░███ ░███   ▐█
// █▌   ░███░░███ ░███  ░███████████  ░███  ░███░░███░███   ▐█
// █▌   ░███ ░░░  ░███  ░███░░░░░███  ░███  ░███ ░░██████   ▐█
// █▌   ░███      ░███  ░███    ░███  ░███  ░███  ░░█████   ▐█
// █▌   █████     █████ █████   █████ █████ █████  ░░█████  ▐█
// █▌  ░░░░░     ░░░░░ ░░░░░   ░░░░░ ░░░░░ ░░░░░    ░░░░░   ▐█
// █▌                                                       ▐█
// █▌                                                       ▐█
// ███████████████████████████████████████████████████████████
// Wait until the master tray is loaded before continuing
let josh : consoleObj;

new Promise((resolve) => {

    let interval = setInterval(() => {
        if(masterTrayLoaded) resolve(interval);
    }, 100);

}).
// Then do the following...
then(() => {
    
    josh = new consoleObj(masterTray.GetTrayElement());

});















// ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
// █▌                                                                                                                    ▐█
// █▌                                                                                                                    ▐█
// █▌   ███████████ █████  █████ ██████   █████   █████████  ███████████ █████    ███████    ██████   █████  █████████   ▐█
// █▌  ░░███░░░░░░█░░███  ░░███ ░░██████ ░░███   ███░░░░░███░█░░░███░░░█░░███   ███░░░░░███ ░░██████ ░░███  ███░░░░░███  ▐█
// █▌   ░███   █ ░  ░███   ░███  ░███░███ ░███  ███     ░░░ ░   ░███  ░  ░███  ███     ░░███ ░███░███ ░███ ░███    ░░░   ▐█
// █▌   ░███████    ░███   ░███  ░███░░███░███ ░███             ░███     ░███ ░███      ░███ ░███░░███░███ ░░█████████   ▐█
// █▌   ░███░░░█    ░███   ░███  ░███ ░░██████ ░███             ░███     ░███ ░███      ░███ ░███ ░░██████  ░░░░░░░░███  ▐█
// █▌   ░███  ░     ░███   ░███  ░███  ░░█████ ░░███     ███    ░███     ░███ ░░███     ███  ░███  ░░█████  ███    ░███  ▐█
// █▌   █████       ░░████████   █████  ░░█████ ░░█████████     █████    █████ ░░░███████░   █████  ░░█████░░█████████   ▐█
// █▌  ░░░░░         ░░░░░░░░   ░░░░░    ░░░░░   ░░░░░░░░░     ░░░░░    ░░░░░    ░░░░░░░    ░░░░░    ░░░░░  ░░░░░░░░░    ▐█
// █▌                                                                                                                    ▐█
// █▌                                                                                                                    ▐█
// ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████