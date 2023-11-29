import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
  @Input() ticket!: Ticket;
  @Input() color!: string;
  @Input() isLastLane!: boolean;
  @Output() ticketDeleted = new EventEmitter<Ticket>();

  constructor(private ticketService: TicketService) {}

  getRemainingTags(tags: Tag[]) {
    return tags
      .slice(2)
      .map((tag) => tag.name)
      .join(', ');
  }

  removeTicket(currentTicket: Ticket) {
    this.ticketService.deleteTicket(currentTicket).subscribe(() => {
      this.ticketDeleted.emit(currentTicket);
    });
  }
}
