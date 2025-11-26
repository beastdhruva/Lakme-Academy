
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <h1>Contact Form Submissions</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Submissions</h3>
          <p class="stat-number">{{ submissions.length }}</p>
        </div>
        <div class="stat-card">
          <h3>New Today</h3>
          <p class="stat-number">{{ getNewToday() }}</p>
        </div>
        <div class="stat-card">
          <h3>This Week</h3>
          <p class="stat-number">{{ getThisWeek() }}</p>
        </div>
      </div>

      <div class="list-card">
        <div class="list-header">
          <h2>All Submissions</h2>
          <div class="filters">
            <select [(ngModel)]="selectedCourse" class="filter-select">
              <option value="">All Courses</option>
              <option value="Hair Styling">Hair Styling</option>
              <option value="Makeup Artistry">Makeup Artistry</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Nail Art">Nail Art</option>
              <option value="Complete Beauty Course">Complete Beauty Course</option>
            </select>
            <input type="date" [(ngModel)]="filterDate" class="filter-date">
          </div>
        </div>
        
        <div class="submissions-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Course Interested</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (submission of getFilteredSubmissions(); track submission.id) {
                <tr>
                  <td>{{ submission.date | date:'short' }}</td>
                  <td>{{ submission.name }}</td>
                  <td>{{ submission.mobile }}</td>
                  <td>{{ submission.email }}</td>
                  <td>{{ submission.course }}</td>
                  <td>
                    <div class="action-btns">
                      <button (click)="viewDetails(submission)" class="btn-view">View</button>
                      <button (click)="deleteSubmission(submission.id)" class="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      @if (selectedSubmission) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Submission Details</h2>
              <button (click)="closeModal()" class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
              <div class="detail-row">
                <strong>Name:</strong>
                <span>{{ selectedSubmission.name }}</span>
              </div>
              <div class="detail-row">
                <strong>Mobile:</strong>
                <span>{{ selectedSubmission.mobile }}</span>
              </div>
              <div class="detail-row">
                <strong>Email:</strong>
                <span>{{ selectedSubmission.email }}</span>
              </div>
              <div class="detail-row">
                <strong>Course Interested:</strong>
                <span>{{ selectedSubmission.course }}</span>
              </div>
              <div class="detail-row">
                <strong>Submitted On:</strong>
                <span>{{ selectedSubmission.date | date:'full' }}</span>
              </div>
              @if (selectedSubmission.message) {
                <div class="detail-row">
                  <strong>Message:</strong>
                  <p>{{ selectedSubmission.message }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      }
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

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: #fff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-card h3 {
      margin: 0 0 10px 0;
      color: #666;
      font-size: 0.95rem;
      font-weight: 500;
    }

    .stat-number {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
      color: #d4af6a;
    }

    .list-card {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .list-header h2 {
      margin: 0;
      color: #1a1a1a;
      font-size: 1.3rem;
    }

    .filters {
      display: flex;
      gap: 15px;
    }

    .filter-select, .filter-date {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    .submissions-table {
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
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 2px solid #ddd;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      color: #555;
    }

    tbody tr:hover {
      background: #f9f9f9;
    }

    .action-btns {
      display: flex;
      gap: 8px;
    }

    .btn-view, .btn-delete {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
    }

    .btn-view {
      background: #2196f3;
      color: #fff;
    }

    .btn-view:hover {
      background: #1976d2;
    }

    .btn-delete {
      background: #f44336;
      color: #fff;
    }

    .btn-delete:hover {
      background: #d32f2f;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
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
      max-height: 80vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;
      border-bottom: 1px solid #eee;
    }

    .modal-header h2 {
      margin: 0;
      color: #1a1a1a;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #666;
      line-height: 1;
    }

    .close-btn:hover {
      color: #000;
    }

    .modal-body {
      padding: 30px;
    }

    .detail-row {
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 15px;
    }

    .detail-row strong {
      color: #333;
    }

    .detail-row span, .detail-row p {
      color: #555;
      margin: 0;
    }
  `]
})
export class ContactFormComponent {
  selectedCourse = '';
  filterDate = '';
  selectedSubmission: any = null;

  submissions = [
    {
      id: 1,
      date: new Date('2024-01-15'),
      name: 'Priya Sharma',
      mobile: '+91 9876543210',
      email: 'priya@example.com',
      course: 'Makeup Artistry',
      message: 'I want to know more about the course duration and fees'
    },
    {
      id: 2,
      date: new Date('2024-01-16'),
      name: 'Rahul Kumar',
      mobile: '+91 9876543211',
      email: 'rahul@example.com',
      course: 'Hair Styling',
      message: ''
    },
    {
      id: 3,
      date: new Date(),
      name: 'Sneha Patel',
      mobile: '+91 9876543212',
      email: 'sneha@example.com',
      course: 'Complete Beauty Course',
      message: 'Looking for weekend batches'
    }
  ];

  getFilteredSubmissions() {
    return this.submissions.filter(sub => {
      const courseMatch = !this.selectedCourse || sub.course === this.selectedCourse;
      const dateMatch = !this.filterDate || 
        new Date(sub.date).toDateString() === new Date(this.filterDate).toDateString();
      return courseMatch && dateMatch;
    });
  }

  getNewToday() {
    const today = new Date().toDateString();
    return this.submissions.filter(s => 
      new Date(s.date).toDateString() === today
    ).length;
  }

  getThisWeek() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.submissions.filter(s => 
      new Date(s.date) >= oneWeekAgo
    ).length;
  }

  viewDetails(submission: any) {
    this.selectedSubmission = submission;
  }

  closeModal() {
    this.selectedSubmission = null;
  }

  deleteSubmission(id: number) {
    if (confirm('Are you sure you want to delete this submission?')) {
      this.submissions = this.submissions.filter(s => s.id !== id);
      console.log('Submission deleted:', id);
    }
  }
}
