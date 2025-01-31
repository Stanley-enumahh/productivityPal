import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

export function NotesUI() {
  // function hand() {
  //   setNoteArray("hello");
  // }
  const [noteFormOpen, setNoteFormOpen] = useState(false);

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteArray, setNoteArray] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [selectedNote, setSelectedNote] = useState(null);

  const Bgcolors = [
    "bg-red-300",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-green-200",
  ];

  useEffect(
    function () {
      localStorage.setItem("notes", JSON.stringify(noteArray));
    },
    [noteArray]
  );

  function getRandomBgColor() {
    return Bgcolors[Math.floor(Math.random() * Bgcolors.length)];
  }

  function handleNoteFormOpen() {
    setNoteFormOpen((t) => !t);
    setNoteContent("");
    setNoteTitle("");
    setSelectedNote(null);
  }

  function handleDeleteNote(id) {
    setNoteArray((noteArray) => noteArray.filter((note) => note.id !== id));
  }

  function handeleEditNote(note) {
    setSelectedNote(note);
    setNoteTitle(note.noteTitle);
    setNoteContent(note.noteContent);
    setNoteFormOpen(true);
  }

  function handleSaveChanges() {
    setNoteArray(
      noteArray.map((note) =>
        note.id === selectedNote.id ? { ...note, noteTitle, noteContent } : note
      )
    );
    setSelectedNote(null);
    setNoteContent("");
    setNoteTitle("");
    setNoteFormOpen(false);
  }

  function getFormattedDate() {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  function getFormattedTime() {
    const today = new Date();
    return today.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleAddNote() {
    if (!noteTitle.trim()) {
      return;
    }
    const newNote = {
      id: crypto.randomUUID(),
      noteTitle,
      noteContent,
      noteBgcolor: getRandomBgColor(),
      date: getFormattedDate(),
      time: getFormattedTime(),
    };

    setNoteArray((prevNotes) => [...prevNotes, newNote]);
    handleNoteFormOpen();
    setNoteContent("");
    setNoteTitle("");
  }

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <h1 className="font-bold">Notes</h1>
      <div className="flex flex-row w-full h-full justify-between">
        <div className="w-[74%] overflow-y-scroll flex-wrap flex flex-row gap-4 p-5 bg-white rounded shadow-lg h-[450px]">
          {noteArray.length >= 1 ? (
            noteArray.map((note) => (
              <NoteObj
                key={note.id}
                note={note}
                handeleEditNote={handeleEditNote}
                handleDeleteNote={handleDeleteNote}
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-gray-600 font-bold">🙂 No notes</p>
            </div>
          )}
        </div>
        <div className="w-[23%] flex flex-col gap-5 items-end h-full ">
          {selectedNote ? (
            <button
              onClick={handleNoteFormOpen}
              className="bg-black text-xs text-white rounded shadow-lg cursor-pointer px-4 py-2"
            >
              cancel changes
            </button>
          ) : (
            <button
              onClick={handleNoteFormOpen}
              className="bg-blue-600 text-xs text-white rounded shadow-lg cursor-pointer px-4 py-2"
            >
              {noteFormOpen ? "forfeit note" : "+ new note"}
            </button>
          )}

          {noteFormOpen && (
            <NoteForm
              setNoteTitle={setNoteTitle}
              setNoteContent={setNoteContent}
              noteTitle={noteTitle}
              noteContent={noteContent}
              handleAddNote={handleAddNote}
              handleSaveChanges={handleSaveChanges}
              selectedNote={selectedNote}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function NoteObj({ note, handleDeleteNote, handeleEditNote }) {
  return (
    <div
      key={note.id}
      className={`${note.noteBgcolor} cursor-pointer shadow-lg w-[220px] flex flex-col h-[180px] gap-3 justify-between p-3 rounded-lg `}
    >
      <div className="flex flex-col gap-3 w-full h-fit">
        <span className="w-full gap-2 text-sm items-center flex justify-end">
          <FaPencil
            onClick={() => handeleEditNote(note)}
            className="cursor-pointer"
          />
          <MdDeleteOutline
            onClick={() => handleDeleteNote(note.id)}
            className="text-red-500 cursor-pointer"
          />
        </span>

        <div className="flex w-full text-xs flex-col gap-2">
          <p className="font-bold">{note.noteTitle}</p>
          <p className=" break-words text-wrap">{note.noteContent}</p>
        </div>
      </div>
      <span className="text-xs w-full justify-between flex flex-row  text-gray-700">
        <p>{note.time}</p>
        <p>{note.date}</p>
      </span>
    </div>
  );
}
function NoteForm({
  setNoteTitle,
  noteTitle,
  noteContent,
  setNoteContent,
  selectedNote,
  handleAddNote,
  handleSaveChanges,
}) {
  return (
    <div className="flex gap-5 flex-col items-center py-5 shadow-lg w-full h-[250px] bg-white rounded">
      <div className="flex flex-col gap-1">
        <input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          // {...register("username", { required: true })}
          id="title"
          type="text"
          placeholder="title"
          className="border outline-none border-gray-400 w-[200px] rounded text-xs py-2 px-2"
        />
        {/* {errors.username && (
                  <p className="text-xs text-red-500">username is required</p>
                )} */}
      </div>

      <textarea
        // {...register("username")}
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        name=""
        id="note"
        placeholder="note"
        className="border outline-none border-gray-400 w-[200px] rounded text-xs py-2 px-2 text-wrap h-[100px]"
      ></textarea>

      {!selectedNote ? (
        <button
          onClick={handleAddNote}
          className="bg-amber-300 text-xs rounded shadow-lg cursor-pointer w-[83%] mt-2 px-4 py-2"
        >
          add note
        </button>
      ) : (
        <button
          onClick={handleSaveChanges}
          className="bg-amber-300 text-xs rounded shadow-lg cursor-pointer w-[83%] mt-2 px-4 py-2"
        >
          save changes
        </button>
      )}
    </div>
  );
}
