
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Testimonial {
    id: number;
    title: string;
    thumbnail: string;
    channel: string;
    videoUrl: string;
}

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="admin-page">
      <h1>Student Testimonials Management</h1>
      
      <div class="form-card">
        <h2>{{ editMode ? 'Edit Testimonial' : 'Add New Testimonial' }}</h2>
        <form (ngSubmit)="addTestimonial()">
          <div class="form-group">
            <label>Video Title</label>
            <input 
              type="text" 
              [(ngModel)]="currentTestimonial.title" 
              name="title" 
              class="form-control"
              placeholder="Enter video title"
              required>
          </div>
          
          <div class="form-group">
            <label>Channel Name</label>
            <input 
              type="text" 
              [(ngModel)]="currentTestimonial.channel" 
              name="channel" 
              class="form-control"
              placeholder="Enter channel name"
              required>
          </div>
          
          <div class="form-group">
            <label>Video URL</label>
            <input 
              type="url" 
              [(ngModel)]="currentTestimonial.videoUrl" 
              name="videoUrl" 
              class="form-control"
              placeholder="Enter YouTube or video URL"
              required>
          </div>
          
          <div class="form-group">
            <label>Upload Thumbnail Image</label>
            <input 
              type="file" 
              (change)="onImageSelected($event)" 
              accept="image/*"
              class="form-control">
            @if (selectedImagePreview) {
              <div class="file-preview">
                <img [src]="selectedImagePreview" alt="Thumbnail preview" class="preview-img">
              </div>
            }
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Update Testimonial' : 'Add Testimonial' }}
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
        <h2>Testimonials List</h2>
        <div class="testimonials-grid">
          @for (testimonial of testimonials; track testimonial.id) {
            <div class="testimonial-card">
              <div class="video-thumbnail">
                <img [src]="testimonial.thumbnail" [alt]="testimonial.title">
                <div class="channel-badge">
                  <span class="channel-icon">⚡</span>
                  <span class="channel-name">{{ testimonial.channel }}</span>
                  <button class="subscribe-btn">Subscribe</button>
                </div>
                <div class="play-overlay">
                  <div class="youtube-play-button">
                    <svg width="68" height="48" viewBox="0 0 68 48">
                      <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#FF0000"/>
                      <path d="M 45,24 27,14 27,34" fill="#FFFFFF"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="video-info">
                <h3>{{ testimonial.title }}</h3>
                <p class="video-url">{{ testimonial.videoUrl }}</p>
              </div>
              <div class="testimonial-actions">
                <button class="btn-edit" (click)="editTestimonial(testimonial)">Edit</button>
                <button class="btn-delete" (click)="deleteTestimonial(testimonial.id)">Delete</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
    styles: [`
    .admin-page {
      max-width: 1400px;
      padding: 20px;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 30px;
      font-size: 2rem;
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
      font-size: 1.5rem;
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
      box-sizing: border-box;
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
      max-width: 400px;
      max-height: 250px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
    }

    .testimonial-card {
      background: #f9f9f9;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #eee;
      transition: transform 0.3s;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    }

    .video-thumbnail {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      background: #000;
      overflow: hidden;
    }

    .video-thumbnail img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .channel-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 6px 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 2;
    }

    .channel-icon {
      font-size: 14px;
    }

    .channel-name {
      color: #fff;
      font-size: 12px;
      font-weight: 500;
    }

    .subscribe-btn {
      background: #fff;
      color: #000;
      border: none;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      margin-left: 4px;
    }

    .subscribe-btn:hover {
      background: #e0e0e0;
    }

    .play-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      cursor: pointer;
      transition: transform 0.3s;
    }

    .play-overlay:hover {
      transform: translate(-50%, -50%) scale(1.1);
    }

    .youtube-play-button {
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    }

    .video-info {
      padding: 16px;
    }

    .video-info h3 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.4;
    }

    .video-url {
      color: #999;
      font-size: 0.85rem;
      margin: 0;
      word-break: break-all;
    }

    .testimonial-actions {
      display: flex;
      gap: 12px;
      padding: 0 16px 16px;
    }

    .btn-edit, .btn-delete {
      flex: 1;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s;
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
export class TestimonialsComponent {
    editMode = false;
    selectedImagePreview: string | null = null;

    currentTestimonial: Testimonial = {
        id: 0,
        title: '',
        thumbnail: '',
        channel: 'Lakmé Academy Powered By Aptech',
        videoUrl: ''
    };

    testimonials: Testimonial[] = [
        {
            id: 1,
            title: 'Craft. Confidence. Recognition: Jyoti Chaturvedi\'s Story',
            thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
            channel: 'Lakmé Academy Powered By Aptech',
            videoUrl: 'https://youtube.com/example1'
        },
        {
            id: 2,
            title: 'Winning Gold & Making Moves | Pallavi Munda\'s Path to Success!',
            thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop',
            channel: 'Lakmé Academy Powered By Aptech',
            videoUrl: 'https://youtube.com/example2'
        }
    ];

    onImageSelected(event: any) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.selectedImagePreview = e.target.result;
                this.currentTestimonial.thumbnail = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    }

    addTestimonial() {
        if (this.editMode) {
            const index = this.testimonials.findIndex(t => t.id === this.currentTestimonial.id);
            if (index !== -1) {
                this.testimonials[index] = { ...this.currentTestimonial };
                alert('Testimonial updated successfully!');
            }
        } else {
            const newTestimonial = {
                ...this.currentTestimonial,
                id: this.testimonials.length > 0 ? Math.max(...this.testimonials.map(t => t.id)) + 1 : 1
            };
            this.testimonials.push(newTestimonial);
            alert('Testimonial added successfully!');
        }
        this.resetForm();
    }

    editTestimonial(testimonial: Testimonial) {
        this.editMode = true;
        this.currentTestimonial = { ...testimonial };
        this.selectedImagePreview = testimonial.thumbnail;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    deleteTestimonial(id: number) {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            this.testimonials = this.testimonials.filter(t => t.id !== id);
        }
    }

    cancelEdit() {
        this.resetForm();
    }

    resetForm() {
        this.editMode = false;
        this.currentTestimonial = {
            id: 0,
            title: '',
            thumbnail: '',
            channel: 'Lakmé Academy Powered By Aptech',
            videoUrl: ''
        };
        this.selectedImagePreview = null;
    }
}
