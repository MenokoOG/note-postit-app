import React, { useState, createContext } from 'react';
import { signup, login, addNote, getAllNotes, deleteNote, updateNote } from '../api-client/apiClient';

export const UserContext = createContext();

export default function UserProvider(props) {
  // STATE
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    notes: [],
    errMssg: ''
  };

  const [userState, setUserState] = useState(initState);

  // SIGNUP
  function handleSignup(credentials) {
    signup(credentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        handleGetAllNotes();
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }));
      })
      .catch(err => handleAuthErr(err.response.data.errMssg));
  }

  // LOGIN
  function handleLogin(credentials) {
    login(credentials)
      .then(res => {
        const { user, token } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        handleGetAllNotes();
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }));
      })
      .catch(err => handleAuthErr(err.response.data.errMssg));
  }

  // LOGOUT
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState({
      user: {},
      token: '',
      notes: []
    });
  }

  // CREATE NEW NOTE
  function handleAddNote(newNote) {
    addNote(newNote)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          notes: Array.isArray(prevState.notes) ? [...prevState.notes, res.data] : [res.data]
        }));
      })
      .catch(err => console.log(err));
  }

  // GET ALL NOTES
  function handleGetAllNotes() {
    getAllNotes()
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          notes: Array.isArray(res.data) ? res.data : []
        }));
      })
      .catch(err => console.log(err));
  }

  // DELETE NOTE
  function handleDeleteNote(noteId) {
    deleteNote(noteId)
      .then(() => {
        setUserState(prevState => ({
          ...prevState,
          notes: Array.isArray(prevState.notes) ? prevState.notes.filter(note => note._id !== noteId) : []
        }));
      })
      .catch(err => console.log(err));
  }

  // EDIT NOTE
  function handleUpdateNote(noteId, update) {
    updateNote(noteId, update)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          notes: Array.isArray(prevState.notes) ? prevState.notes.map(note => noteId === note._id ? res.data : note) : [res.data]
        }));
      })
      .catch(err => console.log(err));
  }

  // HANDLE AUTH ERR
  function handleAuthErr(errMssg) {
    setUserState(prevState => ({
      ...prevState,
      errMssg
    }));
  }

  // RESET ERR
  function resetAuthErr() {
    setUserState(prevState => ({
      ...prevState,
      errMssg: ''
    }));
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup: handleSignup,
        login: handleLogin,
        logout,
        handleAuthErr,
        resetAuthErr,
        addNote: handleAddNote,
        getAllNotes: handleGetAllNotes,
        deleteNote: handleDeleteNote,
        updateNote: handleUpdateNote
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
