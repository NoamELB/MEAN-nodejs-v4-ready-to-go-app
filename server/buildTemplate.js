'use strict';
/**
 * A script that generates the structure of the app.
 * It uses the structure.json file in lib, and does: 
 * 1 - creates the directories from there if they don't exist
 * 2 - creates in the directory the files from template folder 
 * To use, simply run "node buildTemplate"
 */
let fs	= require('fs');
let structure = require('./lib/main/structure.json');
for (let k in structure) {
	let dir, ext, isMock = '';
	switch (k) {
		case "templates": 
			dir = "lib";
			ext = "js";
			break;
		case "tests": 
			dir = "tests";
			ext = "spec.js";
			break;
		case "mocks": 
			dir = "tests";
			ext = "mock.js";
			isMock = "/mocks";
			break;
	}
	if (!dir) continue;
	let templates = [];
	// load templates
	for (let j = 0; j < structure[k].length; j++) {
		templates[j] = fs.readFileSync(`${__dirname}/template/${dir}${isMock}/${structure[k][j]}.${ext}`, 'utf8');
	}
	for (let i = 0, len = structure.folders.length; i < len; i++) {
		// create folder if does not exist
		let folderName = `${__dirname}/${dir}/${structure.folders[i]}${isMock}`;
		try {
			fs.statSync(folderName);
		} catch (e) {
			fs.mkdirSync(folderName);
		}
		// create files if they don't exist
		for (let j = 0; j < structure[k].length; j++) {
			let fileName = `${folderName}/${structure.folders[i]}.${structure[k][j]}.${ext}`;
			try {
				fs.statSync(fileName);
			} catch (e) {
				let upperName = structure.folders[i][0].toUpperCase() + structure.folders[i].slice(1);
				let newContent = templates[j].replace(/Template/g, upperName);
				newContent = newContent.replace(/template/g, structure.folders[i]);
				fs.writeFileSync(fileName, newContent);
			}
		}
	}
}