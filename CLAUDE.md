# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a personal portfolio repository containing a professional resume website and career documentation. The main deliverable is a static HTML website showcasing backend engineering experience with LLM applications, specifically tailored for ByteDance's LLM engineer positions.

## Common Commands

### Development Server
```bash
# Start the website server (recommended method)
python3 server.py

# Alternative if python3 is not available
python server.py

# Simple alternative server
python3 simple_server.py
```

The server will:
- Automatically find an available port (default 8000)
- Open the website in your default browser
- Provide live development capabilities

### Direct File Access
```bash
# Open website directly in browser (alternative method)
open index.html  # macOS
```

## Repository Structure

- `index.html` - Main resume website page with semantic HTML5 structure
- `styles.css` - Responsive CSS with mobile-first design and modern styling
- `script.js` - Vanilla JavaScript for animations, navigation, and interactivity
- `server.py` - Full-featured Python HTTP server with security headers, custom logging, and auto-browser opening
- `simple_server.py` - Minimal Python HTTP server for basic development needs
- `docs/` - Source documentation
  - `resume.md` - Original resume content (4 years Alibaba experience, LLM projects)
  - `jd.md` - Target job description (ByteDance LLM Senior Backend Engineer)
- `README.md` - User documentation and setup instructions

## Website Architecture

### Frontend Stack
- **HTML5**: Semantic structure with accessibility features (ARIA labels, proper heading hierarchy)
- **CSS3**: Modern responsive design using CSS Grid and Flexbox
- **JavaScript**: Vanilla JS with Intersection Observer API for animations

### Key Features
- Responsive design (mobile-first approach)
- Smooth scrolling navigation with active section highlighting
- Animated skill bars with progress indicators
- Loading animations and scroll-triggered effects
- Mobile hamburger menu with smooth transitions
- Performance optimizations (throttled scroll events, lazy loading)

### Design Principles
The website is specifically optimized for LLM/AI engineering roles:
- Emphasizes relevant technical experience (Java, Python, LLM applications)
- Highlights large-scale system architecture skills (billion QPS handling)
- Showcases AI application development (Text2SQL system)
- Professional color scheme and typography matching tech industry standards

### Content Alignment
Content is strategically aligned with the target ByteDance position:
- LLM application development experience
- Backend system optimization skills  
- Data processing and analysis capabilities
- Product consciousness and innovation mindset
- Learning ability and curiosity (as required in job description)

## Development Notes

- All styling uses CSS custom properties (variables) for easy theming
- JavaScript is modular and uses modern ES6+ features
- Server includes security headers and proper MIME type handling
- No external dependencies - completely self-contained static site
- Optimized for fast loading and smooth performance