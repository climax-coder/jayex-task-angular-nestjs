import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { List } from 'src/app/models/list.model';
import { Ticket } from 'src/app/models/ticket.model';
import { ListService } from 'src/app/services/list.service';
import { TicketService } from 'src/app/services/ticket.service';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.scss'],
})
export class LaneComponent {
  @Input() list!: List;
  @Input() color!: string;
  @Input() connectedTo: string[] = [];
  @Input() tickets: Ticket[] = [];
  @Input() isLastLane!: boolean;
  @Output() ticketDeleted = new EventEmitter<Ticket>();

  constructor(
    private ticketService: TicketService,
    private listService: ListService
  ) {}

  drop(event: CdkDragDrop<Ticket[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
    } else {
      const movingTicket: Ticket = event.item.data;

      this.listService
        .getListById(event.container.id)
        .pipe(
          switchMap((newList: List) => {
            movingTicket.list = newList;
            return this.ticketService.updateTicket(movingTicket);
          }),
          catchError((error) => {
            console.error('Could not update ticket:', error);
            transferArrayItem(
              this.tickets,
              event.previousContainer.data,
              event.currentIndex,
              event.previousIndex
            );
            return of(null);
          })
        )
        .subscribe();
    }
  }
}
