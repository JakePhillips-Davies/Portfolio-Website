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
    static consoleFlair = "\\> ";
    //
    // ░█░█░█▀█░█▀▄░▀█▀░█▀█░█▀▄░█░░░█▀▀░█▀▀
    // ░▀▄▀░█▀█░█▀▄░░█░░█▀█░█▀▄░█░░░█▀▀░▀▀█
    // ░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀▀▀░▀▀▀
    //
    element;
    GetElement() { return this.element; }
    outputField;
    GetOutputField() { return this.outputField; }
    inputField;
    GetInputField() { return this.inputField; }
    input;
    GetInput() { return this.input; }
    currentDirectory;
    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    */
    constructor(parent_) {
        // Set the current directory to -C-Drive
        this.currentDirectory = C_DRIVE;
        // Add to dom
        let consoleElement = document.createElement("console");
        this.element = parent_.appendChild(consoleElement);
        // Add the input field
        let consoleInputFieldElement = document.createElement("inputField");
        consoleInputFieldElement.innerHTML = "<pre>" + this.FormatConsolePath() + "</pre>";
        this.inputField = this.element.appendChild(consoleInputFieldElement);
        // Add the input itself
        let consoleInputElement = document.createElement("input");
        this.input = this.inputField.appendChild(consoleInputElement);
        this.input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.RunCommand(this.input.value);
                this.input.value = "";
            }
        });
        // Add the output field
        let consoleTextElement = document.createElement("pre");
        consoleTextElement.innerHTML = "";
        this.outputField = this.element.appendChild(consoleTextElement);
    }
    //
    // ░█▄█░█▀▀░▀█▀░█░█░█▀█░█▀▄░█▀▀
    // ░█░█░█▀▀░░█░░█▀█░█░█░█░█░▀▀█
    // ░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀░░▀▀▀
    //
    FormatConsolePath() {
        return this.currentDirectory.path + consoleObj.consoleFlair;
    }
    RunCommand(commandFull_) {
        this.PrintLn(this.FormatConsolePath() + commandFull_);
        let commandSplit = commandFull_.split(" ");
        switch (commandSplit[0].toLowerCase()) {
            case "dir":
                if (commandSplit.length <= 1) {
                    this.PrintDirectory(C_DRIVE.path);
                }
                else {
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
    PrintLn(toPrint) {
        this.outputField.innerHTML += toPrint + "\n";
    }
    Print(toPrint) {
        this.outputField.innerHTML += toPrint;
    }
    PrintDirectory(path_) {
        let inputDirectory = GetDirectoryByExactPath(path_);
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
let josh;
new Promise((resolve) => {
    let interval = setInterval(() => {
        if (masterTrayLoaded)
            resolve(interval);
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
