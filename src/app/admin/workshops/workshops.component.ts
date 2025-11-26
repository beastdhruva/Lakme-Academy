
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Workshops Management</h1>
      
      <div class="form-card">
        <h2>Add New Workshop</h2>
        <form (ngSubmit)="addWorkshop()">
          <div class="form-group">
            <label>Workshop Title</label>
            <input type="text" [(ngModel)]="newWorkshop.title" name="title" class="form-control">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Instructor</label>
              <input type="text" [(ngModel)]="newWorkshop.instructor" name="instructor" class="form-control">
            </div>
            
            <div class="form-group">
              <label>Duration</label>
              <input type="text" [(ngModel)]="newWorkshop.duration" name="duration" class="form-control" placeholder="e.g., 2 days">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Date</label>
              <input type="date" [(ngModel)]="newWorkshop.date" name="date" class="form-control">
            </div>
            
            <div class="form-group">
              <label>Fee</label>
              <input type="text" [(ngModel)]="newWorkshop.fee" name="fee" class="form-control">
            </div>
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="newWorkshop.description" name="description" rows="4" class="form-control"></textarea>
          </div>
          
          <button type="submit" class="btn-primary">Add Workshop</button>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Scheduled Workshops</h2>
        <div class="workshops-list">
          @for (workshop of workshops; track workshop.id) {
            <div class="workshop-item">
              <div class="workshop-info">
                <h3>{{ workshop.title }}</h3>
                <p class="workshop-meta">👨‍🏫 {{ workshop.instructor }} | ⏱️ {{ workshop.duration }} | 💰 {{ workshop.fee }}</p>
                <p class="workshop-date">📅 {{ workshop.date }}</p>
              </div>
              <div class="workshop-actions">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete" (click)="deleteWorkshop(workshop.id)">Delete</button>
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

    .workshops-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .workshop-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #eee;
    }

    .workshop-info h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .workshop-meta, .workshop-date {
      margin: 4px 0;
      color: #666;
      font-size: 0.9rem;
    }

    .workshop-actions {
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
export class WorkshopsComponent {
  newWorkshop = {
    title: '',
    instructor: '',
    duration: '',
    date: '',
    fee: '',
    description: ''
  };

  workshops = [
    { 
      id: 1, 
      title: 'Advanced Makeup Techniques', 
      instructor: 'Priya Sharma',
      duration: '3 days',
      date: '2024-04-10',
      fee: '₹15,000'
    }
  ];

  addWorkshop() {
    console.log('Adding workshop:', this.newWorkshop);
    alert('Workshop added successfully!');
    this.newWorkshop = {
      title: '',
      instructor: '',
      duration: '',
      date: '',
      fee: '',
      description: ''
    };
  }

  deleteWorkshop(id: number) {
    if (confirm('Are you sure you want to delete this workshop?')) {
      this.workshops = this.workshops.filter(w => w.id !== id);
    }
  }
}
