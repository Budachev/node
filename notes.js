const fs = require('fs');

const logNote = note => {
    console.log(`Note: ${note.title} ${note.body}`);
}

const fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json'));
    } catch (e) {
        console.warn('Creating file');
        return [];
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const addNote = (title, body) => {

    let notes = fetchNotes();

    let note = { title, body };

    let duplicate = notes.find(note => note.title === title);

    if (!duplicate) {
        notes.push(note);

        saveNotes(notes);
        return note;
    }
    
}

const getNote = (title) => { fetchNotes().filter(note => note.title !== title) };

const removeNote = (title) => {
    const notes = fetchNotes();
    const updatedNotes = notes.filter(note => note.title !== title);
    saveNotes(updatedNotes);
    return notes.length === updatedNotes.length ? false : true;
}

const getAll = () => fetchNotes();

module.exports = {
    addNote,
    getNote,
    removeNote,
    getAll,
    logNote
}