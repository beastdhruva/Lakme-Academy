
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🎓</div>
          <div class="stat-content">
            <h3>Total Courses</h3>
            <p class="stat-number">12</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🖼️</div>
          <div class="stat-content">
            <h3>Gallery Images</h3>
            <p class="stat-number">45</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🎉</div>
          <div class="stat-content">
            <h3>Events</h3>
            <p class="stat-number">8</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🔧</div>
          <div class="stat-content">
            <h3>Workshops</h3>
            <p class="stat-number">6</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-content">
            <h3>Awards</h3>
            <p class="stat-number">15</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🎥</div>
          <div class="stat-content">
            <h3>Testimonials</h3>
            <p class="stat-number">24</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>Placements</h3>
            <p class="stat-number">32</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📧</div>
          <div class="stat-content">
            <h3>Contact Forms</h3>
            <p class="stat-number">18</p>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <a routerLink="/admin/courses" class="action-btn">
            <span class="action-icon">➕</span>
            <span>Add New Course</span>
          </a>
          <a routerLink="/admin/gallery" class="action-btn">
            <span class="action-icon">🖼️</span>
            <span>Upload to Gallery</span>
          </a>
          <a routerLink="/admin/events" class="action-btn">
            <span class="action-icon">🎉</span>
            <span>Create Event</span>
          </a>
          <a routerLink="/admin/workshops" class="action-btn">
            <span class="action-icon">🔧</span>
            <span>Schedule Workshop</span>
          </a>
        </div>
      </div>

      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon">🎓</div>
            <div class="activity-content">
              <p><strong>New course added:</strong> Advanced Makeup Artistry</p>
              <span class="activity-time">2 hours ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">🖼️</div>
            <div class="activity-content">
              <p><strong>Gallery updated:</strong> 5 new images uploaded</p>
              <span class="activity-time">5 hours ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">🎉</div>
            <div class="activity-content">
              <p><strong>Event created:</strong> Fashion Week 2024</p>
              <span class="activity-time">1 day ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-icon">🏆</div>
            <div class="activity-content">
              <p><strong>Award added:</strong> Best Academy of the Year</p>
              <span class="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .dashboard {
      max-width: 1400px;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 30px;
    }

    h2 {
      color: #333;
      margin-bottom: 20px;
      margin-top: 40px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: #fff;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 16px;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .stat-icon {
      font-size: 2.5rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      border-radius: 12px;
    }

    .stat-content h3 {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .stat-number {
      margin: 8px 0 0;
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
    }

    .quick-actions {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #1a1a1a;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 106, 0.3);
    }

    .action-icon {
      font-size: 1.5rem;
    }

    .recent-activity {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
      border-left: 4px solid #d4af6a;
    }

    .activity-icon {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 8px;
    }

    .activity-content {
      flex: 1;
    }

    .activity-content p {
      margin: 0;
      color: #333;
    }

    .activity-time {
      font-size: 0.85rem;
      color: #666;
      margin-top: 4px;
      display: block;
    }
  `]
})
export class DashboardComponent { }