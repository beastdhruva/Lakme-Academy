
import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  name: string;
  icon: string;
  duration: string;
  description: string;
  price: string;
  image: string;
  image_file?: File;
  jobProfiles: string[];
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Courses Management</h1>
      
      <div class="form-card">
        <h2>{{ editMode ? 'Edit Course' : 'Add New Course' }}</h2>
        <form (ngSubmit)="saveCourse()">
          <div class="form-row">
            <div class="form-group">
              <label>Course Name</label>
              <input 
                type="text" 
                [(ngModel)]="currentCourse.name" 
                name="name" 
                class="form-control"
                placeholder="e.g., Makeup, Hair, Skin">
            </div>
            
            <div class="form-group">
              <label>Icon (Emoji)</label>
              <select 
                [(ngModel)]="currentCourse.icon" 
                name="icon" 
                class="form-control"
                (change)="onIconChange()">
                <option value="">Select an icon</option>
                <option value="none">🚫 No Icon</option>
                <option value="💄">💄 Makeup</option>
                <option value="✂️">✂️ Hair/Scissors</option>
                <option value="✨">✨ Sparkles</option>
                <option value="💅">💅 Nail Polish</option>
                <option value="🌸">🌸 Flower</option>
                <option value="💆">💆 Face Massage</option>
                <option value="🎨">🎨 Artist Palette</option>
                <option value="👄">👄 Lips</option>
                <option value="💋">💋 Kiss Mark</option>
                <option value="🌹">🌹 Rose</option>
                <option value="⭐">⭐ Star</option>
                <option value="💎">💎 Diamond</option>
                <option value="🌺">🌺 Hibiscus</option>
                <option value="🦋">🦋 Butterfly</option>
                <option value="👑">👑 Crown</option>
                <option value="custom">✏️ Custom Icon</option>
              </select>
              
              @if (showCustomIconInput) {
                <div style="margin-top: 10px;">
                  <input 
                    type="text" 
                    [(ngModel)]="customIconValue" 
                    name="customIcon" 
                    class="form-control"
                    placeholder="Enter custom emoji or text (e.g., 🎭, 💇, etc.)"
                    maxlength="3">
                  <small style="color: #666; font-size: 0.85rem; display: block; margin-top: 5px;">
                    You can paste any emoji or enter up to 3 characters
                  </small>
                </div>
              }
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Duration</label>
              <input 
                type="text" 
                [(ngModel)]="currentCourse.duration" 
                name="duration" 
                class="form-control"
                placeholder="e.g., 6 months">
            </div>
            
            <div class="form-group">
              <label>Price</label>
              <input 
                type="text" 
                [(ngModel)]="currentCourse.price" 
                name="price" 
                class="form-control"
                placeholder="e.g., ₹50,000">
            </div>
          </div>
          
          <div class="form-group">
            <label>Course Image</label>
            <input 
              type="file" 
              (change)="onImageFileSelected($event)" 
              accept="image/*"
              class="form-control">
            @if (currentCourse.image || currentCourse.image_file) {
              <div class="file-preview">
                <img [src]="currentCourse.image" alt="Course preview" class="preview-img">
              </div>
            }
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
              [innerHTML]="currentCourse.description"
              placeholder="Enter course description...">
            </div>
          </div>

          <div class="form-group">
            <label>Job Profiles</label>
            <div class="job-profiles-input">
              <input 
                type="text" 
                [(ngModel)]="newJobProfile" 
                name="newJobProfile" 
                class="form-control"
                placeholder="Enter job profile"
                (keyup.enter)="addJobProfile()">
              <button type="button" class="btn-add" (click)="addJobProfile()">Add</button>
            </div>
            
            @if (currentCourse.jobProfiles.length > 0) {
              <div class="job-profiles-list">
                @for (profile of currentCourse.jobProfiles; track $index) {
                  <div class="job-profile-item">
                    <span>{{ profile }}</span>
                    <button type="button" class="btn-remove" (click)="removeJobProfile($index)">✕</button>
                  </div>
                }
              </div>
            }
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">
              {{ editMode ? 'Update Course' : 'Add Course' }}
            </button>
            @if (editMode) {
              <button type="button" class="btn-cancel" (click)="cancelEdit()">Cancel</button>
            }
          </div>
        </form>
      </div>

      <div class="form-card" style="margin-top: 30px;">
        <h2>Existing Courses</h2>
        <div class="courses-grid">
          @for (course of courses; track course.id) {
            <div class="course-card" [class.flipped]="flippedCourseId === course.id">
              <div class="course-card-inner">
                <!-- Front Side -->
                <div class="course-card-front" (click)="flipCard(course.id)">
                  <div class="course-image-wrapper">
                    <img [src]="course.image" [alt]="course.name" class="course-img">
                    <div class="course-overlay">
                      <div class="course-header">
                        @if (course.icon && course.icon !== 'none') {
                          <div class="course-icon-badge">{{ course.icon }}</div>
                        }
                        <div class="refresh-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                          </svg>
                        </div>
                      </div>
                      <div class="course-footer">
                        <h3 class="course-name">
                          @if (course.icon && course.icon !== 'none') {
                            <span>{{ course.icon }}</span>
                          }
                          {{ course.name }}
                        </h3>
                        <button type="button" class="view-more-btn">View More</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Back Side -->
                <div class="course-card-back">
                  <div class="course-details">
                    <h3>
                      @if (course.icon && course.icon !== 'none') {
                        <span>{{ course.icon }}</span>
                      }
                      {{ course.name }} - Job Profile
                    </h3>
                    <ul class="job-profiles-display">
                      @for (job of course.jobProfiles; track job) {
                        <li>{{ job }}</li>
                      }
                    </ul>
                    <div class="card-actions">
                      <button type="button" class="btn-back" (click)="flipCard(course.id); $event.stopPropagation()">Go Back</button>
                      <div class="action-buttons">
                        <button type="button" class="btn-edit" (click)="editCourse(course); $event.stopPropagation()">Edit</button>
                        <button type="button" class="btn-delete" (click)="deleteCourse(course.id); $event.stopPropagation()">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
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

    .file-preview {
      margin-top: 12px;
      padding: 12px;
      background: #f9f9f9;
      border-radius: 8px;
      text-align: center;
    }

    .preview-img {
      max-width: 300px;
      max-height: 200px;
      border-radius: 8px;
      object-fit: cover;
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

    .text-editor {
      min-height: 150px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 0 0 8px 8px;
      background: #fff;
      font-size: 1rem;
      font-family: inherit;
      line-height: 1.6;
      overflow-y: auto;
      max-height: 300px;
    }

    .text-editor:focus {
      outline: none;
      border-color: #d4af6a;
    }

    .text-editor:empty:before {
      content: attr(placeholder);
      color: #999;
    }

    .job-profiles-input {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
    }

    .btn-add {
      padding: 12px 24px;
      background: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      white-space: nowrap;
    }

    .btn-add:hover {
      background: #45a049;
    }

    .job-profiles-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }

    .job-profile-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: #f0f0f0;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    .btn-remove {
      background: #f44336;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
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

    .btn-cancel {
      background: #666;
      color: #fff;
      padding: 14px 32px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancel:hover {
      background: #555;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
      margin-top: 24px;
    }

    .course-card {
      perspective: 1000px;
      height: 450px;
    }

    .course-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .course-card.flipped .course-card-inner {
      transform: rotateY(180deg);
    }

    .course-card-front,
    .course-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }

    .course-card-front {
      background: #fff;
      cursor: pointer;
    }

    .course-card-back {
      background: linear-gradient(135deg, #fafafa 0%, #fff 100%);
      transform: rotateY(180deg);
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .course-image-wrapper {
      position: relative;
      height: 100%;
      overflow: hidden;
    }

    .course-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.4s ease;
    }

    .course-card-front:hover .course-img {
      filter: brightness(0.6);
    }

    .course-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.85) 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 25px;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .course-card-front:hover .course-overlay {
      opacity: 1;
    }

    .course-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .course-icon-badge {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .refresh-icon {
      width: 35px;
      height: 35px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .refresh-icon:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(180deg);
    }

    .course-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .course-name {
      color: #fff;
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .view-more-btn {
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #1a1a1a;
      padding: 12px 25px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(201, 168, 92, 0.3);
    }

    .view-more-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(201, 168, 92, 0.5);
    }

    .course-details h3 {
      color: #1a1a1a;
      font-size: 1.3rem;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .job-profiles-display {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
      flex: 1;
      overflow-y: auto;
    }

    .job-profiles-display li {
      padding: 12px 16px;
      background: #f9f9f9;
      border-left: 3px solid #d4af6a;
      margin-bottom: 10px;
      border-radius: 6px;
      font-size: 0.95rem;
      color: #333;
    }

    .card-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: auto;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
    }

    .btn-back {
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #1a1a1a;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      width: 100%;
    }

    .btn-back:hover {
      transform: translateY(-2px);
    }

    .btn-edit {
      flex: 1;
      background: #4CAF50;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-edit:hover {
      background: #45a049;
    }

    .btn-delete {
      flex: 1;
      background: #f44336;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-delete:hover {
      background: #da190b;
    }

    @media (max-width: 768px) {
      .courses-grid {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CoursesComponent {
  @ViewChild('descriptionEditor') descriptionEditor?: ElementRef;

  currentCourse: Course = this.getEmptyCourse();
  newJobProfile = '';
  editMode = false;
  flippedCourseId: number | null = null;
  showCustomIconInput = false;
  customIconValue = '';

  courses: Course[] = [
    { 
      id: 1,
      name: 'Makeup', 
      icon: '💄',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop', 
      duration: '3 months',
      description: 'Professional makeup techniques',
      price: '₹35,000',
      jobProfiles: [
        'Makeup Artist',
        'Beauty Advisor',
        'Grooming Consultant',
        'Makeup Educator',
        'Celebrity Makeup Artist'
      ]
    },
    { 
      id: 2,
      name: 'Hair', 
      icon: '✂️',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', 
      duration: '6 months',
      description: 'Master the art of hair styling',
      price: '₹50,000',
      jobProfiles: [
        'Hair Stylist',
        'Hair Color Specialist',
        'Salon Manager',
        'Bridal Hair Expert',
        'Celebrity Hair Stylist'
      ]
    }
  ];

  getEmptyCourse(): Course {
    return {
      id: 0,
      name: '',
      icon: '',
      duration: '',
      description: '',
      price: '',
      image: '',
      jobProfiles: []
    };
  }

  onImageFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.currentCourse.image_file = file;
      
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.currentCourse.image = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onIconChange() {
    this.showCustomIconInput = this.currentCourse.icon === 'custom';
    if (!this.showCustomIconInput) {
      this.customIconValue = '';
    }
  }

  formatText(command: string, value?: string) {
    document.execCommand(command, false, value);
  }

  onEditorInput(event: Event) {
    const editor = event.target as HTMLElement;
    this.currentCourse.description = editor.innerHTML;
  }

  addJobProfile() {
    if (this.newJobProfile.trim()) {
      this.currentCourse.jobProfiles.push(this.newJobProfile.trim());
      this.newJobProfile = '';
    }
  }

  removeJobProfile(index: number) {
    this.currentCourse.jobProfiles.splice(index, 1);
  }

  saveCourse() {
    // If custom icon is selected, use the custom value
    if (this.currentCourse.icon === 'custom' && this.customIconValue.trim()) {
      this.currentCourse.icon = this.customIconValue.trim();
    }
    
    if (this.editMode) {
      const index = this.courses.findIndex(c => c.id === this.currentCourse.id);
      if (index !== -1) {
        this.courses[index] = { ...this.currentCourse };
      }
      alert('Course updated successfully!');
    } else {
      const newCourse = {
        ...this.currentCourse,
        id: this.courses.length + 1
      };
      this.courses.push(newCourse);
      alert('Course added successfully!');
    }
    
    this.currentCourse = this.getEmptyCourse();
    this.editMode = false;
    this.showCustomIconInput = false;
    this.customIconValue = '';
  }

  editCourse(course: Course) {
    this.currentCourse = { ...course, jobProfiles: [...course.jobProfiles] };
    this.editMode = true;
    this.flippedCourseId = null;
    
    // Check if icon is a custom one (not in predefined list)
    const predefinedIcons = ['', 'none', '💄', '✂️', '✨', '💅', '🌸', '💆', '🎨', '👄', '💋', '🌹', '⭐', '💎', '🌺', '🦋', '👑'];
    if (course.icon && !predefinedIcons.includes(course.icon)) {
      this.customIconValue = course.icon;
      this.currentCourse.icon = 'custom';
      this.showCustomIconInput = true;
    } else {
      this.showCustomIconInput = false;
      this.customIconValue = '';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courses = this.courses.filter(c => c.id !== id);
      alert('Course deleted successfully!');
    }
  }

  cancelEdit() {
    this.currentCourse = this.getEmptyCourse();
    this.editMode = false;
    this.showCustomIconInput = false;
    this.customIconValue = '';
  }

  flipCard(courseId: number) {
    this.flippedCourseId = this.flippedCourseId === courseId ? null : courseId;
  }
}
