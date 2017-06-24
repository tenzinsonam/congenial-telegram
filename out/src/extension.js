'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "wuff" is now active!');
    let sh = require('shelljs');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed
        let lst = ['[^A-Za-z0-9_]typescript\\|^typescript', '[^A-Za-z0-9_]hello\\|^hello', '[^A-Za-z0-9_]scanf\\|^scanf'];
        // Display a message box to the user
        let editor = vscode.window.activeTextEditor;
        let text = editor.document.getText();
        let lines = text.split(/\r?\n/g);
        for (let i = 0; i < lines.length; i++) {
            let oriline = lines[i];
            //let ind = line.indexOf('typescript')
            for (let m = 0; m < lst.length; m++) {
                let text = "echo \"" + oriline + "\" | grep -bo \"" + lst[m] + "\" | cut -d':' -f1";
                let pos_string = sh.exec(text);
                // store all positions in array.
                let pos_lst = pos_string.split(" ").map(function (val) { return Number(val); });
                //console.log(oriline+","+pos_string)                       
            }
        }
        vscode.window.showInformationMessage('Hello World!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map