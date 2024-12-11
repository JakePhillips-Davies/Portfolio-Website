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
    public CurrentDirectory() : any {return this.currentDirectory;}
    public CurrentPath() : string {return this.currentDirectory.path;}
    public SetDirectory(newDir_ : any) {this.currentDirectory = newDir_;}

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
        consoleInputFieldElement.innerHTML = "<pre> </pre>";
        this.inputField = this.element.appendChild(consoleInputFieldElement);
        this.FormatConsolePath();

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
        
        this.PrintLn("");
    }



    //
    // ░█▄█░█▀▀░▀█▀░█░█░█▀█░█▀▄░█▀▀
    // ░█░█░█▀▀░░█░░█▀█░█░█░█░█░▀▀█
    // ░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀░░▀▀▀
    //
    private GetConsolePath() {
        return this.currentDirectory.path + consoleObj.consoleFlair
    }
    public FormatConsolePath() {
        this.inputField.getElementsByTagName("pre")[0].innerHTML = this.GetConsolePath();
    }

    public RunCommand(commandFull_ : string) {
        if (this.runningCommand) {
            return;
        }

        this.runningCommand = true;


        //
        // Run command
        //

        this.PrintLn(this.GetConsolePath() + commandFull_);

                                                            // stole from stack overflow somewhere, I hate regex
        let commandSplit : Array<string> = commandFull_.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/); 

        let command = commandSplit[0].toLowerCase();
        
        if (commandMap.get(command) != null) {
            commandMap.get(command)[0] (commandSplit, this);
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
        let inputDirectory : any = GetDirectoryByExactPath(path_);

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
const commandMap = new Map();


// dir ...
commandMap.set("dir", [ (arguements_ : Array<string>, console_ : consoleObj) => {

    if (arguements_.length <= 1) { // if only dir
        console_.PrintDirectory(console_.CurrentPath());
    }else{ 
        let inputtedPath = arguements_[1].replaceAll('"', "");

        if (inputtedPath.toLowerCase() == "-c\\") {
            console_.PrintDirectory(C_DRIVE.path);
        }
        else if (inputtedPath.toLowerCase() == "-bios\\") {
            console_.PrintDirectory(BIOS.path);
        }
        else if (inputtedPath.toLowerCase().includes("-c\\") || inputtedPath.toLowerCase().includes("-bios\\")) { // changes based on whether the user calls -c\... or just ...
            console_.PrintDirectory(inputtedPath);
        }
        else {
            console_.PrintDirectory(console_.CurrentPath() + "\\" + inputtedPath);
        }
    }

},
 "dir [directory] : print contents of relative directory"
]);


// cd ...
commandMap.set("cd", [ (arguements_ : Array<string>, console_ : consoleObj) => {

    if (arguements_.length <= 1) { // if only dir
        console_.PrintLn(console_.CurrentPath());
    }else{ 
        let inputtedPath = arguements_[1].replaceAll('"', "");

        let tempDir : any = null;

        if (inputtedPath.toLowerCase() == "-c\\") {
            tempDir = GetDirectoryByExactPath(C_DRIVE.path);
        }
        else if (inputtedPath.toLowerCase() == "-bios\\") {
            tempDir = GetDirectoryByExactPath(BIOS.path);
        }
        else if (inputtedPath.toLowerCase().includes("-c\\") || inputtedPath.toLowerCase().includes("-bios\\")) { // changes based on whether the user calls -c\... or just ...
            tempDir = GetDirectoryByExactPath(inputtedPath);
        }
        else {
            tempDir = GetDirectoryByExactPath(console_.CurrentPath() + "\\" + inputtedPath);
        }

        if (tempDir == null) {
            console_.PrintLn("Error: directory not found");
        } else {
            console_.SetDirectory(tempDir);
        }
    }
    console_.FormatConsolePath();

},
 "cd [directory] : go to relative directory"
]);


// cd..
commandMap.set("cd..", [ (arguements_ : Array<string>, console_ : consoleObj) => {

    if (console_.CurrentDirectory().parentPath == "") {
        console_.PrintLn("Error: cannot go higher");
    }
    else {
        console_.SetDirectory( GetDirectoryByExactPath(console_.CurrentDirectory().parentPath) );
        console_.FormatConsolePath();
    }

},
 "cd.. : go up a directory"
]);


// help
commandMap.set("help", [ (arguements_ : Array<string>, console_ : consoleObj) => {

    console_.PrintLn(" ");

    commandMap.forEach( (value, key, map) => {
        console_.PrintLn(value[1]);
    })

},
 "help : print all commands"
]);


// clear
commandMap.set("clear", [ (arguements_ : Array<string>, console_ : consoleObj) => {

    console_.ClearOut();

},
 "clear : clear the terminal"
]);


// run
commandMap.set("run", [ (arguements_ : Array<string>, console_ : consoleObj) => {
    
    if (arguements_.length <= 1) return;

    let fileToRun : string = arguements_[1];

    fileToRun = fileToRun.replace(".js", "");

    try {
        eval(fileToRun + '(console_, arguements_)');
    } catch (error) {
        console_.PrintLn(error);
    }

},
 "clear : clear the terminal"
]);

































let CONSOLE_DONE_LOADING = true;