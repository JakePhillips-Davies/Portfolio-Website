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
        this.PrintLn(this.FormatConsolePath() + commandFull_);

        let commandSplit : Array<string> = commandFull_.split(" ");

        switch (commandSplit[0].toLowerCase()) {
            case "dir":
                if (commandSplit.length <= 1) {
                    this.PrintDirectory(C_DRIVE.path);
                }else{
                    this.PrintDirectory(commandSplit[1]);
                }
                break;

            case "help":
                break;
        
            default:
                this.PrintLn("Error: command not recognised");
                break;
        }

        this.PrintLn("");
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

        if (inputDirectory == null) {
            this.PrintLn("Error: directory not found!");
            return;
        }
        
        this.PrintLn(" ");
        this.PrintLn(" Directory of " + inputDirectory.path);
        this.PrintLn(" ");

        inputDirectory.children.forEach(childDirectory_ => {
            this.PrintLn("" + childDirectory_.name);
        });
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