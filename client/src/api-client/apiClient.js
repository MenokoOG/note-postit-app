
import axios from 'axios'

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token} `
  return config
})

export function signup(credentials) {
  return axios.post('/api/auth/signup/', credentials)
}

export function login(credentials) {
  return axios.post('/api/auth/login', credentials)
}

export function addNote(newNote) {
  return userAxios.post('/api/main/note/', newNote)
}

export function getAllNotes() {
  return userAxios.get('/api/main/note/user')
}

export function deleteNote(noteId) {
  return userAxios.delete(`/api/main/note/${noteId}`)
}

export function updateNote(noteId, update) {
  return userAxios.put(`/api/main/note/${noteId}`, update)
}
