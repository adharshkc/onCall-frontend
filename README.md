# Carely - Senior Care Next.js Website

This is a Next.js conversion of the Carely senior care HTML template. The website provides information about senior care services and allows users to book appointments.

## Features

- 🚀 **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 💻 **TypeScript** for type safety
- 📱 **Responsive Design**
- 🎭 **Custom CSS animations** from the original template
- 📝 **Contact and appointment booking forms**
- 🖼️ **Optimized images** with Next.js Image component

## Pages

- **Home** (`/`) - Main landing page with hero, services, about, and FAQ sections
- **About** (`/about`) - Information about Carely's mission and values
- **Services** (`/services`) - Overview of all care services offered
- **Contact** (`/contact`) - Contact form and contact information
- **Book Appointment** (`/book-appointment`) - Appointment booking form

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── book-appointment/  # Appointment booking page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home/              # Home page components
│   │   ├── AboutSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── WhyChooseSection.tsx
│   └── layout/            # Layout components
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── Preloader.tsx
├── styles/                # Custom CSS files
│   ├── animate.css        # Animation styles
│   └── custom.css         # Custom component styles
└── public/                # Static assets
    ├── images/            # Images from original template
    └── webfonts/          # Web fonts
```

## Customization

### Styling
- Custom styles are in `src/styles/custom.css`
- Tailwind CSS classes can be used throughout components
- Font Awesome icons are included via CDN in `globals.css`

### Content
- Update company information in the components
- Modify contact details in the Header and Footer components
- Add or remove services in the Services section

### Images
- All images are stored in `public/images/`
- Images are optimized using Next.js Image component
- Replace images with your own while maintaining the same file structure

## Dependencies

### Core
- Next.js 15
- React 18
- TypeScript

### Styling & UI
- Tailwind CSS
- Bootstrap (via CDN)
- Font Awesome (via CDN)

### Animations & Effects
- Framer Motion
- AOS (Animate On Scroll)
- GSAP
- Swiper.js

### Fonts
- Lora (serif) - for headings
- Plus Jakarta Sans (sans-serif) - for body text

## Build for Production

```bash
npm run build
npm start
```

## Original Template

This Next.js version is based on the Carely HTML template, maintaining the original design while adding modern React functionality and improved performance.

## License

This project is for demonstration purposes. Please ensure you have proper licensing for any commercial use of the original template assets.
