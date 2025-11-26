import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'Lakme Academy Mumbai - Vashi';
  mobileMenuOpen = false;
  currentAboutSlide = 0;

  @ViewChild('videoWrapper') videoWrapper!: ElementRef;
  @ViewChild('videoFrame') videoFrame!: ElementRef;
  @ViewChild('gallerySlider') gallerySlider!: ElementRef;
  @ViewChild('eventsSlider') eventsSlider!: ElementRef;
  @ViewChild('workshopsSlider') workshopsSlider!: ElementRef;
  @ViewChild('awardsSlider') awardsSlider!: ElementRef;
  @ViewChild('testimonialsSlider') testimonialsSlider!: ElementRef;

  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private isDraggingEvents = false;
  private startXEvents = 0;
  private scrollLeftEvents = 0;
  private isDraggingWorkshops = false;
  private startXWorkshops = 0;
  private scrollLeftWorkshops = 0;
  private isDraggingAwards = false;
  private startXAwards = 0;
  private scrollLeftAwards = 0;
  private isDraggingTestimonials = false;
  private startXTestimonials = 0;
  private scrollLeftTestimonials = 0;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Lifecycle hook implementation
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  togglePictureInPicture() {
    const iframe = this.videoFrame.nativeElement;
    // Note: YouTube iframes don't support native PiP, but we can open in new window
    const videoUrl = iframe.src.replace('embed/', 'watch?v=').split('?')[0];
    window.open(videoUrl, 'PiP', 'width=640,height=360');
  }

  toggleFullscreen() {
    const wrapper = this.videoWrapper.nativeElement;
    if (!document.fullscreenElement) {
      wrapper.requestFullscreen().catch((err: Error) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  aboutImages = [
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=500&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=500&fit=crop',
    'https://images.unsplash.com/photo-1583241800698-fa0286d2d1d4?w=600&h=500&fit=crop'
  ];

  expandedCourse: number | null = null;

  courses = [
    { 
      name: 'Makeup', 
      icon: '💄',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop', 
      description: 'Professional makeup techniques',
      jobProfiles: [
        'Makeup Artist',
        'Beauty Advisor',
        'Grooming Consultant',
        'Makeup Educator',
        'Beauty Brand Trainer',
        'Celebrity Makeup Artist',
        'Cosmetic Consultant & Product Specialist',
        'Backstage & Runway Expert Makeup Artist'
      ]
    },
    { 
      name: 'Hair', 
      icon: '✂️',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', 
      description: 'Master the art of hair styling',
      jobProfiles: [
        'Hair Stylist',
        'Hair Color Specialist',
        'Salon Manager',
        'Bridal Hair Expert',
        'Hair Extension Specialist',
        'Trichologist',
        'Fashion Show Hair Stylist',
        'Celebrity Hair Stylist'
      ]
    },
    { 
      name: 'Skin', 
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop', 
      description: 'Advanced skincare treatments',
      jobProfiles: [
        'Skin Care Specialist',
        'Aesthetician',
        'Facial Expert',
        'Spa Therapist',
        'Dermatology Assistant',
        'Beauty Wellness Coach',
        'Product Consultant',
        'Anti-Aging Specialist'
      ]
    }
  ];

  toggleCourse(index: number) {
    if (this.expandedCourse === index) {
      this.expandedCourse = null;
    } else {
      this.expandedCourse = index;
    }
  }

  changeAboutSlide(direction: number) {
    this.currentAboutSlide = (this.currentAboutSlide + direction + this.aboutImages.length) % this.aboutImages.length;
  }

  goToAboutSlide(index: number) {
    this.currentAboutSlide = index;
  }

  galleryImages = [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583241800698-fa0286d2d1d4?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop'
  ];

  scrollGallery(direction: 'prev' | 'next') {
    const slider = this.gallerySlider.nativeElement;
    const scrollAmount = slider.offsetWidth * 0.7;

    if (direction === 'next') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  onGalleryMouseDown(event: MouseEvent) {
    const slider = this.gallerySlider.nativeElement;
    this.isDragging = true;
    this.startX = event.pageX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;
  }

  onGalleryMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const slider = this.gallerySlider.nativeElement;
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - this.startX) * 2;
    slider.scrollLeft = this.scrollLeft - walk;
  }

  onGalleryMouseUp() {
    this.isDragging = false;
  }

  onGalleryMouseLeave() {
    this.isDragging = false;
  }

  highlights = [
    'Professional faculty with industry experience',
    'State-of-the-art infrastructure',
    'Hands-on practical training',
    'Industry-recognized certification',
    'Placement assistance',
    '100% job oriented courses'
  ];

  events = [
    { 
      title: 'The Showcase', 
      image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&h=400&fit=crop', 
      description: 'The Showcase by Lakmé Academy is an annual extravaganza that celebrates the artistry, talent, and innovation of aspiring beauty professionals. It provides students with a platform to display their expertise in makeup, hair, and styling through theme-based creations.' 
    },
    { 
      title: 'Backstage Drama', 
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop', 
      description: 'Behind the scenes of fashion shows - where our students get real-world experience working with professional models and photographers in high-pressure environments.' 
    },
    { 
      title: 'Fashion Week', 
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c05?w=600&h=400&fit=crop', 
      description: 'Exclusive fashion week coverage - our students work backstage at major fashion events, gaining invaluable industry exposure and networking opportunities.' 
    },
    { 
      title: 'Beauty Masterclass', 
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop', 
      description: 'Learn from industry experts in our exclusive masterclass sessions covering the latest trends, techniques, and innovations in the beauty industry.' 
    },
    { 
      title: 'Student Exhibition', 
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', 
      description: 'Annual student exhibition showcasing creative work, innovative techniques, and artistic expression from our talented students across all courses.' 
    }
  ];

  scrollEvents(direction: 'prev' | 'next') {
    const slider = this.eventsSlider.nativeElement;
    const scrollAmount = slider.offsetWidth * 0.7;

    if (direction === 'next') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  onEventsMouseDown(event: MouseEvent) {
    const slider = this.eventsSlider.nativeElement;
    this.isDraggingEvents = true;
    this.startXEvents = event.pageX - slider.offsetLeft;
    this.scrollLeftEvents = slider.scrollLeft;
  }

  onEventsMouseMove(event: MouseEvent) {
    if (!this.isDraggingEvents) return;
    event.preventDefault();
    const slider = this.eventsSlider.nativeElement;
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - this.startXEvents) * 2;
    slider.scrollLeft = this.scrollLeftEvents - walk;
  }

  onEventsMouseUp() {
    this.isDraggingEvents = false;
  }

  onEventsMouseLeave() {
    this.isDraggingEvents = false;
  }

  workshops = [
    {
      title: 'Future of Makeup',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
      description: 'Join our exclusive workshops conducted by industry experts and celebrity makeup artists. Learn the latest trends, techniques, and innovations in the beauty industry.',
      features: [
        'Celebrity makeup masterclass',
        'Bridal makeup workshops',
        'Fashion week preparation',
        'Special effects makeup'
      ]
    },
    {
      title: 'Hair Styling Mastery',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
      description: 'Master the art of hair styling with our comprehensive workshop. Learn cutting-edge techniques from top stylists.',
      features: [
        'Advanced cutting techniques',
        'Color theory and application',
        'Bridal hair styling',
        'Editorial and runway looks'
      ]
    },
    {
      title: 'Skin Care Excellence',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
      description: 'Discover the science of skincare and learn professional techniques for flawless skin treatment.',
      features: [
        'Facial treatments',
        'Anti-aging techniques',
        'Product knowledge',
        'Skin analysis methods'
      ]
    }
  ];

  scrollWorkshops(direction: 'prev' | 'next') {
    const slider = this.workshopsSlider.nativeElement;
    const scrollAmount = slider.offsetWidth * 0.7;

    if (direction === 'next') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  onWorkshopsMouseDown(event: MouseEvent) {
    const slider = this.workshopsSlider.nativeElement;
    this.isDraggingWorkshops = true;
    this.startXWorkshops = event.pageX - slider.offsetLeft;
    this.scrollLeftWorkshops = slider.scrollLeft;
  }

  onWorkshopsMouseMove(event: MouseEvent) {
    if (!this.isDraggingWorkshops) return;
    event.preventDefault();
    const slider = this.workshopsSlider.nativeElement;
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - this.startXWorkshops) * 2;
    slider.scrollLeft = this.scrollLeftWorkshops - walk;
  }

  onWorkshopsMouseUp() {
    this.isDraggingWorkshops = false;
  }

  onWorkshopsMouseLeave() {
    this.isDraggingWorkshops = false;
  }

  awards = [
    {
      title: 'Winner of Global Education Awards 2019',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop',
      description: 'Lakmé Academy Powered By Aptech won the Global Education Awards 2019 for "Best Beauty & Wellness Training Institute of the Year"™, recognizing its excellence in shaping aspiring beauticians into skilled professionals in cosmetology, hair, makeup, and skin experts.'
    },
    {
      title: 'National Education Excellence Award',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1c05?w=600&h=400&fit=crop',
      description: 'Recognized for outstanding contribution to beauty education and training excellence. This prestigious award celebrates our commitment to delivering world-class education in beauty and wellness.'
    },
    {
      title: 'Best Industry Partnership Award',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop',
      description: 'Honored for exceptional collaboration with industry leaders and providing students with real-world exposure through partnerships with top beauty brands and fashion events.'
    }
  ];

  videoTestimonials = [
    {
      title: 'Craft. Confidence. Recognition: Jyoti Chaturvedi\'s Story',
      thumbnail: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
      channel: 'Lakmé Academy Powered By Aptech',
      videoUrl: '#'
    },
    {
      title: 'Winning Gold & Making Moves | Pallavi Munda\'s Path to Success!',
      thumbnail: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop',
      channel: 'Lakmé Academy Powered By Aptech',
      videoUrl: '#'
    },
    {
      title: 'From Passion to Profession: Rima Dugar\'s Story',
      thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop',
      channel: 'Lakmé Academy Powered By Aptech',
      videoUrl: '#'
    }
  ];

  placements = [
    { name: 'Rahul Jadhav', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop' },
    { name: 'Shakir Ali', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
    { name: 'Tisha Verma', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' }
  ];

  scrollAwards(direction: 'prev' | 'next') {
    const slider = this.awardsSlider.nativeElement;
    const scrollAmount = slider.offsetWidth;

    if (direction === 'next') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  onAwardsMouseDown(event: MouseEvent) {
    const slider = this.awardsSlider.nativeElement;
    this.isDraggingAwards = true;
    this.startXAwards = event.pageX - slider.offsetLeft;
    this.scrollLeftAwards = slider.scrollLeft;
  }

  onAwardsMouseMove(event: MouseEvent) {
    if (!this.isDraggingAwards) return;
    event.preventDefault();
    const slider = this.awardsSlider.nativeElement;
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - this.startXAwards) * 2;
    slider.scrollLeft = this.scrollLeftAwards - walk;
  }

  onAwardsMouseUp() {
    this.isDraggingAwards = false;
  }

  onAwardsMouseLeave() {
    this.isDraggingAwards = false;
  }

  scrollTestimonials(direction: 'prev' | 'next') {
    const slider = this.testimonialsSlider.nativeElement;
    const scrollAmount = slider.offsetWidth * 0.7;

    if (direction === 'next') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  onTestimonialsMouseDown(event: MouseEvent) {
    const slider = this.testimonialsSlider.nativeElement;
    this.isDraggingTestimonials = true;
    this.startXTestimonials = event.pageX - slider.offsetLeft;
    this.scrollLeftTestimonials = slider.scrollLeft;
  }

  onTestimonialsMouseMove(event: MouseEvent) {
    if (!this.isDraggingTestimonials) return;
    event.preventDefault();
    const slider = this.testimonialsSlider.nativeElement;
    const x = event.pageX - slider.offsetLeft;
    const walk = (x - this.startXTestimonials) * 2;
    slider.scrollLeft = this.scrollLeftTestimonials - walk;
  }

  onTestimonialsMouseUp() {
    this.isDraggingTestimonials = false;
  }

  onTestimonialsMouseLeave() {
    this.isDraggingTestimonials = false;
  }

  playVideo(videoUrl: string) {
    // Open video in a new window/tab
    if (videoUrl && videoUrl !== '#') {
      window.open(videoUrl, '_blank');
    } else {
      // For demo purposes, you can add actual video URLs to the videoTestimonials array
      alert('Video URL will be added soon!');
    }
  }

  shareVideo(testimonial: any) {
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: testimonial.title,
        text: `Check out this testimonial: ${testimonial.title}`,
        url: testimonial.videoUrl || window.location.href
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: Copy to clipboard
      const shareText = `${testimonial.title} - ${testimonial.videoUrl || window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Share link: ' + shareText);
      });
    }
  }

  // Helper method to check if the current route is an admin route
  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}