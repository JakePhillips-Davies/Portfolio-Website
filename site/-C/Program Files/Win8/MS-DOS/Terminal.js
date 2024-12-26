import { Kernel } from "../../../../-BIOS/Boot/Kernel.js";
import { FileSys } from "../../../../-BIOS/Sys16/FileSys.js";
import { CommonCommands } from "./CommonCommands.js";
export class Terminal {
    //
    // ░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    // ░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    // ░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    static terminalFlair = "\\> ";
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
    CurrentDirectory() { return this.currentDirectory; }
    CurrentPath() { return this.currentDirectory.path; }
    SetDirectory(newDir_) { this.currentDirectory = newDir_; }
    runningCommand = false;
    runningFile = false; //==
    StartRunningFile() { this.runningFile = true; }
    StopRunningFile() { this.runningFile = false; }
    //==
    commandMap; //==
    ClearCommandMap() { this.commandMap = new Map(); }
    AddToCommandMap(input_, mapTo_) {
        this.commandMap.set(input_, mapTo_);
    }
    CommandMap() { return this.commandMap; }
    //==
    /**
    * ░█▀▀░█▀█░█▀█░█▀▀░▀█▀░█▀▄░█░█░█▀▀░▀█▀░█▀█░█▀▄
    * ░█░░░█░█░█░█░▀▀█░░█░░█▀▄░█░█░█░░░░█░░█░█░█▀▄
    * ░▀▀▀░▀▀▀░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀
    */
    constructor(parent_) {
        this.ClearCommandMap();
        CommonCommands.AddCommandsTo(this);
        // Set the current directory to -C
        this.currentDirectory = Kernel.GetDrive("-C");
        // Add to dom
        let terminalElement = document.createElement("terminal");
        this.element = parent_.appendChild(terminalElement);
        // Add the input field
        let terminalInputFieldElement = document.createElement("inputField");
        terminalInputFieldElement.innerHTML = "<pre> </pre>";
        this.inputField = this.element.appendChild(terminalInputFieldElement);
        this.FormatTerminalPath();
        // Add the input itself
        let terminalInputElement = document.createElement("input");
        this.input = this.inputField.appendChild(terminalInputElement);
        this.input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.RunCommand(this.input.value);
                this.input.value = "";
            }
        });
        // Add the output field
        let terminalTextElement = document.createElement("pre");
        terminalTextElement.innerHTML = "";
        this.outputField = this.element.appendChild(terminalTextElement);
        this.PrintLn("");
    }
    //
    // ░█▄█░█▀▀░▀█▀░█░█░█▀█░█▀▄░█▀▀
    // ░█░█░█▀▀░░█░░█▀█░█░█░█░█░▀▀█
    // ░▀░▀░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀░░▀▀▀
    //
    GetTerminalPath() {
        return this.currentDirectory.path + Terminal.terminalFlair;
    }
    FormatTerminalPath() {
        this.inputField.getElementsByTagName("pre")[0].innerHTML = this.GetTerminalPath();
    }
    RunCommand(commandFull_) {
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
        let commandSplit = commandFull_.split(/\s+(?=(?:[^\'"]*[\'"][^\'"]*[\'"])*[^\'"]*$)/);
        let command = commandSplit[0].toLowerCase();
        if (this.commandMap.get(command) != null) {
            this.commandMap.get(command)[0](commandSplit, this);
        }
        else {
            this.PrintLn("Error: command not found");
        }
        this.PrintLn("");
        //
        // 
        //
        this.runningCommand = false;
    }
    // Logs
    PrintLn(toPrint) {
        this.outputField.innerHTML += toPrint + "\n";
    }
    Print(toPrint) {
        this.outputField.innerHTML += toPrint;
    }
    PrintDirectory(path_) {
        let inputDirectory = FileSys.GetDirectoryByExactPath(path_);
        //josh.PrintLn(path_);
        if (inputDirectory == null) {
            this.PrintLn("Error: directory not found!");
            return;
        }
        this.PrintLn(" ");
        this.PrintLn("   Directory of " + inputDirectory.path);
        this.PrintLn(" ");
        //counters
        let fileNum = 0;
        let folderNum = 0;
        inputDirectory.children.forEach(childDirectory_ => {
            let name = childDirectory_.name.padEnd(22, " ");
            let size = childDirectory_.size.padEnd(10, " ");
            let modified = childDirectory_.modified.padEnd(10, " ");
            let dirIndicatorString = " ";
            if (childDirectory_.type == "folder") {
                dirIndicatorString = " &ltDIR&gt ";
                folderNum++;
            }
            else {
                fileNum++;
            }
            let dirIndicator = dirIndicatorString.padEnd(7, " ");
            this.PrintLn(name + dirIndicator + size + modified);
        });
        this.PrintLn(fileNum.toString().padStart(22, " ") + " File(s)");
        this.PrintLn(folderNum.toString().padStart(22, " ") + " Folder(s)");
    }
    ClearOut() {
        this.outputField.innerHTML = "";
    }
}
