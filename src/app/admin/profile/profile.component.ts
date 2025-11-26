
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-page">
      <h1>Admin Profile</h1>

      <div class="profile-grid">
        <div class="profile-card">
          <h2>Profile Information</h2>
          <form (ngSubmit)="updateProfile()">
            <div class="avatar-section">
              <div class="avatar">
                <img [src]="profileData.avatar" alt="Admin Avatar">
              </div>
              <button type="button" class="btn-change-avatar" (click)="fileInput.click()">
                Change Avatar
              </button>
              <input #fileInput type="file" accept="image/*" style="display: none;" 
                     (change)="onAvatarSelected($event)">
            </div>

            <div class="form-group">
              <label>Full Name</label>
              <input type="text" class="form-control" [(ngModel)]="profileData.name" name="name">
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" [(ngModel)]="profileData.email" name="email">
            </div>

            <div class="form-group">
              <label>Phone</label>
              <input type="tel" class="form-control" [(ngModel)]="profileData.phone" name="phone">
            </div>

            <div class="form-group">
              <label>Role</label>
              <input type="text" class="form-control" [(ngModel)]="profileData.role" name="role" readonly>
            </div>

            <div class="form-group">
              <label>Bio</label>
              <textarea class="form-control" rows="4" [(ngModel)]="profileData.bio" name="bio"></textarea>
            </div>

            <button type="submit" class="btn-primary">Update Profile</button>
          </form>
        </div>

        <div class="profile-card">
          <h2>Change Password</h2>
          <form (ngSubmit)="changePassword()">
            <div class="form-group">
              <label>Current Password</label>
              <input type="password" class="form-control" [(ngModel)]="passwordData.current" name="current">
            </div>

            <div class="form-group">
              <label>New Password</label>
              <input type="password" class="form-control" [(ngModel)]="passwordData.new" name="new">
            </div>

            <div class="form-group">
              <label>Confirm New Password</label>
              <input type="password" class="form-control" [(ngModel)]="passwordData.confirm" name="confirm">
            </div>

            <button type="submit" class="btn-primary">Change Password</button>
          </form>
        </div>

        <div class="profile-card">
          <h2>Account Settings</h2>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive email updates about new submissions</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="settings.emailNotifications">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="settings.twoFactorAuth">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Activity Alerts</h3>
                <p>Get notified about important activities</p>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="settings.activityAlerts">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <button class="btn-primary" (click)="saveSettings()">Save Settings</button>
        </div>

        <div class="profile-card">
          <h2>Account Statistics</h2>
          <div class="stats-list">
            <div class="stat-row">
              <span class="stat-label">Member Since</span>
              <span class="stat-value">January 2024</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Last Login</span>
              <span class="stat-value">{{ lastLogin }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Total Logins</span>
              <span class="stat-value">247</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Content Created</span>
              <span class="stat-value">156 items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page {
      max-width: 1200px;
    }

    h1 {
      color: #1a1a1a;
      margin-bottom: 30px;
    }

    h2 {
      color: #333;
      margin: 0 0 24px 0;
      font-size: 1.3rem;
    }

    h3 {
      margin: 0;
      font-size: 1rem;
      color: #333;
    }

    .profile-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .profile-card {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .avatar-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
    }

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 16px;
      border: 4px solid #d4af6a;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .btn-change-avatar {
      padding: 8px 20px;
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .btn-change-avatar:hover {
      background: #e0e0e0;
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

    .form-control:read-only {
      background: #f5f5f5;
      cursor: not-allowed;
    }

    textarea.form-control {
      resize: vertical;
    }

    .btn-primary {
      padding: 12px 24px;
      background: linear-gradient(135deg, #d4af6a 0%, #c9a85c 100%);
      color: #1a1a1a;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      width: 100%;
    }

    .btn-primary:hover {
      opacity: 0.9;
    }

    .settings-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 24px;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .setting-info p {
      margin: 4px 0 0;
      font-size: 0.85rem;
      color: #666;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 26px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 26px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }

    input:checked + .toggle-slider {
      background-color: #d4af6a;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(24px);
    }

    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #f9f9f9;
      border-radius: 6px;
    }

    .stat-label {
      color: #666;
      font-weight: 500;
    }

    .stat-value {
      color: #1a1a1a;
      font-weight: 600;
    }
  `]
})
export class ProfileComponent {
  profileData = {
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    name: 'Admin User',
    email: 'admin@lakmeacademy.com',
    phone: '+91 9876543210',
    role: 'Super Admin',
    bio: 'Managing Lakmé Academy Mumbai - Vashi with passion for beauty education.'
  };

  passwordData = {
    current: '',
    new: '',
    confirm: ''
  };

  settings = {
    emailNotifications: true,
    twoFactorAuth: false,
    activityAlerts: true
  };

  lastLogin = new Date().toLocaleString();

  onAvatarSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileData.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    alert('Profile updated successfully!');
  }

  changePassword() {
    if (this.passwordData.new !== this.passwordData.confirm) {
      alert('New passwords do not match!');
      return;
    }
    alert('Password changed successfully!');
    this.passwordData = { current: '', new: '', confirm: '' };
  }

  saveSettings() {
    alert('Settings saved successfully!');
  }
}
