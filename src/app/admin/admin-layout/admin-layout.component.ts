
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <aside class="admin-sidebar">
        <div class="admin-header">
          <h2>Admin Panel</h2>
        </div>
        <nav class="admin-nav">
          <a routerLink="/admin/about" routerLinkActive="active" class="nav-item">
            <span class="icon">ℹ️</span>
            <span>About Section</span>
          </a>
          <a routerLink="/admin/courses" routerLinkActive="active" class="nav-item">
            <span class="icon">🎓</span>
            <span>Courses</span>
          </a>
          <a routerLink="/admin/gallery" routerLinkActive="active" class="nav-item">
            <span class="icon">🖼️</span>
            <span>Gallery</span>
          </a>
          <a routerLink="/admin/events" routerLinkActive="active" class="nav-item">
            <span class="icon">🎉</span>
            <span>Events</span>
          </a>
          <a routerLink="/admin/workshops" routerLinkActive="active" class="nav-item">
            <span class="icon">🔧</span>
            <span>Workshops</span>
          </a>
          <a routerLink="/admin/awards" routerLinkActive="active" class="nav-item">
            <span class="icon">🏆</span>
            <span>Awards</span>
          </a>
          <a routerLink="/admin/slider" routerLinkActive="active" class="nav-item">
            <span class="icon">🎬</span>
            <span>Slider</span>
          </a>
          <a routerLink="/admin/contact-form" routerLinkActive="active" class="nav-item">
            <span class="icon">📧</span>
            <span>Contact Form</span>
          </a>
        </nav>
        <button class="back-btn" (click)="goToHome()">← Back to Website</button>
      </aside>
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .admin-sidebar {
      width: 280px;
      background: #1a1a1a;
      color: #fff;
      display: flex;
      flex-direction: column;
    }

    .admin-header {
      padding: 24px;
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #1a1a1a;
    }

    .admin-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .admin-nav {
      flex: 1;
      padding: 20px 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background: rgba(212, 175, 106, 0.1);
      border-left-color: #d4af6a;
    }

    .nav-item.active {
      background: rgba(212, 175, 106, 0.2);
      border-left-color: #d4af6a;
    }

    .icon {
      font-size: 1.3rem;
    }

    .back-btn {
      margin: 20px;
      padding: 12px;
      background: #333;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.95rem;
    }

    .back-btn:hover {
      background: #444;
    }

    .admin-content {
      flex: 1;
      padding: 40px;
      overflow-y: auto;
    }
  `]
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
