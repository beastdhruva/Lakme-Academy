# Lakme Academy Mumbai - Vashi Website

## Overview
A single-page website for Lakme Academy Mumbai - Vashi center, featuring a professional beauty and cosmetology training academy design with gold and black color theme.

## Project Structure
```
src/
├── app/
│   ├── app.component.ts      # Main component with data and logic
│   ├── app.component.html    # HTML template with all sections
│   ├── app.component.css     # Component-specific styles
│   ├── app.config.ts         # Angular configuration
│   └── app.routes.ts         # Routing configuration
├── styles.css                # Global styles
├── index.html                # Main HTML entry point
└── main.ts                   # Angular bootstrap
```

## Features
- **Header**: Fixed navigation with Lakme Academy branding
- **Hero Section**: Full-screen hero with counseling enquiry form
- **About Us**: Academy introduction with features
- **Courses**: Card-based course display (Hair Styling, Makeup Artistry, Skin Care, Nail Art)
- **Gallery**: Image grid showcase
- **Highlights**: Key features of the academy
- **Events**: Event cards with images
- **Workshops**: Workshop information section
- **Awards**: Recognition and awards display
- **Testimonials**: Student feedback section
- **Job Placements**: Success stories of placed students
- **Contact**: Contact information and location
- **Footer**: Links and social media

## Technical Details
- Built with Angular 18 (standalone components)
- Responsive design with mobile hamburger menu
- Gold (#c9a85c) and black (#1a1a1a) color theme
- Uses Playfair Display and Poppins fonts

## Running the Application
```bash
npx ng serve --host 0.0.0.0 --port 5000 --disable-host-check
```

## Configuration
- Port: 5000
- Host: 0.0.0.0 (accessible from all interfaces)
- Angular dev server configured in angular.json

## Recent Changes
- November 2024: Initial website creation with all sections
- Added mobile responsive navigation with toggle functionality
