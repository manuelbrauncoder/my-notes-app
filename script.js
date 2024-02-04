let notes = [];
let trash = [];
let archive = [];

loadFromLocalStorage();

let indexToEdit;

function init() {
    renderNotes();
    renderTrash();
    renderArchive();
}

function showContainer(id) {
    document.getElementById(id).style = '';
}

function hideContainer(id) {
    document.getElementById(id).style = 'display: none';
}

function renderNotes() {
    let notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    if (notes.length == 0) {
        notesContainer.innerHTML += printEmptyNotes();
    } else {
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            notesContainer.innerHTML += printNotes(note, i);
        }
    }
}

function renderTrash() {
    let trashContainer = document.getElementById('trashContainer');
    trashContainer.innerHTML = '';
    if (trash.length == 0) {
        trashContainer.innerHTML += printEmptyTrash();
    } else {
        for (let i = 0; i < trash.length; i++) {
            const trashNote = trash[i];
            trashContainer.innerHTML += printTrash(trashNote, i);
        }
    }
}

function renderArchive() {
    let archiveContainer = document.getElementById('archiveContainer');
    archiveContainer.innerHTML = '';
    if (archive.length == 0) {
        archiveContainer.innerHTML += printEmptyArchive();
    } else {
        for (let i = 0; i < archive.length; i++) {
            const archiveNote = archive[i];
            archiveContainer.innerHTML += printArchive(archiveNote, i);
        }
    }
}

function addNote() {
    let title = document.getElementById('noteTitle');
    let text = document.getElementById('noteText');
    let date = getFormattedDate();
    let time = getFormattedTime();
    let newNote =
    {
        "title": title.value,
        "text": text.value,
        "date": date,
        "time": time
    }
    notes.push(newNote);
    saveToLocalStorage();
    renderNotes();
    hideContainer('addNote');
    hideContainer('containerBg');
    title.value = '';
    text.value = '';
}

function getFormattedDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let formattedDay = day < 10 ? '0' + day : day;
    let formattedMonth = month < 10 ? '0' + month : month;
    let formattedDate = formattedDay + '.' + formattedMonth + '.' + year;
    return formattedDate;
}

function getFormattedTime() {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    let formattedTime = hours + ':' + minutes + ':' + seconds;
    return formattedTime;
}

function moveToContainer(index, toContainer, fromContainer) {
    toContainer.push(fromContainer[index]);
    fromContainer.splice(index, 1);
    init();
    saveToLocalStorage();
}

function restoreFromContainer(index, toContainer, fromContainer) {
    toContainer.push(fromContainer[index]);
    fromContainer.splice(index, 1);
    init();
    saveToLocalStorage();
}

function editNote(index) {
    let noteTitleToEdit = notes[index].title;
    let noteTextToEdit = notes[index].text;
    document.getElementById('editTitle').value = noteTitleToEdit;
    document.getElementById('editText').value = noteTextToEdit;
    showContainer('edit');
    showContainer('containerBg');
    indexToEdit = index;
}

function saveEditNote() {
    let newTitle = document.getElementById('editTitle');
    let newText = document.getElementById('editText');
    let date = getFormattedDate();
    let time = getFormattedTime();
    let newNote =
    {
        "title": newTitle.value,
        "text": newText.value,
        "date": date,
        "time": time
    }
    notes.splice(indexToEdit, 1, newNote);
    saveToLocalStorage();
    init();
    hideContainer('edit');
    hideContainer('containerBg');
}

function deleteAllTrashNotes() {
    const confirmText = 'Alle Notizen permanent löschen?';
    if (confirm(confirmText) == true) {
        trash = [];
        init();
    }
    saveToLocalStorage();

}

function saveToLocalStorage() {
    let notesJSON = JSON.stringify(notes);
    let trashJSON = JSON.stringify(trash);
    let archiveJSON = JSON.stringify(archive);
    localStorage.setItem('notes', notesJSON);
    localStorage.setItem('trash', trashJSON);
    localStorage.setItem('archive', archiveJSON);
}

function loadFromLocalStorage() {
    let storedNotes = localStorage.getItem('notes');
    let storedTrash = localStorage.getItem('trash');
    let storedArchive = localStorage.getItem('archive');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
        trash = JSON.parse(storedTrash);
        archive = JSON.parse(storedArchive);
    }
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
