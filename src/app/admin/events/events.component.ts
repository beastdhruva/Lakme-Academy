
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Events Management</h1>
      
      <div class="form-card">
        <h2>Add New Event</h2>
        <form (ngSubmit)="addEvent()">
          <div class="form-group">
            <label>Event Title</label>
            <input type="text" [(ngModel)]="newEvent.title" name="title" class="form-control">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Date</label>
              <input type="date" [(ngModel)]="newEvent.date" name="date" class="form-control">
            </div>
            
            <div class="form-group">
              <label>Location</label>
              <input type="text" [(ngModel)]="newEvent.location" name="location" class="form-control">
            </div>
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="newEvent.description" name="description" rows="4" class="form-control"></textarea>
          </div>
          
          <div class="form-group">
            <label>Event Image URL</label>
            <input type="text" [(ngModel)]="newEvent.image" name="image" class="form-control">
          </div>
          
          <button type="submit" class="btn-primary">Add Event</button>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Upcoming Events</h2>
        <div class="events-list">
          @for (event of events; track event.id) {
            <div class="event-item">
              <div class="event-info">
                <h3>{{ event.title }}</h3>
                <p class="event-meta">📅 {{ event.date }} | 📍 {{ event.location }}</p>
                <p class="event-desc">{{ event.description }}</p>
              </div>
              <div class="event-actions">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete" (click)="deleteEvent(event.id)">Delete</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      max-width: 1200px;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 30px;
    }

    .form-card {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h2 {
      margin-top: 0;
      color: #333;
      margin-bottom: 24px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #d4af6a;
    }

    textarea.form-control {
      resize: vertical;
    }

    .btn-primary {
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #fff;
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .event-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #eee;
    }

    .event-info {
      flex: 1;
    }

    .event-info h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .event-meta {
      margin: 0 0 12px 0;
      color: #666;
      font-size: 0.9rem;
    }

    .event-desc {
      margin: 0;
      color: #555;
      line-height: 1.5;
    }

    .event-actions {
      display: flex;
      gap: 12px;
    }

    .btn-edit, .btn-delete {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-edit {
      background: #4CAF50;
      color: #fff;
    }

    .btn-delete {
      background: #f44336;
      color: #fff;
    }
  `]
})
export class EventsComponent {
  newEvent = {
    title: '',
    date: '',
    location: '',
    description: '',
    image: ''
  };

  events = [
    { 
      id: 1, 
      title: 'Fashion Week 2024', 
      date: '2024-03-15', 
      location: 'Mumbai',
      description: 'Annual fashion week event with top designers'
    }
  ];

  addEvent() {
    console.log('Adding event:', this.newEvent);
    alert('Event added successfully!');
    this.newEvent = {
      title: '',
      date: '',
      location: '',
      description: '',
      image: ''
    };
  }

  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(e => e.id !== id);
    }
  }
}
