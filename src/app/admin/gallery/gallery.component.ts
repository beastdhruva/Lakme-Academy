
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Gallery Management</h1>
      
      <div class="form-card">
        <h2>Add New Image</h2>
        <form (ngSubmit)="addImage()">
          <div class="form-group">
            <label>Image URL</label>
            <input type="text" [(ngModel)]="newImage.url" name="url" class="form-control">
          </div>
          
          <div class="form-group">
            <label>Image Title</label>
            <input type="text" [(ngModel)]="newImage.title" name="title" class="form-control">
          </div>
          
          <div class="form-group">
            <label>Category</label>
            <select [(ngModel)]="newImage.category" name="category" class="form-control">
              <option value="makeup">Makeup</option>
              <option value="hair">Hair Styling</option>
              <option value="events">Events</option>
              <option value="students">Students</option>
            </select>
          </div>
          
          <button type="submit" class="btn-primary">Add Image</button>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Gallery Images</h2>
        <div class="gallery-grid">
          @for (image of galleryImages; track image.id) {
            <div class="gallery-item">
              <img [src]="image.url" [alt]="image.title">
              <div class="gallery-overlay">
                <p>{{ image.title }}</p>
                <button class="btn-delete" (click)="deleteImage(image.id)">Delete</button>
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

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    .gallery-item {
      position: relative;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .gallery-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.8);
      padding: 12px;
      transform: translateY(100%);
      transition: transform 0.3s;
    }

    .gallery-item:hover .gallery-overlay {
      transform: translateY(0);
    }

    .gallery-overlay p {
      color: #fff;
      margin: 0 0 8px 0;
      font-size: 0.9rem;
    }

    .btn-delete {
      padding: 6px 12px;
      background: #f44336;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
    }
  `]
})
export class GalleryComponent {
  newImage = {
    url: '',
    title: '',
    category: 'makeup'
  };

  galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400', title: 'Makeup Work', category: 'makeup' },
    { id: 2, url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', title: 'Hair Styling', category: 'hair' }
  ];

  addImage() {
    console.log('Adding image:', this.newImage);
    alert('Image added successfully!');
    this.newImage = {
      url: '',
      title: '',
      category: 'makeup'
    };
  }

  deleteImage(id: number) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.galleryImages = this.galleryImages.filter(img => img.id !== id);
    }
  }
}
