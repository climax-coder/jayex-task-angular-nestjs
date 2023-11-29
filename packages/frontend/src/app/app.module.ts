import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { LaneComponent } from './components/lane/lane.component';
import { TicketDialogComponent } from './components/ticket-dialog/ticket-dialog.component';
import { TicketService } from './services/ticket.service';
import { ListService } from './services/list.service';
import { TagService } from './services/tag.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LaneComponent,
    TicketComponent,
    TicketDialogComponent,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  providers: [TicketService, ListService, TagService],
  bootstrap: [AppComponent],
})
export class AppModule {}
