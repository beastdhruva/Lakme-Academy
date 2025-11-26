
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Workshop {
  id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Workshops Management</h1>
      
      <div class="form-card">
        <h2>{{ editMode ? 'Edit Workshop' : 'Add New Workshop' }}</h2>
        <form (ngSubmit)="saveWorkshop()">
          <div class="form-group">
            <label>Workshop Title</label>
            <input 
              type="text" 
              [(ngModel)]="currentWorkshop.title" 
              name="title" 
              class="form-control"
              placeholder="Enter workshop title">
          </div>
          
          <div class="form-group">
            <label>Instructor</label>
            <input 
              type="text" 
              [(ngModel)]="currentWorkshop.instructor" 
              name="instructor" 
              class="form-control"
              placeholder="Enter instructor name">
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
              [innerHTML]="currentWorkshop.description">
            </div>
          </div>

          <div class="form-group">
            <label>Workshop Image</label>
            <input 
              type="file" 
              (change)="onImageSelected($event)" 
              accept="image/*"
              class="form-control">
            @if (selectedImagePreview) {
              <div class="image-preview">
                <img [src]="selectedImagePreview" alt="Preview">
              </div>
            }
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Update Workshop' : 'Add Workshop' }}
            </button>
            @if (editMode) {
              <button type="button" class="btn-secondary" (click)="cancelEdit()">Cancel</button>
            }
          </div>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Scheduled Workshops</h2>
        <div class="workshops-list">
          @for (workshop of workshops; track workshop.id) {
            <div class="workshop-item">
              <div class="workshop-image">
                <img [src]="workshop.image" [alt]="workshop.title">
              </div>
              <div class="workshop-info">
                <h3>{{ workshop.title }}</h3>
                <p class="workshop-instructor">👨‍🏫 {{ workshop.instructor }}</p>
                <div class="workshop-description" [innerHTML]="workshop.description"></div>
              </div>
              <div class="workshop-actions">
                <button class="btn-edit" (click)="editWorkshop(workshop)">Edit</button>
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
      border-radius: 6px;
      border: 1px solid #ddd;
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
      border-radius: 8px;
      background: #fff;
      font-size: 1rem;
      line-height: 1.6;
      overflow-y: auto;
    }

    .text-editor:focus {
      outline: none;
      border-color: #d4af6a;
    }

    .text-editor ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .text-editor li {
      margin: 5px 0;
    }

    .image-preview {
      margin-top: 15px;
      border-radius: 8px;
      overflow: hidden;
      max-width: 300px;
    }

    .image-preview img {
      width: 100%;
      height: auto;
      display: block;
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
      flex: 1;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 106, 0.3);
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

    .workshops-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .workshop-item {
      display: grid;
      grid-template-columns: 200px 1fr auto;
      gap: 20px;
      align-items: start;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      border: 1px solid #eee;
    }

    .workshop-image {
      width: 200px;
      height: 150px;
      border-radius: 8px;
      overflow: hidden;
    }

    .workshop-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .workshop-info h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .workshop-instructor {
      margin: 4px 0;
      color: #666;
      font-size: 0.9rem;
    }

    .workshop-description {
      margin-top: 12px;
      color: #555;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .workshop-description ul {
      margin: 8px 0;
      padding-left: 20px;
    }

    .workshop-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .btn-edit, .btn-delete {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      white-space: nowrap;
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

    @media (max-width: 768px) {
      .workshop-item {
        grid-template-columns: 1fr;
      }

      .workshop-image {
        width: 100%;
      }

      .workshop-actions {
        flex-direction: row;
      }
    }
  `]
})
export class WorkshopsComponent {
  @ViewChild('descriptionEditor') descriptionEditor!: ElementRef;

  editMode = false;
  selectedImagePreview: string | null = null;
  selectedImageData: string | null = null;

  currentWorkshop: Workshop = {
    id: 0,
    title: '',
    instructor: '',
    description: '',
    image: ''
  };

  workshops: Workshop[] = [
    {
      id: 1,
      title: 'Advanced Makeup Techniques',
      instructor: 'Priya Sharma',
      description: 'Learn advanced makeup techniques from industry experts.',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop'
    }
  ];

  onImageSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
        this.selectedImageData = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  formatText(command: string) {
    document.execCommand(command, false);
    this.descriptionEditor.nativeElement.focus();
  }

  onEditorInput(event: any) {
    this.currentWorkshop.description = event.target.innerHTML;
  }

  saveWorkshop() {
    if (!this.currentWorkshop.title || !this.currentWorkshop.instructor || !this.currentWorkshop.description) {
      alert('Please fill in all required fields!');
      return;
    }

    if (this.selectedImageData) {
      this.currentWorkshop.image = this.selectedImageData;
    }

    if (this.editMode) {
      const index = this.workshops.findIndex(w => w.id === this.currentWorkshop.id);
      if (index !== -1) {
        this.workshops[index] = { ...this.currentWorkshop };
      }
      alert('Workshop updated successfully!');
    } else {
      const newWorkshop = {
        ...this.currentWorkshop,
        id: this.workshops.length > 0 ? Math.max(...this.workshops.map(w => w.id)) + 1 : 1
      };
      this.workshops.push(newWorkshop);
      alert('Workshop added successfully!');
    }

    this.resetForm();
  }

  editWorkshop(workshop: Workshop) {
    this.editMode = true;
    this.currentWorkshop = { ...workshop };
    this.selectedImagePreview = workshop.image;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteWorkshop(id: number) {
    if (confirm('Are you sure you want to delete this workshop?')) {
      this.workshops = this.workshops.filter(w => w.id !== id);
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.currentWorkshop = {
      id: 0,
      title: '',
      instructor: '',
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