import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const existingTicket = await this.ticketModel
      .findOne({ title: createTicketDto.title })
      .exec();

    if (existingTicket) {
      throw new BadRequestException('A ticket with this title already exists');
    }

    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  async findAllTickets(): Promise<Ticket[]> {
    return this.ticketModel.find().populate('list tags').exec();
  }

  async findTicketById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    const existingTicket = await this.ticketModel.findById(id).exec();

    if (!existingTicket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }

    const updatedTicket = await this.ticketModel
      .findByIdAndUpdate(id, updateTicketDto, { new: true })
      .exec();
    return updatedTicket;
  }

  async removeTicket(id: string): Promise<Ticket> {
    const existingTicket = await this.ticketModel.findById(id).exec();

    if (!existingTicket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }

    const deletedTicket = await this.ticketModel.findByIdAndRemove(id).exec();
    return deletedTicket;
  }
}
