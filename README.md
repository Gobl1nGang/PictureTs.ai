# PictureTs.ai Website

A futuristic, AI-powered photography network website built with **Vite**, **Vanilla JS**, and **anime.js**.
Designed with a dark aesthetic inspired by Fetch.ai and featuring the "Picture This.ai" app.

## Features

- **Futuristic Design**: Dark theme (`#0b0c15`) with glowing green accents (`#22c55e`).
- **Advanced Animations**: Particle network background and staggered entrance effects using `anime.js`.
- **Responsive Layout**: Fully responsive design for all devices.
- **3D Assets**: Custom 3D-rendered phone and lens assets.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd PictureTs.ai
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the local development server:

```bash
npm run dev
```

The website will be available at `http://localhost:5173`.

### Building for Production

Build the project for production deployment:

```bash
npm run build
```

The output files will be in the `dist` directory.

### Preview Production Build

Preview the built site locally:

```bash
npm run preview
```

## Project Structure

- `index.html`: Main entry point and HTML structure.
- `style.css`: Global styles, variables, and animations.
- `main.js`: JavaScript logic and `anime.js` animation configurations.
- `public/`: Static assets (images, icons).

## Technologies

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [anime.js](https://animejs.com/) - JavaScript Animation Engine
- [Inter Font](https://fonts.google.com/specimen/Inter) - Primary Typography
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) - Display Typography
