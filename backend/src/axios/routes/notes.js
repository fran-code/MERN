import { Router } from 'express';
import { getNotes, createNote, getNote, deleteNote, updateNote, getNotesUser } from '../controllers/notes.controller';

const router = Router();

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .get(getNote)
    .delete(deleteNote)
    .put(updateNote)
    .post(getNotesUser);

export default router;


