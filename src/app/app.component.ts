import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Lakme Academy Mumbai - Vashi';
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  courses = [
    { name: 'Hair Styling', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop', description: 'Master the art of hair styling' },
    { name: 'Makeup Artistry', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop', description: 'Professional makeup techniques' },
    { name: 'Skin Care', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop', description: 'Advanced skincare treatments' },
    { name: 'Nail Art', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop', description: 'Creative nail art designs' }
  ];

  galleryImages = [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=300&fit=crop'
  ];

  highlights = [
    'Professional faculty with industry experience',
    'State-of-the-art infrastructure',
    'Hands-on practical training',
    'Industry-recognized certification',
    'Placement assistance',
    '100% job oriented courses'
  ];

  events = [
    { title: 'Backstage Drama', image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=300&fit=crop', description: 'Behind the scenes of fashion shows' },
    { title: 'Fashion Week', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=300&fit=crop', description: 'Exclusive fashion week coverage' }
  ];

  testimonials = [
    { name: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', text: 'Lakme Academy transformed my passion into a career. The training was exceptional!' },
    { name: 'Rahul Verma', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', text: 'Best decision of my life. Now working with top celebrities!' },
    { name: 'Sneha Patel', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', text: 'Professional training with placement support. Highly recommended!' }
  ];

  placements = [
    { name: 'Aisha Khan', role: 'Senior Makeup Artist', company: 'Bollywood Studios', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop' },
    { name: 'Vikram Singh', role: 'Hair Stylist', company: 'Lakme Salon', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
    { name: 'Neha Gupta', role: 'Beauty Expert', company: 'Fashion TV', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' }
  ];
}
