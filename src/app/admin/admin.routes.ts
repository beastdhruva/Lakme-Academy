
import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadComponent: () => import('./about-section/about-section.component').then(m => m.AboutSectionComponent)
      },
      {
        path: 'courses',
        loadComponent: () => import('./courses/courses.component').then(m => m.CoursesComponent)
      },
      {
        path: 'gallery',
        loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent)
      },
      {
        path: 'events',
        loadComponent: () => import('./events/events.component').then(m => m.EventsComponent)
      },
      {
        path: 'workshops',
        loadComponent: () => import('./workshops/workshops.component').then(m => m.WorkshopsComponent)
      },
      {
        path: 'awards',
        loadComponent: () => import('./awards/awards.component').then(m => m.AwardsComponent)
      },
      {
        path: 'slider',
        loadComponent: () => import('./slider/slider.component').then(m => m.SliderComponent)
      },
      {
        path: 'contact-form',
        loadComponent: () => import('./contact-form/contact-form.component').then(m => m.ContactFormComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'placements',
        loadComponent: () => import('./placements/placements.component').then(m => m.PlacementsComponent)
      },
      {
        path: 'testimonials',
        loadComponent: () => import('./testimonials/testimonials.component').then(m => m.TestimonialsComponent)
      }
    ]
  }
];
