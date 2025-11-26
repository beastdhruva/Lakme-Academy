
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AboutData {
  id: number;
  title: string;
  description: string;
  image_file: string;
  video_file: string;
  is_active: boolean;
  created_at: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>About Section Management</h1>
      
      <div class="form-card">
        <h2>{{ editMode ? 'Edit About Section' : 'Add About Section' }}</h2>
        <form (ngSubmit)="saveAbout()">
          <div class="form-group">
            <label>Title</label>
            <input 
              type="text" 
              [(ngModel)]="currentAbout.title" 
              name="title" 
              class="form-control"
              placeholder="Enter title">
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <div class="editor-toolbar">
              <button type="button" class="editor-btn" (click)="formatText('bold')" title="Bold">
                <strong>B</strong>
              </button>
              <button type="button" class="editor-btn" (click)="formatText('italic')" title="Italic">
                <em>I</em>
              </button>
              <button type="button" class="editor-btn" (click)="formatText('underline')" title="Underline">
                <u>U</u>
              </button>
              <button type="button" class="editor-btn" (click)="formatText('insertUnorderedList')" title="Bullet List">
                ☰
              </button>
              <button type="button" class="editor-btn" (click)="formatText('insertOrderedList')" title="Numbered List">
                1.
              </button>
              <button type="button" class="editor-btn" (click)="formatText('formatBlock', 'h3')" title="Heading">
                H
              </button>
            </div>
            <div 
              #descriptionEditor
              class="text-editor" 
              contenteditable="true"
              (input)="onEditorInput($event)"
              [innerHTML]="currentAbout.description"
              placeholder="Enter description...">
            </div>
          </div>
          
          <div class="form-group">
            <label>Upload Image</label>
            <input 
              type="file" 
              #imageInput
              (change)="onImageFileSelected($event)" 
              accept="image/*"
              class="form-control">
            @if (currentAbout.image_file) {
              <div class="file-preview">
                <img [src]="currentAbout.image_file" alt="Preview" class="preview-image">
                <button type="button" class="btn-remove" (click)="removeImageFile(imageInput)">
                  Remove Image
                </button>
              </div>
            }
          </div>
          
          <div class="form-group">
            <label>Upload Video</label>
            <input 
              type="file" 
              #videoInput
              (change)="onVideoFileSelected($event)" 
              accept="video/*"
              class="form-control">
            @if (currentAbout.video_file) {
              <div class="file-preview">
                <video [src]="currentAbout.video_file" controls class="preview-video"></video>
                <button type="button" class="btn-remove" (click)="removeVideoFile(videoInput)">
                  Remove Video
                </button>
              </div>
            }
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                [(ngModel)]="currentAbout.is_active" 
                name="is_active">
              Active
            </label>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Update' : 'Save' }}
            </button>
            @if (editMode) {
              <button type="button" class="btn-secondary" (click)="cancelEdit()">
                Cancel
              </button>
            }
          </div>
        </form>
      </div>

      <div class="table-card">
        <h2>About Sections List</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Video</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (about of aboutList; track about.id) {
              <tr>
                <td>{{ about.id }}</td>
                <td>{{ about.title }}</td>
                <td>{{ about.description.substring(0, 50) }}...</td>
                <td>
                  @if (about.image_file) {
                    <img [src]="about.image_file" alt="Preview" class="table-thumbnail">
                  } @else {
                    <span class="no-file">No image</span>
                  }
                </td>
                <td>
                  @if (about.video_file) {
                    <span class="has-file">✓ Video uploaded</span>
                  } @else {
                    <span class="no-file">No video</span>
                  }
                </td>
                <td>
                  <span class="status-badge" [class.active]="about.is_active">
                    {{ about.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>{{ about.created_at | date:'short' }}</td>
                <td class="actions">
                  <button class="btn-action view" (click)="viewAbout(about)">View</button>
                  <button class="btn-action edit" (click)="editAbout(about)">Edit</button>
                  <button class="btn-action delete" (click)="deleteAbout(about.id)">Delete</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="8" class="no-data">No about sections found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>

    @if (viewMode && selectedAbout) {
      <div class="modal-overlay" (click)="closeView()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>About Section Details</h2>
            <button class="close-btn" (click)="closeView()">×</button>
          </div>
          <div class="modal-body">
            <div class="detail-row">
              <strong>Title:</strong>
              <span>{{ selectedAbout.title }}</span>
            </div>
            <div class="detail-row">
              <strong>Description:</strong>
              <span>{{ selectedAbout.description }}</span>
            </div>
            @if (selectedAbout.image_file) {
              <div class="detail-row">
                <strong>Image:</strong>
                <img [src]="selectedAbout.image_file" alt="About Image" class="modal-image">
              </div>
            }
            @if (selectedAbout.video_file) {
              <div class="detail-row">
                <strong>Video:</strong>
                <video [src]="selectedAbout.video_file" controls class="modal-video"></video>
              </div>
            }
            <div class="detail-row">
              <strong>Status:</strong>
              <span class="status-badge" [class.active]="selectedAbout.is_active">
                {{ selectedAbout.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="detail-row">
              <strong>Created At:</strong>
              <span>{{ selectedAbout.created_at | date:'full' }}</span>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .admin-page {
      max-width: 1200px;
      padding: 20px;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 30px;
    }

    .form-card, .table-card {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
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

    .editor-toolbar {
      display: flex;
      gap: 4px;
      padding: 8px;
      background: #f8f9fa;
      border: 1px solid #ddd;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
    }

    .editor-btn {
      padding: 6px 12px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }

    .editor-btn:hover {
      background: #e9ecef;
      border-color: #d4af6a;
    }

    .editor-btn:active {
      background: #d4af6a;
      color: #fff;
    }

    .text-editor {
      min-height: 200px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 0 0 8px 8px;
      background: #fff;
      font-size: 1rem;
      font-family: inherit;
      line-height: 1.6;
      overflow-y: auto;
      max-height: 400px;
    }

    .text-editor:focus {
      outline: none;
      border-color: #d4af6a;
    }

    .text-editor:empty:before {
      content: attr(placeholder);
      color: #999;
    }

    .text-editor ul,
    .text-editor ol {
      margin-left: 20px;
      margin-bottom: 10px;
    }

    .text-editor h3 {
      margin: 10px 0;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .file-preview {
      margin-top: 12px;
      padding: 12px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .preview-image, .preview-video {
      max-width: 100%;
      max-height: 300px;
      border-radius: 8px;
      display: block;
      margin-bottom: 12px;
    }

    .btn-remove {
      background: #dc3545;
      color: #fff;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-remove:hover {
      background: #c82333;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      width: auto;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
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

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 106, 0.4);
    }

    .btn-secondary {
      background: #6c757d;
      color: #fff;
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .data-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
    }

    .data-table tr:hover {
      background: #f8f9fa;
    }

    .table-thumbnail {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 6px;
    }

    .has-file {
      color: #28a745;
      font-weight: 500;
    }

    .no-file {
      color: #6c757d;
      font-style: italic;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 500;
      background: #6c757d;
      color: #fff;
    }

    .status-badge.active {
      background: #28a745;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-action {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .btn-action.view {
      background: #17a2b8;
      color: #fff;
    }

    .btn-action.edit {
      background: #ffc107;
      color: #000;
    }

    .btn-action.delete {
      background: #dc3545;
      color: #fff;
    }

    .btn-action:hover {
      opacity: 0.8;
    }

    .no-data {
      text-align: center;
      color: #6c757d;
      font-style: italic;
      padding: 40px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: #fff;
      border-radius: 12px;
      padding: 30px;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      width: 90%;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #6c757d;
      line-height: 1;
    }

    .close-btn:hover {
      color: #000;
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .detail-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .detail-row strong {
      color: #333;
    }

    .modal-image, .modal-video {
      max-width: 100%;
      border-radius: 8px;
      margin-top: 8px;
    }
  `]
})
export class AboutSectionComponent {
  aboutList: AboutData[] = [];
  currentAbout: AboutData = this.getEmptyAbout();
  editMode = false;
  viewMode = false;
  selectedAbout: AboutData | null = null;

  constructor() {
    // Initialize with sample data
    this.aboutList = [
      {
        id: 1,
        title: 'About Lakme Academy',
        description: 'Lakmé Academy Powered By Aptech is a partnership between two industry stalwarts - Lakmé & Aptech with decades of experience in beauty and training.',
        image_file: '',
        video_file: '',
        is_active: true,
        created_at: new Date().toISOString()
      }
    ];
  }

  getEmptyAbout(): AboutData {
    return {
      id: 0,
      title: '',
      description: '',
      image_file: '',
      video_file: '',
      is_active: true,
      created_at: new Date().toISOString()
    };
  }

  onImageFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentAbout.image_file = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onVideoFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentAbout.video_file = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImageFile(input: HTMLInputElement) {
    this.currentAbout.image_file = '';
    input.value = '';
  }

  removeVideoFile(input: HTMLInputElement) {
    this.currentAbout.video_file = '';
    input.value = '';
  }

  saveAbout() {
    if (this.editMode) {
      // Update existing about section
      const index = this.aboutList.findIndex(a => a.id === this.currentAbout.id);
      if (index !== -1) {
        this.aboutList[index] = { ...this.currentAbout };
        alert('About section updated successfully!');
      }
    } else {
      // Add new about section
      const newAbout = {
        ...this.currentAbout,
        id: this.aboutList.length + 1,
        created_at: new Date().toISOString()
      };
      this.aboutList.push(newAbout);
      alert('About section added successfully!');
    }
    
    this.resetForm();
  }

  editAbout(about: AboutData) {
    this.currentAbout = { ...about };
    this.editMode = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewAbout(about: AboutData) {
    this.selectedAbout = about;
    this.viewMode = true;
  }

  closeView() {
    this.viewMode = false;
    this.selectedAbout = null;
  }

  deleteAbout(id: number) {
    if (confirm('Are you sure you want to delete this about section?')) {
      this.aboutList = this.aboutList.filter(a => a.id !== id);
      alert('About section deleted successfully!');
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.currentAbout = this.getEmptyAbout();
    this.editMode = false;
  }

  formatText(command: string, value?: string) {
    document.execCommand(command, false, value);
  }

  onEditorInput(event: Event) {
    const editor = event.target as HTMLElement;
    this.currentAbout.description = editor.innerHTML;
  }
}
