const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNote();
  const duplicateNote = notes.find((note) => note.title === title);

    debugger

  if (!duplicateNote) {
    
    notes.push({
      title: title,
      body: body,
    });

    savedNote(notes);
    console.log(chalk.inverse.green("New Note Added"));
  } else {
    console.log("This note's exsist");
  }
};

const savedNote = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNote = () => {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const dataJson = bufferData.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = loadNote();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!..."));
    savedNote(notesToKeep);
  } else {
    console.log(chalk.red.inverse("Note Not Found..."));
  }
};

const listNotes = () => {
  const notes = loadNote();
  console.log(chalk.red.inverse("Your Notes"));
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNote();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.inverse.red("Note not found"));
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
