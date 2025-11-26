
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
        <h2>Upload New Image</h2>
        <form (ngSubmit)="addImage()">
          <div class="form-group">
            <label>Upload Image</label>
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
          
          <button type="submit" class="btn-primary" [disabled]="!selectedImagePreview">Upload Image</button>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Gallery Images</h2>
        <div class="gallery-grid">
          @for (image of galleryImages; track image.id) {
            <div class="gallery-item">
              <img [src]="image.url" alt="Gallery Image">
              <div class="gallery-overlay">
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

    small {
      display: block;
      margin-top: 5px;
      color: #666;
      font-size: 0.85rem;
    }

    .image-preview {
      margin-top: 15px;
      position: relative;
      display: inline-block;
    }

    .image-preview img {
      max-width: 300px;
      max-height: 300px;
      border-radius: 8px;
      border: 2px solid #ddd;
    }

    .btn-remove {
      margin-top: 10px;
      padding: 8px 16px;
      background: #f44336;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      display: block;
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
      margin-top: 10px;
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
      display: flex;
      justify-content: center;
    }

    .gallery-item:hover .gallery-overlay {
      transform: translateY(0);
    }

    .btn-delete {
      padding: 8px 16px;
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
  selectedImagePreview: string | null = null;
  selectedImageData: string | null = null;

  galleryImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400' },
    { id: 2, url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400' }
  ];

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
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

  addImage() {
    if (this.selectedImageData) {
      const newId = this.galleryImages.length > 0 
        ? Math.max(...this.galleryImages.map(img => img.id)) + 1 
        : 1;
      
      this.galleryImages.push({
        id: newId,
        url: this.selectedImageData
      });
      
      console.log('Image uploaded successfully');
      alert('Image uploaded successfully!');
      
      this.selectedImagePreview = null;
      this.selectedImageData = null;
    }
  }

  deleteImage(id: number) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.galleryImages = this.galleryImages.filter(img => img.id !== id);
      console.log('Image deleted:', id);
    }
  }
}
