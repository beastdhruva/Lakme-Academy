
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Awards Management</h1>
      
      <div class="form-card">
        <h2>Add New Award</h2>
        <form (ngSubmit)="addAward()">
          <div class="form-group">
            <label>Award Title</label>
            <input type="text" [(ngModel)]="newAward.title" name="title" class="form-control">
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Year</label>
              <input type="text" [(ngModel)]="newAward.year" name="year" class="form-control">
            </div>
            
            <div class="form-group">
              <label>Category</label>
              <input type="text" [(ngModel)]="newAward.category" name="category" class="form-control">
            </div>
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="newAward.description" name="description" rows="4" class="form-control"></textarea>
          </div>
          
          <div class="form-group">
            <label>Award Image URL</label>
            <input type="text" [(ngModel)]="newAward.image" name="image" class="form-control">
          </div>
          
          <button type="submit" class="btn-primary">Add Award</button>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Awards & Achievements</h2>
        <div class="awards-grid">
          @for (award of awards; track award.id) {
            <div class="award-item">
              <div class="award-header">
                <h3>{{ award.title }}</h3>
                <span class="award-year">{{ award.year }}</span>
              </div>
              <p class="award-category">{{ award.category }}</p>
              <p class="award-description">{{ award.description }}</p>
              <div class="award-actions">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete" (click)="deleteAward(award.id)">Delete</button>
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

    .awards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .award-item {
      padding: 24px;
      background: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #eee;
    }

    .award-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .award-header h3 {
      margin: 0;
      color: #333;
      font-size: 1.1rem;
    }

    .award-year {
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #fff;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .award-category {
      margin: 0 0 12px 0;
      color: #666;
      font-weight: 600;
    }

    .award-description {
      margin: 0 0 16px 0;
      color: #555;
      line-height: 1.5;
    }

    .award-actions {
      display: flex;
      gap: 12px;
    }

    .btn-edit, .btn-delete {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
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
export class AwardsComponent {
  newAward = {
    title: '',
    year: '',
    category: '',
    description: '',
    image: ''
  };

  awards = [
    { 
      id: 1, 
      title: 'Best Beauty Academy', 
      year: '2023',
      category: 'Excellence in Education',
      description: 'Awarded for outstanding contribution to beauty education'
    },
    { 
      id: 2, 
      title: 'Top Training Institute', 
      year: '2022',
      category: 'Industry Recognition',
      description: 'Recognized as the leading training institute in Mumbai'
    }
  ];

  addAward() {
    console.log('Adding award:', this.newAward);
    alert('Award added successfully!');
    this.newAward = {
      title: '',
      year: '',
      category: '',
      description: '',
      image: ''
    };
  }

  deleteAward(id: number) {
    if (confirm('Are you sure you want to delete this award?')) {
      this.awards = this.awards.filter(a => a.id !== id);
    }
  }
}
