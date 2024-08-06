import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from 'src/decorator/enums/role.enum';
import { Roles } from 'src/decorator/role.decorator';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Borrowing')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@UseInterceptors(CacheInterceptor)
@Controller('borrow')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Roles(Role.ADMIN)
  @Post(':bookId/patron/:patronId')
  create(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('patronId', ParseIntPipe) patronId: number,
    @Body() payload: CreateBorrowingDto,
  ) {
    return this.borrowingService.create(bookId, patronId, payload);
  }

  @Roles(Role.ADMIN)
  @Put(':bookId/patron/:patronId')
  update(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('patronId', ParseIntPipe) patronId: number,
  ) {
    return this.borrowingService.update(bookId, patronId);
  }
}
