import { Module } from '@nestjs/common';
import { PatronService } from './patron.service';
import { PatronController } from './patron.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patron } from './entities/patron.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patron])],
  controllers: [PatronController],
  providers: [PatronService],
})
export class PatronModule {}
