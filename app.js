const fs = require('fs');
//const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const action = process.argv[2];
const args = yargs.argv;

if (action == 'add') {
    notes.addNote(args.title, args.body);
}

//const user = os.userInfo(); 

// fs.appendFile('greetings.txt', `Hello ${user.username}`);
