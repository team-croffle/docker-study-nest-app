import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateNoteDto, Note, UpdateNoteDto } from './note.dto';

@Injectable()
export class NotesService {
  private readonly notes: Note[] = [];
  private idCounter = 1;

  findAll(): Note[] {
    return this.notes;
  }

  findById(id: number): Note {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  create(dto: CreateNoteDto): Note {
    const newNote: Note = {
      id: this.idCounter++,
      title: dto.title,
      content: dto.content,
      createdAt: new Date(),
    };

    this.notes.push(newNote);
    return newNote;
  }

  update(id: number, dto: UpdateNoteDto): Note {
    const note = this.notes.find((n) => n.id === id);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    if (dto.title !== undefined) {
      note.title = dto.title;
    }
    if (dto.content !== undefined) {
      note.content = dto.content;
    }
    return note;
  }

  delete(id: number): void {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index === -1) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    this.notes.splice(index, 1);
  }
}
