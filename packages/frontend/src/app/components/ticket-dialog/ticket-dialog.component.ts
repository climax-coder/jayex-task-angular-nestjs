import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../../services/tag.service';
import { ListService } from '../../services/list.service';
import { TicketService } from '../../services/ticket.service';
import { Tag } from 'src/app/models/tag.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-ticket-dialog',
  styleUrls: ['./ticket-dialog.component.scss'],
  templateUrl: './ticket-dialog.component.html',
})
export class TicketDialogComponent {
  ticketForm: FormGroup;
  allTags: Tag[] = [];
  list!: List;
  minStartDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<TicketDialogComponent>,
    private tagService: TagService,
    private listService: ListService,
    private ticketService: TicketService,
    private formBuilder: FormBuilder
  ) {
    this.ticketForm = this.formBuilder.group({
      title: ['', Validators.required],
      tags: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.tagService.getAllTags().subscribe((tags) => {
      this.allTags = tags;
    });
    this.listService.getLowestOrderList().subscribe((list) => {
      this.list = list;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTicket(): void {
    if (this.ticketForm.valid) {
      this.ticketService
        .addTicket({ ...this.ticketForm.value, list: this.list })
        .subscribe(() => {
          this.dialogRef.close();
        });
    } else {
      console.log('Form is not valid');
      this.ticketForm.markAllAsTouched();
    }
  }
}
