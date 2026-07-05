import axios from "axios";
import type { Note, NoteTag } from "../types/note";

// Base config
const BASE_URL = "https://notehub-public.goit.study/api/notes";

// The token from swagger is read from .env (VITE_NOTEHUB_TOKEN)
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN as string;

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;

// fetchNotes (performing request for getting notes collection from the server, should support pagination (vie page param) & filtering by search word)
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

// interface describing response for http-requests (GET / acc to Swagger)
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;

  const response = await axios.get<FetchNotesResponse>("", {
    params: {
      page,
      perPage,
      // Only sending "search" when user actually typed something
      ...(search.trim() !== "" && { search: search.trim() }),
    },
  });

  return response.data;
};

// createNote (performing request for creating a new note on the server; receives content of a new note and returns created note in response)
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const response = await axios.post<Note>("", payload);
  return response.data;
};

// deleteNote (performing request for deleting a note by given id; takes id of the note and returns information re. deleted note)

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/${noteId}`);
  return response.data;
};

// the code performs typed query to https://notehub-public.goit.study/api/notes
// fetchNotes receives page, perPage, search and returns {notes, totalPages}
// taken will be added via axios.defaults.headers.common.Authorization 