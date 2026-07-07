# NextLab Innovations Website

A production-ready, highly responsive, and premium showcase website for **NextLab Innovations**—a premium AI & product engineering studio. Designed with custom glassmorphism styling, clean micro-interactions, accessibility patterns, and a performant asynchronous contact form integration.

## Key Features

- **Premium UI & Glassmorphic Aesthetics**: Apple/VisionOS-inspired visual elements featuring custom gradients, blur backdrops, and interactive states.
- **Optimized Scroll Reveals**: Hardware-accelerated entrance transitions (`transform: translateY` and `opacity`) driven by `IntersectionObserver` with a viewport buffer to guarantee maximum visibility while scrolling.
- **Accessible FAQ Accordion**: Fully accessible accordion component featuring smooth CSS grid height animations, ARIA toggle indicators (`aria-expanded`, `aria-controls`), and custom keyboard accessibility (Enter/Space trigger).
- **Asynchronous Formspree Form**: Connected to Formspree for contact submissions with inline AJAX handling, loading indicators, submit disable states, and clean success/error visual alerts.
- **Theme Support**: Fully optimized dark mode and light mode color systems.
- **Clean Responsive Layouts**: Fully audited and customized styling for viewports ranging from 320px mobile to ultrawide displays.

## Technologies Used

- **HTML5 & Semantic Elements**
- **TailwindCSS (via CDN)**
- **Vanilla JavaScript (ES6+)**
- **Formspree AJAX Integration**
- **Google Fonts (Poppins & Inter)**

## Local Development

To run the project locally, serve the directory using any HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (via serve)
npx serve
```

Open `http://localhost:8000` (or the port specified by your server) in your browser.
