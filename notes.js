const fs = require('fs');

const addNote = (title, body) => {

    let notes = [];
    let note = { title, body };

    try {
        notes = JSON.parse(fs.readFileSync('notes.json'));
    } catch (e) {
        console.warn('Creating file');
    }

    let duplicate = notes.find(note => note.title === title);
    
    if (!duplicate) {
        notes.push(note);

        fs.writeFileSync('notes.json', JSON.stringify(notes));
    }

}

const getNote = () => {

}

const removeNote = () => {

}

const getAll = () => {
    console.log('get all');
}

module.exports = {
    addNote,
    getNote,
    removeNote,
    getAll
}