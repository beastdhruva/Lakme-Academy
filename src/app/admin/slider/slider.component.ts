
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Slide {
  id: number;
  title: string;
  video_url?: string;
  video_file?: string;
  image_url?: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Slider Management</h1>
      
      <div class="form-card">
        <h2>{{ editMode ? 'Edit Slide' : 'Add New Slide' }}</h2>
        <form (ngSubmit)="saveSlide()">
          <div class="form-group">
            <label>Upload Video File</label>
            <input 
              type="file" 
              (change)="onVideoFileSelected($event)" 
              accept="video/*"
              class="form-control"
              #videoInput>
            <small>Upload video file (MP4, WebM, etc.)</small>
            @if (currentSlide.video_file) {
              <div class="file-preview">
                <span>✓ Video uploaded: {{ getFileName(currentSlide.video_file) }}</span>
                <button type="button" class="btn-remove" (click)="removeVideoFile(videoInput)">Remove</button>
              </div>
            }
          </div>

          <div class="form-group">
            <label>OR Video URL (Optional)</label>
            <input 
              type="text" 
              [(ngModel)]="currentSlide.video_url" 
              name="video_url" 
              class="form-control"
              placeholder="Enter video URL (YouTube, Vimeo, or direct video link)">
            <small>Example: https://www.youtube.com/watch?v=VIDEO_ID</small>
          </div>

          <div class="form-group">
            <label>Thumbnail Image (Optional)</label>
            <input 
              type="file" 
              (change)="onImageFileSelected($event)" 
              accept="image/*"
              class="form-control"
              #imageInput>
            <small>Upload thumbnail image (optional)</small>
            @if (currentSlide.image_url) {
              <div class="file-preview">
                <img [src]="currentSlide.image_url" alt="Preview" class="thumbnail-preview">
                <button type="button" class="btn-remove" (click)="removeImageFile(imageInput)">Remove</button>
              </div>
            }
          </div>
          
          <div class="form-group">
            <label>Title</label>
            <input 
              type="text" 
              [(ngModel)]="currentSlide.title" 
              name="title" 
              class="form-control"
              placeholder="Enter slide title">
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea 
              [(ngModel)]="currentSlide.description" 
              name="description" 
              rows="4" 
              class="form-control"
              placeholder="Enter slide description"></textarea>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                [(ngModel)]="currentSlide.is_active" 
                name="is_active">
              <span>Active (Show on website)</span>
            </label>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Update Slide' : 'Add Slide' }}
            </button>
            @if (editMode) {
              <button type="button" class="btn-secondary" (click)="cancelEdit()">
                Cancel
              </button>
            }
          </div>
        </form>
      </div>

      <div class="list-card">
        <h2>All Slides ({{ slides.length }})</h2>
        
        @if (slides.length === 0) {
          <div class="empty-state">
            <p>No slides added yet. Create your first slide above!</p>
          </div>
        } @else {
          <div class="slides-table">
            <table>
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title</th>
                  <th>Video URL</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (slide of slides; track slide.id) {
                  <tr [class.inactive-row]="!slide.is_active">
                    <td>
                      <div class="slide-preview">
                        @if (slide.image_url) {
                          <img [src]="slide.image_url" [alt]="slide.title">
                        } @else {
                          <div class="video-icon">🎬</div>
                        }
                      </div>
                    </td>
                    <td>
                      <div class="slide-title">{{ slide.title }}</div>
                      @if (slide.description) {
                        <div class="slide-desc">{{ slide.description }}</div>
                      }
                    </td>
                    <td>
                      @if (slide.video_file) {
                        <span class="video-link">📹 Uploaded Video</span>
                      } @else if (slide.video_url) {
                        <a [href]="slide.video_url" target="_blank" class="video-link">
                          {{ getVideoHost(slide.video_url) }}
                        </a>
                      } @else {
                        <span class="text-muted">No video</span>
                      }
                    </td>
                    <td>
                      <span class="status-badge" [class.active]="slide.is_active">
                        {{ slide.is_active ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td>
                      <div class="action-buttons">
                        <button 
                          (click)="viewSlide(slide)" 
                          class="btn-view" 
                          title="View">
                          👁️
                        </button>
                        <button 
                          (click)="editSlide(slide)" 
                          class="btn-edit" 
                          title="Edit">
                          ✏️
                        </button>
                        <button 
                          (click)="toggleStatus(slide)" 
                          class="btn-toggle" 
                          title="{{ slide.is_active ? 'Deactivate' : 'Activate' }}">
                          {{ slide.is_active ? '🔴' : '🟢' }}
                        </button>
                        <button 
                          (click)="deleteSlide(slide.id)" 
                          class="btn-delete" 
                          title="Delete">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <!-- View Modal -->
      @if (viewingSlide) {
        <div class="modal-overlay" (click)="closeView()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>{{ viewingSlide.title }}</h3>
              <button class="close-btn" (click)="closeView()">×</button>
            </div>
            <div class="modal-body">
              @if (viewingSlide.image_url) {
                <img [src]="viewingSlide.image_url" [alt]="viewingSlide.title" class="preview-image">
              }
              @if (viewingSlide.video_file) {
                <div class="detail-row">
                  <strong>Video:</strong>
                  <video [src]="viewingSlide.video_file" controls class="preview-video"></video>
                </div>
              } @else if (viewingSlide.video_url) {
                <div class="detail-row">
                  <strong>Video URL:</strong>
                  <a [href]="viewingSlide.video_url" target="_blank">{{ viewingSlide.video_url }}</a>
                </div>
              }
              @if (viewingSlide.description) {
                <div class="detail-row">
                  <strong>Description:</strong>
                  <p>{{ viewingSlide.description }}</p>
                </div>
              }
              <div class="detail-row">
                <strong>Status:</strong>
                <span class="status-badge" [class.active]="viewingSlide.is_active">
                  {{ viewingSlide.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
              <div class="detail-row">
                <strong>Created:</strong>
                <span>{{ viewingSlide.created_at }}</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-page {
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .form-card, .list-card {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .form-card h2, .list-card h2 {
      color: #1a1a1a;
      margin-bottom: 25px;
      font-size: 1.4rem;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 600;
    }

    .required {
      color: #f44336;
    }

    .form-control {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: #d4af6a;
    }

    textarea.form-control {
      resize: vertical;
      font-family: inherit;
    }

    small {
      display: block;
      margin-top: 5px;
      color: #666;
      font-size: 0.85rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 25px;
    }

    .btn-primary, .btn-secondary {
      padding: 12px 30px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
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
      background: #666;
      color: #fff;
    }

    .btn-secondary:hover {
      background: #555;
    }

    .empty-state {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .slides-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f5f5f5;
    }

    th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #ddd;
    }

    td {
      padding: 15px;
      border-bottom: 1px solid #eee;
      vertical-align: middle;
    }

    .inactive-row {
      opacity: 0.6;
      background: #f9f9f9;
    }

    .slide-preview {
      width: 80px;
      height: 60px;
      border-radius: 6px;
      overflow: hidden;
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-icon {
      font-size: 2rem;
    }

    .slide-title {
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 5px;
    }

    .slide-desc {
      font-size: 0.85rem;
      color: #666;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .video-link {
      color: #2196f3;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .video-link:hover {
      text-decoration: underline;
    }

    .status-badge {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      background: #ddd;
      color: #666;
    }

    .status-badge.active {
      background: #4caf50;
      color: #fff;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .btn-view, .btn-edit, .btn-toggle, .btn-delete {
      width: 35px;
      height: 35px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      transition: transform 0.2s;
    }

    .btn-view {
      background: #2196f3;
    }

    .btn-edit {
      background: #ff9800;
    }

    .btn-toggle {
      background: #9c27b0;
    }

    .btn-delete {
      background: #f44336;
    }

    .btn-view:hover, .btn-edit:hover, .btn-toggle:hover, .btn-delete:hover {
      transform: scale(1.1);
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: #fff;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 25px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h3 {
      margin: 0;
      color: #1a1a1a;
    }

    .close-btn {
      width: 35px;
      height: 35px;
      border: none;
      background: #f0f0f0;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }

    .close-btn:hover {
      background: #e0e0e0;
    }

    .modal-body {
      padding: 25px;
    }

    .preview-image {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .preview-video {
      width: 100%;
      border-radius: 8px;
      margin-top: 10px;
      max-height: 300px;
    }

    .detail-row {
      margin-bottom: 15px;
    }

    .detail-row strong {
      display: block;
      margin-bottom: 5px;
      color: #333;
    }

    .detail-row p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }

    .detail-row a {
      color: #2196f3;
      word-break: break-all;
    }

    .file-preview {
      margin-top: 10px;
      padding: 10px;
      background: #f5f5f5;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .file-preview span {
      color: #4caf50;
      font-weight: 600;
    }

    .thumbnail-preview {
      width: 100px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }

    .btn-remove {
      background: #f44336;
      color: #fff;
      border: none;
      padding: 5px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
    }

    .btn-remove:hover {
      background: #d32f2f;
    }

    .text-muted {
      color: #999;
      font-style: italic;
    }
  `]
})
export class SliderComponent {
  currentSlide: Slide = this.getEmptySlide();
  editMode = false;
  viewingSlide: Slide | null = null;

  slides: Slide[] = [
    {
      id: 1,
      title: 'Welcome to Lakmé Academy',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_file: '',
      image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      description: 'Transform your passion into profession',
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];

  getEmptySlide(): Slide {
    return {
      id: 0,
      title: '',
      video_url: '',
      video_file: '',
      image_url: '',
      description: '',
      is_active: true,
      created_at: new Date().toISOString()
    };
  }

  onVideoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentSlide.video_file = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onImageFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentSlide.image_url = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeVideoFile(input: HTMLInputElement) {
    this.currentSlide.video_file = '';
    input.value = '';
  }

  removeImageFile(input: HTMLInputElement) {
    this.currentSlide.image_url = '';
    input.value = '';
  }

  getFileName(dataUrl: string): string {
    return 'video-file.' + (dataUrl.includes('mp4') ? 'mp4' : 'video');
  }

  saveSlide() {
    if (this.editMode) {
      // Update existing slide
      const index = this.slides.findIndex(s => s.id === this.currentSlide.id);
      if (index !== -1) {
        this.slides[index] = { ...this.currentSlide };
        console.log('Slide updated:', this.currentSlide);
        alert('Slide updated successfully!');
      }
    } else {
      // Add new slide
      const newSlide: Slide = {
        ...this.currentSlide,
        id: Date.now(),
        created_at: new Date().toISOString()
      };
      this.slides.unshift(newSlide);
      console.log('Slide added:', newSlide);
      alert('Slide added successfully!');
    }

    this.resetForm();
  }

  editSlide(slide: Slide) {
    this.currentSlide = { ...slide };
    this.editMode = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewSlide(slide: Slide) {
    this.viewingSlide = { ...slide };
  }

  closeView() {
    this.viewingSlide = null;
  }

  toggleStatus(slide: Slide) {
    const index = this.slides.findIndex(s => s.id === slide.id);
    if (index !== -1) {
      this.slides[index].is_active = !this.slides[index].is_active;
      console.log('Slide status toggled:', this.slides[index]);
      alert(`Slide ${this.slides[index].is_active ? 'activated' : 'deactivated'} successfully!`);
    }
  }

  deleteSlide(id: number) {
    if (confirm('Are you sure you want to delete this slide? This action cannot be undone.')) {
      this.slides = this.slides.filter(s => s.id !== id);
      console.log('Slide deleted:', id);
      alert('Slide deleted successfully!');
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.currentSlide = this.getEmptySlide();
    this.editMode = false;
  }

  getVideoHost(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'YouTube';
    } else if (url.includes('vimeo.com')) {
      return 'Vimeo';
    } else {
      return 'Direct Link';
    }
  }
}
