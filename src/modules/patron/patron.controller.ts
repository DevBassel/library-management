import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { PatronService } from './patron.service';
import { CreatePatronDto } from './dto/create-patron.dto';
import { UpdatePatronDto } from './dto/update-patron.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/decorator/enums/role.enum';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Patron')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@UseInterceptors(CacheInterceptor)
@Controller('patron')
export class PatronController {
  constructor(private readonly patronService: PatronService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createPatronDto: CreatePatronDto) {
    return this.patronService.create(createPatronDto);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.patronService.findAll(page, limit);
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patronService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatronDto: UpdatePatronDto) {
    return this.patronService.update(+id, updatePatronDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patronService.remove(+id);
  }
}
