import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { DB_CONNECTION } from '../db/database.provider';
import * as schema from '../db/schema';
import type { CreateNoteDto, Note, UpdateNoteDto } from './note.dto';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);

  constructor(@Inject(DB_CONNECTION) private readonly db: NodePgDatabase<typeof schema>) {}

  async findAll(): Promise<Note[]> {
    return await this.db.select().from(schema.notes);
  }

  async findById(id: string): Promise<Note> {
    const note = await this.db
      .select()
      .from(schema.notes)
      .where(eq(schema.notes.id, id))
      .then((res) => res[0]);

    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  async create(dto: CreateNoteDto): Promise<Note> {
    const newNote = await this.db
      .insert(schema.notes)
      .values({
        title: dto.title,
        content: dto.content,
      })
      .returning()
      .then((res) => res[0]);

    this.logger.log(`Created new note with id: ${newNote.id}`);
    return newNote;
  }

  async update(id: string, dto: UpdateNoteDto): Promise<Note> {
    if (Object.keys(dto).length === 0) {
      return this.findById(id);
    }

    const updatedNote = await this.db
      .update(schema.notes)
      .set(dto)
      .where(eq(schema.notes.id, id))
      .returning()
      .then((res) => res[0]);

    if (!updatedNote) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    this.logger.log(`Updated note with id: ${id}`);
    return updatedNote;
  }

  async delete(id: string): Promise<void> {
    const deletedNote = await this.db
      .delete(schema.notes)
      .where(eq(schema.notes.id, id))
      .returning()
      .then((res) => res[0]);

    if (!deletedNote) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    this.logger.log(`Deleted note with id: ${id}`);
  }
}
