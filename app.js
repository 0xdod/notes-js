const fs = require("fs");
const yargs = require("yargs");
// const _ = require("lodash");

const notes = require("./notes");
//configuration for yargs
const title = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};
const body = {
  describe: "Content of note",
  demand: true,
  alias: "b"
};
let argv = yargs
  .command("add", "add a new note", {
    title,
    body
  })
  .command("read", "Reads a note", {
    title
  })
  .command("list", "Lists all notes")
  .command("remove", "Deletes a note", {
    title
  })
  .help().argv;
//
switch (argv._[0]) {
  case "add":
    {
      let note = notes.addNote(argv.title, argv.body);
      if (note) {
        console.log("New note created!");
        notes.logNote(note);
      } else {
        console.log("Failed to create note. Already exists?");
      }
    }
    break;
  case "list":
    {
      let allNotes = notes.getAll();
      console.log(`Printing ${allNotes.length} note(s)`);
      allNotes.forEach(note => notes.logNote(note));
    }
    break;
  case "remove":
    {
      let rmvBool = notes.removeNote(argv.title);
      const rmMsg = rmvBool ? `${argv.title} removed!` : "An error occured!";
      console.log(rmMsg);
    }
    break;
  case "read":
    {
      let note = notes.getNote(argv.title);
      if (note) {
        console.log("Reading note");
        notes.logNote(note);
      } else {
        console.log("Error!!: Note not found");
      }
    }
    break;
  default:
    console.log("Command not found");
}
