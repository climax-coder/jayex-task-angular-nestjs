import { Component } from '@angular/core';
import { List } from './models/list.model';
import { ListService } from './services/list.service';
import { generateRandomColor, generateStaticRandomColor } from './utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from './components/ticket-dialog/ticket-dialog.component';
import { TicketService } from './services/ticket.service';
import { Ticket } from './models/ticket.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Kanban board';
  lists: List[] = [];
  colors: string[] = [];
  tickets: Ticket[] = [];

  constructor(
    private ticketService: TicketService,
    private listService: ListService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listService.getAllLists().subscribe((lists) => {
      this.lists = lists.sort((a, b) => a.order - b.order);
      this.generateColors(this.lists.length);
    });
    this.getAllTickets();
  }

  getAllTickets() {
    this.ticketService
      .getAllTickets()
      .subscribe((tickets) => (this.tickets = tickets));
  }

  generateColors(count: number) {
    for (let i = 0; i < count; i++) {
      // this.colors.push(generateRandomColor());
      this.colors.push(generateStaticRandomColor(i));
    }
  }

  getTickets(id: string) {
    return this.tickets.filter((ticket) => ticket.list._id === id);
  }

  getConnectedListIds(currentListId: string): string[] {
    return this.lists
      .filter((list) => list._id !== currentListId)
      .map((list) => list._id);
  }

  handleTicketDeleted(deletedTicket: Ticket) {
    const index = this.tickets.findIndex(
      (ticket) => ticket._id === deletedTicket._id
    );
    if (index !== -1) {
      this.tickets.splice(index, 1);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllTickets();
      console.log('The dialog was closed');
    });
  }
}
