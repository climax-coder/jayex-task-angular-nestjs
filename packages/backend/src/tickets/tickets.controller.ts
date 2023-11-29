import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get()
  findAllTickets() {
    return this.ticketsService.findAllTickets();
  }

  @Get(':id')
  findTicketById(@Param('id') id: string) {
    return this.ticketsService.findTicketById(id);
  }

  @Put(':id')
  updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  removeTicket(@Param('id') id: string) {
    return this.ticketsService.removeTicket(id);
  }
}
