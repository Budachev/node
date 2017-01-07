const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const action = process.argv[2];

const titleArgOpts = {
    describe: 'Title of a note',
    demand: true,
    alias: 't'
};

const bodyArgOpts = {
    describe: 'Body of a note',
    demand: true,
    alias: 'b'
};

const args = yargs
    .command('add', 'Add new note', {
        title: titleArgOpts,
        body: bodyArgOpts,
    })
    .command('list', 'List all notes')
    .command('read', 'Read note', {
        title: titleArgOpts
    })
    .command('remove', 'Remove a note', {
        title: titleArgOpts
    })
    .help()
    .argv;

if (action == 'add') {
    const note = notes.addNote(args.title, args.body);
    note ? console.log('Success!') : console.log("This title is in use.");
} else if (action == 'remove') {
    const removed = notes.removeNote(args.title);
    removed ? console.log(`Succesfully removed ${args.title} note`) : console.log("No such note was found");
} else if (action == 'list') {
    notes.getAll().forEach(note => notes.logNote(note));
}