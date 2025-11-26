
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Award {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Awards Management</h1>
      
      <div class="form-card">
        <h2>{{ editMode ? 'Edit Award' : 'Add New Award' }}</h2>
        <form (ngSubmit)="addAward()">
          <div class="form-group">
            <label>Award Title</label>
            <input 
              type="text" 
              [(ngModel)]="currentAward.title" 
              name="title" 
              class="form-control"
              placeholder="Enter award title">
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
            </div>
            <div 
              #descriptionEditor
              class="text-editor" 
              contenteditable="true"
              (input)="onEditorInput($event)"
              [innerHTML]="currentAward.description">
            </div>
          </div>
          
          <div class="form-group">
            <label>Upload Award Image</label>
            <input 
              type="file" 
              (change)="onImageSelected($event)" 
              accept="image/*"
              class="form-control">
            @if (selectedImagePreview) {
              <div class="file-preview">
                <img [src]="selectedImagePreview" alt="Award preview" class="preview-img">
              </div>
            }
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Update Award' : 'Add Award' }}
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
        <h2>Awards List</h2>
        <div class="awards-grid">
          @for (award of awards; track award.id) {
            <div class="award-item">
              @if (award.image) {
                <div class="award-image">
                  <img [src]="award.image" [alt]="award.title">
                </div>
              }
              <div class="award-content">
                <h3>{{ award.title }}</h3>
                <div class="award-description" [innerHTML]="award.description"></div>
              </div>
              <div class="award-actions">
                <button class="btn-edit" (click)="editAward(award)">Edit</button>
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

    .editor-toolbar {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
      padding: 8px;
      background: #f5f5f5;
      border-radius: 8px 8px 0 0;
      border: 1px solid #ddd;
      border-bottom: none;
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
      background: #e9e9e9;
      border-color: #999;
    }

    .text-editor {
      min-height: 150px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 0 0 8px 8px;
      background: #fff;
      font-size: 1rem;
      line-height: 1.6;
    }

    .text-editor:focus {
      outline: none;
      border-color: #d4af6a;
    }

    .text-editor:empty:before {
      content: 'Enter award description...';
      color: #999;
    }

    .file-preview {
      margin-top: 12px;
      text-align: center;
    }

    .preview-img {
      max-width: 300px;
      max-height: 200px;
      border-radius: 8px;
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

    .awards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .award-item {
      background: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #eee;
      overflow: hidden;
    }

    .award-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .award-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .award-content {
      padding: 20px;
    }

    .award-content h3 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 1.1rem;
    }

    .award-description {
      color: #555;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .award-actions {
      display: flex;
      gap: 12px;
      padding: 0 20px 20px;
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
export class AwardsComponent {
  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

  editMode = false;
  selectedImagePreview: string | null = null;
  selectedImageData: string | null = null;

  currentAward: Award = {
    id: 0,
    title: '',
    description: '',
    image: ''
  };

  awards: Award[] = [
    { 
      id: 1, 
      title: 'Best Beauty Academy', 
      description: 'Awarded for outstanding contribution to beauty education',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop'
    },
    { 
      id: 2, 
      title: 'Top Training Institute', 
      description: 'Recognized as the leading training institute in Mumbai',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c05?w=600&h=400&fit=crop'
    }
  ];

  formatText(command: string, value?: string) {
    document.execCommand(command, false, value);
  }

  onEditorInput(event: any) {
    this.currentAward.description = event.target.innerHTML;
  }

  onImageSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
        this.selectedImageData = e.target.result;
        this.currentAward.image = e.target.result;
      };
      
      reader.readAsDataURL(file);
    }
  }

  addAward() {
    if (this.editMode) {
      const index = this.awards.findIndex(a => a.id === this.currentAward.id);
      if (index !== -1) {
        this.awards[index] = { ...this.currentAward };
        alert('Award updated successfully!');
      }
    } else {
      const newAward = {
        ...this.currentAward,
        id: this.awards.length > 0 ? Math.max(...this.awards.map(a => a.id)) + 1 : 1
      };
      this.awards.push(newAward);
      alert('Award added successfully!');
    }
    this.resetForm();
  }

  editAward(award: Award) {
    this.editMode = true;
    this.currentAward = { ...award };
    this.selectedImagePreview = award.image;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteAward(id: number) {
    if (confirm('Are you sure you want to delete this award?')) {
      this.awards = this.awards.filter(a => a.id !== id);
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.currentAward = {
      id: 0,
      title: '',
      description: '',
      image: ''
    };
    this.selectedImagePreview = null;
    this.selectedImageData = null;
    if (this.descriptionEditor) {
      this.descriptionEditor.nativeElement.innerHTML = '';
    }
  }
}
