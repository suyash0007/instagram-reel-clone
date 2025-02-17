# Toastd Video Reels

## Project Overview

Toastd Video Reels is a web application that mimics the Instagram Reels experience, showcasing video content with smooth vertical scrolling

## Thought Process and Design Choices

### 1. Framework Selection

- **Next.js**: Chosen for its server-side rendering capabilities, optimized performance, and seamless integration with React.
- **React**: Used for building a dynamic and interactive user interface.

### 2. Styling

- **Tailwind CSS**: Utilized for rapid UI development and consistent styling across the application.
- **shadcn/ui**: Employed for pre-built, customizable UI components that align with modern design standards.

### 3. Video Playback

- Implemented autoplay and pause functionality based on viewport visibility using the Intersection Observer API.
- Added a global mute/unmute control for better user experience.

### 4. Infinite Scrolling

- Implemented to load more videos as the user scrolls, enhancing the continuous browsing experience.

### 6. Responsive Design

- Ensured the application is fully responsive and works well on mobile, tablet, and desktop devices.
- Used relative units and flexible layouts to maintain consistency across different screen sizes.

## Setup Instructions

### 1. Clone the repository:

```sh
git clone 
cd instagram-reel-clone
```

### 2. Install dependencies:

```sh
npm install
```

### 3. Set up environment variables:

- Create a `.env.local` file in the root directory.
- Add the following environment variables:
  ```sh
  NEXT_PUBLIC_PEXELS_API_KEY=your_pexels_api_key
  ```

### 4. Run the development server:

```sh
npm run dev
```


- Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Smooth vertical scrolling**: Seamless transitions between videos.
- **Auto-play and pause**: Videos play only when visible.
- **Global mute/unmute toggle**: Control sound for all videos.
- **Infinite scrolling**: Loads new videos as the user scrolls.
- **Fully responsive**: Works across mobile, tablet, and desktop devices.

## Tech Stack

- **Next.js** – Server-side rendering and optimized performance.
- **React** – UI components and interactivity.
- **Tailwind CSS** – Modern styling for a sleek interface.
- **shadcn/ui** – Pre-built UI components.
- **Intersection Observer API** – Handles video visibility and playback.
- **Pexels API** – Fetches high-quality video content.

## Deployment

To deploy on **Vercel**, run:

```sh
npm run build
vercel deploy
```


