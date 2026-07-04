import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

