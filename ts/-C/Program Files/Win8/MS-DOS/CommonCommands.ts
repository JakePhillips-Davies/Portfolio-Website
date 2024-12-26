import { FileSys } from "../../../../-BIOS/Sys16/FileSys.js";
import { RunJs } from "./RunJs.js";
import { Terminal } from "./Terminal.js";

export class CommonCommands {

    public static AddCommandsTo(terminal_ : Terminal) {

        // dir ...
        terminal_.AddToCommandMap("dir", [ (arguements_ : Array<string>) => {

            if (arguements_.length <= 1) { // if only dir
                terminal_.PrintDirectory(terminal_.CurrentPath());
            }else{ 
                let inputtedPath = arguements_[1].replaceAll('"', "");

                if (inputtedPath.toLowerCase() == "-c\\") {
                    terminal_.PrintDirectory("-C");
                }
                else if (inputtedPath.toLowerCase() == "-bios\\") {
                    terminal_.PrintDirectory("-BIOS");
                }
                else if (inputtedPath.toLowerCase().includes("-c\\") || inputtedPath.toLowerCase().includes("-bios\\")) { // changes based on whether the user calls -c\... or just ...
                    terminal_.PrintDirectory(inputtedPath);
                }
                else {
                    terminal_.PrintDirectory(terminal_.CurrentPath() + "\\" + inputtedPath);
                }
            }

        },
        "dir [directory] : print contents of relative directory"
        ]);


        // cd ...
        terminal_.AddToCommandMap("cd", [ (arguements_ : Array<string>) => {

            if (arguements_.length <= 1) { // if only dir
                terminal_.PrintLn(terminal_.CurrentPath());
            }else{ 
                let inputtedPath = arguements_[1].replaceAll('"', "");

                let tempDir : any = null;

                if (inputtedPath.toLowerCase() == "-c\\") {
                    tempDir = FileSys.GetDirectoryByExactPath("-C");
                }
                else if (inputtedPath.toLowerCase() == "-bios\\") {
                    tempDir = FileSys.GetDirectoryByExactPath("-BIOS");
                }
                else if (inputtedPath.toLowerCase().includes("-c\\") || inputtedPath.toLowerCase().includes("-bios\\")) { // changes based on whether the user calls -c\... or just ...
                    tempDir = FileSys.GetDirectoryByExactPath(inputtedPath);
                }
                else {
                    tempDir = FileSys.GetDirectoryByExactPath(terminal_.CurrentPath() + "\\" + inputtedPath);
                }

                if (tempDir == null) {
                    terminal_.PrintLn("Error: directory not found");
                } else {
                    terminal_.SetDirectory(tempDir);
                }
            }
            terminal_.FormatTerminalPath();

        },
        "cd [directory] : go to relative directory"
        ]);


        // cd..
        terminal_.AddToCommandMap("cd..", [ (arguements_ : Array<string>) => {

            if (terminal_.CurrentDirectory().parentPath == "") {
                terminal_.PrintLn("Error: cannot go higher");
            }
            else {
                terminal_.SetDirectory( FileSys.GetDirectoryByExactPath(terminal_.CurrentDirectory().parentPath) );
                terminal_.FormatTerminalPath();
            }

        },
        "cd.. : go up a directory"
        ]);


        // help
        terminal_.AddToCommandMap("help", [ (arguements_ : Array<string>) => {

            terminal_.PrintLn(" ");

            terminal_.CommandMap().forEach( (value, key, map) => {
                terminal_.PrintLn(value[1]);
            })

        },
        "help : print all commands"
        ]);


        // clear
        terminal_.AddToCommandMap("clear", [ (arguements_ : Array<string>) => {

            terminal_.ClearOut();

        },
        "clear : clear the terminal"
        ]);


        // read
        terminal_.AddToCommandMap("read", [ (arguements_ : Array<string>) => {

            terminal_.PrintLn(" ");
            
            if (arguements_.length <= 1) return;

            let filePath : string = "";
            if (arguements_[1].includes("-C\\") || arguements_[1].includes("-BIOS\\")) {}
            else filePath += terminal_.CurrentPath() + "\\";
            filePath += arguements_[1];

            terminal_.PrintLn(filePath);

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", filePath, false);
            xmlhttp.send();
            if (xmlhttp.status != 200) {
                terminal_.PrintLn("Error: file not found");
                return;
            }

            terminal_.PrintLn(" ");

            terminal_.PrintLn(xmlhttp.responseText);

        },
        "read : read a file"
        ]);


        // run
        terminal_.AddToCommandMap("run", [ (arguements_ : Array<string>) => {
            
            if (arguements_.length <= 1) return;

            let filePath : string = "";
            if (arguements_[1].includes("-C\\") || arguements_[1].includes("-BIOS\\")) {}
            else filePath += terminal_.CurrentPath() + "\\";
            filePath += arguements_[1];
            
            RunJs.RunFile(filePath, terminal_, arguements_);

        },
        "run : run a js file"
        ]);
    }

}