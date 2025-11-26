
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Placement {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-placements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Job Placements Management</h1>
      
      <div class="form-card">
        <h2>{{ editMode ? 'Edit Placement' : 'Add New Placement' }}</h2>
        <form (ngSubmit)="addPlacement()">
          <div class="form-group">
            <label>Student Name</label>
            <input 
              type="text" 
              [(ngModel)]="currentPlacement.name" 
              name="name" 
              class="form-control"
              placeholder="Enter student name"
              required>
          </div>
          
          <div class="form-group">
            <label>Upload Student Photo</label>
            <input 
              type="file" 
              (change)="onImageSelected($event)" 
              accept="image/*"
              class="form-control">
            @if (selectedImagePreview) {
              <div class="file-preview">
                <img [src]="selectedImagePreview" alt="Student preview" class="preview-img">
              </div>
            }
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Update Placement' : 'Add Placement' }}
            </button>
            @if (editMode) {
              <button type="button" class="btn-secondary" (click)="cancelEdit()">
                Cancel
              </button>
            }
          </div>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Placements List</h2>
        <div class="placements-grid">
          @for (placement of placements; track placement.id) {
            <div class="placement-item">
              <div class="placement-image">
                <img [src]="placement.image" [alt]="placement.name">
              </div>
              <h3>{{ placement.name }}</h3>
              <div class="placement-actions">
                <button class="btn-edit" (click)="editPlacement(placement)">Edit</button>
                <button class="btn-delete" (click)="deletePlacement(placement.id)">Delete</button>
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

    .file-preview {
      margin-top: 12px;
      text-align: center;
    }

    .preview-img {
      max-width: 220px;
      max-height: 220px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border: 8px solid transparent;
      background: linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(135deg, #d4af6a 0%, #c9a85c 50%, #e8d5a3 100%) border-box;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .btn-primary, .btn-secondary {
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #fff;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 106, 0.4);
    }

    .btn-secondary {
      background: #6c757d;
      color: #fff;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    .placements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 30px;
    }

    .placement-item {
      background: #f9f9f9;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      border: 1px solid #eee;
      transition: transform 0.3s;
    }

    .placement-item:hover {
      transform: translateY(-5px);
    }

    .placement-image {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 20px;
      border: 8px solid transparent;
      background: linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(135deg, #d4af6a 0%, #c9a85c 50%, #e8d5a3 100%) border-box;
    }

    .placement-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .placement-item h3 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 1.1rem;
    }

    .placement-actions {
      display: flex;
      gap: 12px;
    }

    .btn-edit, .btn-delete {
      flex: 1;
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

    .btn-edit:hover {
      background: #45a049;
    }

    .btn-delete {
      background: #f44336;
      color: #fff;
    }

    .btn-delete:hover {
      background: #da190b;
    }
  `]
})
export class PlacementsComponent {
  editMode = false;
  selectedImagePreview: string | null = null;

  currentPlacement: Placement = {
    id: 0,
    name: '',
    image: ''
  };

  placements: Placement[] = [
    { 
      id: 1,
      name: 'Rahul Jadhav', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' 
    },
    { 
      id: 2,
      name: 'Shakir Ali', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' 
    },
    { 
      id: 3,
      name: 'Tisha Verma', 
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' 
    }
  ];

  onImageSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
        this.currentPlacement.image = e.target.result;
      };
      
      reader.readAsDataURL(file);
    }
  }

  addPlacement() {
    if (this.editMode) {
      const index = this.placements.findIndex(p => p.id === this.currentPlacement.id);
      if (index !== -1) {
        this.placements[index] = { ...this.currentPlacement };
        alert('Placement updated successfully!');
      }
    } else {
      const newPlacement = {
        ...this.currentPlacement,
        id: this.placements.length > 0 ? Math.max(...this.placements.map(p => p.id)) + 1 : 1
      };
      this.placements.push(newPlacement);
      alert('Placement added successfully!');
    }
    this.resetForm();
  }

  editPlacement(placement: Placement) {
    this.editMode = true;
    this.currentPlacement = { ...placement };
    this.selectedImagePreview = placement.image;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deletePlacement(id: number) {
    if (confirm('Are you sure you want to delete this placement?')) {
      this.placements = this.placements.filter(p => p.id !== id);
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.currentPlacement = {
      id: 0,
      name: '',
      image: ''
    };
    this.selectedImagePreview = null;
  }
}
