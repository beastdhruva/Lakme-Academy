import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <nav class="top-navbar">
        <div class="navbar-left">
          <h3>Lakme Academy - Admin</h3>
        </div>
        <div class="navbar-right">
          <div class="admin-info">
            <span class="admin-icon">👤</span>
            <span class="admin-name">Admin User</span>
          </div>
          <button class="logout-btn" (click)="logout()">
            <span>🚪</span>
            Logout
          </button>
        </div>
      </nav>
      <aside class="admin-sidebar">
        <div class="admin-header">
          <h2>Admin Panel</h2>
        </div>
        <nav class="admin-nav">
          <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
            <span class="icon">📊</span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/admin/profile" routerLinkActive="active" class="nav-item">
            <span class="icon">👤</span>
            <span>Profile</span>
          </a>
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
          <a routerLink="/admin/testimonials" routerLinkActive="active" class="nav-item">
            <span class="icon">🎥</span>
            <span>Testimonials</span>
          </a>
          <a routerLink="/admin/placements" routerLinkActive="active" class="nav-item">
            <span class="icon">👥</span>
            <span>Placements</span>
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
      flex-direction: column;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .top-navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      padding: 15px 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      border-bottom: 2px solid #d4af6a;
    }

    .navbar-left h3 {
      margin: 0;
      color: #d4af6a;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .admin-info {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
    }

    .admin-icon {
      font-size: 1.5rem;
    }

    .admin-name {
      font-size: 1rem;
      font-weight: 500;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: #d4af6a;
      color: #1a1a1a;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .logout-btn:hover {
      background: #c9a85c;
      transform: translateY(-2px);
    }

    .admin-container > div {
      display: flex;
      flex: 1;
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

  logout() {
    // Add your logout logic here (clear session, tokens, etc.)
    this.router.navigate(['/']);
  }
}