import { Terminal } from "./Terminal";

export class RunJs {
    static async RunFile(filePath_ : string, terminal_ : Terminal, args_ : Array<string>) {
        terminal_.StartRunningFile();

        let file : any;
        try {
            file = await import("../../../../" + filePath_);
        } catch (error) {
            terminal_.PrintLn(filePath_ + " not found");
            terminal_.PrintLn(" ");
            terminal_.StopRunningFile();
            return;
        }

        file.main(args_, terminal_).then(() => {
            terminal_.StopRunningFile();
        });
    }
}