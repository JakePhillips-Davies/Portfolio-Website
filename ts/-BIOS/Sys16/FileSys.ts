import { Kernel } from "../Boot/Kernel.js";

export class FileSys {
    //
    //░█▀▀░▀█▀░█▀█░▀█▀░▀█▀░█▀▀░█▀▀
    //░▀▀█░░█░░█▀█░░█░░░█░░█░░░▀▀█
    //░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀
    //
    static DirectoryForEach(directory_ : any, function_: (directory_ : any) => any) : void {
        directory_.children.forEach(directory => {
            function_(directory);
        });
    }

    static DirectoryForEachRecursive(directory_ : any, function_: (directory_ : any) => any) {
        directory_.children.forEach(childDirectory => {
            if (childDirectory.type == "folder") {
                FileSys.DirectoryForEachRecursive(childDirectory, function_); // recurse
            }else{
                function_(childDirectory);
            }
        });
    }

    static GetDirectoryByExactPath(path_ : string) : any {
        let resultDir : any = null;
        let path = path_.toLowerCase();
    
        function search(directory_ : any) : void {

            // check if still on the right path
            if(path.includes(directory_.path.toLowerCase()) == false) { return; }
            
            // check if this is the path
            if (path == directory_.path.toLowerCase()) {
                resultDir = directory_;

                return;
            }

            // check children
            directory_.children.forEach(childDirectory => {
                if (childDirectory.type == "folder") {
                    search(childDirectory); // recurse
                }else{
                    if (path == directory_.path.toLowerCase()) {
                        resultDir = directory_;
                        
                        return;
                    }
                }
            });

        }

        Kernel.Drives().forEach(drive => {
            search(drive);
        });
    
        return resultDir;
    }

}