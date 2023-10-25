/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

//Import packages
import fs from 'fs';
import qr from 'qr-image';
import inquirer from 'inquirer';


//Prompt user for URL: and save answer as "URL" to the .name property of answers object.
inquirer.prompt([
    {
        message: "URL:",
        name: "URL",
    }
])
// User qrImg to conert the answer URL to a png.
//Save users input using fs.writeFile to a URL.txt document.
.then((answers) => {
    var qrImg = qr.image(answers.URL, { type: 'png'});
    qrImg.pipe(fs.createWriteStream('QRIMG.png'));
    fs.writeFile("URL.txt", answers.URL, (err) => {
        if (err) throw err;
        console.log("The file has been saved!")
    })
})
.catch((error) => {
    if (error) {
        console.log(error);
    }
});
