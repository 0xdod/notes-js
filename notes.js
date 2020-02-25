const fs = require("fs");

const LOC = "notes/notes.json";
function fetchNotes() {
  //try to load a note from disk
  try {
    return (notes = JSON.parse(fs.readFileSync(LOC)));
  } catch (e) {
    // if error occurs (no file or error in reading file,catch the error by returning an empty notes array)
    return [];
  }
}

function saveNotes(notes) {
  //save notes to disk as json
  fs.writeFileSync(LOC, JSON.stringify(notes));
}

function logNote(note) {
  debugger;
  console.log("---");
  console.log("Title:", note.title);
  console.log("Body:", note.body);
}

function addNote(title, body) {
  let notes = fetchNotes();
  //creating a new note
  let newNote = {
    title,
    body
  };
  //check for duplicate note
  let duplicateNote = notes.filter(note => note.title == title);
  if (duplicateNote.length === 0) {
    // add new note to the notes array
    notes.push(newNote);
    saveNotes(notes);
    return newNote; // to the caller
  }
}

function getAll() {
  return fetchNotes();
}

function getNote(title) {
  let notes = fetchNotes();
  let ReadNote = notes.filter(note => note.title === title);
  return ReadNote[0];
}

function removeNote(title) {
  let notes = fetchNotes();
  let filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
}

module.exports = {
  logNote,
  addNote,
  getAll,
  getNote,
  removeNote
};
