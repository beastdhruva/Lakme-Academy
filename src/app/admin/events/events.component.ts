

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface EventItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

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
            <input type="text" [(ngModel)]="newEvent.title" name="title" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="newEvent.description" name="description" rows="4" class="form-control" required></textarea>
          </div>
          
          <div class="form-group">
            <label>Upload Event Image</label>
            <input 
              type="file" 
              (change)="onImageSelected($event)" 
              accept="image/*"
              class="form-control"
              #imageInput>
            <small>Select an image file (JPG, PNG, GIF, etc.)</small>
            @if (selectedImagePreview) {
              <div class="image-preview">
                <img [src]="selectedImagePreview" alt="Preview">
                <button type="button" class="btn-remove" (click)="removeImage(imageInput)">Remove</button>
              </div>
            }
          </div>
          
          <button type="submit" class="btn-primary" [disabled]="!newEvent.title || !newEvent.description || !selectedImagePreview">Add Event</button>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Upcoming Events</h2>
        <div class="events-list">
          @for (event of events; track event.id) {
            <div class="event-item">
              <img [src]="event.image" alt="{{ event.title }}" class="event-image">
              <div class="event-info">
                <h3>{{ event.title }}</h3>
                <p class="event-desc">{{ event.description }}</p>
              </div>
              <div class="event-actions">
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

    small {
      color: #666;
      font-size: 0.85rem;
      display: block;
      margin-top: 5px;
    }

    .image-preview {
      margin-top: 15px;
      position: relative;
      display: inline-block;
    }

    .image-preview img {
      max-width: 300px;
      max-height: 200px;
      border-radius: 8px;
      border: 2px solid #ddd;
      display: block;
    }

    .btn-remove {
      margin-top: 10px;
      padding: 6px 12px;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
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

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .event-item {
      display: flex;
      gap: 20px;
      align-items: flex-start;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #eee;
    }

    .event-image {
      width: 150px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .event-info {
      flex: 1;
    }

    .event-info h3 {
      margin: 0 0 12px 0;
      color: #333;
    }

    .event-desc {
      margin: 0;
      color: #555;
      line-height: 1.5;
    }

    .event-actions {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }

    .btn-delete {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      background: #f44336;
      color: #fff;
    }
  `]
})
export class EventsComponent {
  newEvent = {
    title: '',
    description: ''
  };

  selectedImagePreview: string | null = null;
  selectedImageData: string | null = null;

  events: EventItem[] = [
    {
      id: 1,
      title: 'Fashion Week 2024',
      description: 'Annual fashion week event with top designers showcasing their latest collections.',
      image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&h=400&fit=crop'
    }
  ];

  onImageSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImagePreview = e.target?.result as string;
        this.selectedImageData = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  removeImage(input: HTMLInputElement) {
    this.selectedImagePreview = null;
    this.selectedImageData = null;
    input.value = '';
  }

  addEvent() {
    if (this.selectedImageData && this.newEvent.title && this.newEvent.description) {
      const newId = this.events.length > 0
        ? Math.max(...this.events.map(e => e.id)) + 1
        : 1;

      this.events.push({
        id: newId,
        title: this.newEvent.title,
        description: this.newEvent.description,
        image: this.selectedImageData
      });

      console.log('Event added successfully');
      alert('Event added successfully!');

      this.newEvent = {
        title: '',
        description: ''
      };
      this.selectedImagePreview = null;
      this.selectedImageData = null;
    }
  }

  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter(e => e.id !== id);
      console.log('Event deleted:', id);
    }
  }
}
