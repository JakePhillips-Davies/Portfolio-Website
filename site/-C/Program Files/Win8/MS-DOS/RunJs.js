export class RunJs {
    static async RunFile(filePath_, terminal_, args_) {
        terminal_.StartRunningFile();
        let file;
        try {
            file = await import("../../../../" + filePath_);
        }
        catch (error) {
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
