# Tech Comparison CMS

Tech Comparison CMS is a content management system built with Nuxt.js and styled using TailwindCSS. It's designed to work seamlessly with the `tech-comparison-backend`, providing a user-friendly interface for managing and updating articles related to technology comparisons.

## Features

- List all articles stored in the backend.
- View detailed content of each article.
- Update sections of an article interactively.
- Save updates to reflect changes in the backend.

## Requirements

- Node.js
- npm

## Installation

First, ensure that the `tech-comparison-backend` project is set up in a sibling directory to this project.

Then clone this repository:

    git clone https://github.com/yourusername/tech-comparison-cms.git
    cd tech-comparison-cms

Install dependencies:

    npm install

## Running the Application

To start both the backend and the CMS interface:

    npm run dev

This command runs the backend server and the Nuxt application in parallel. The backend will be accessible on `http://localhost:4000`, and the Nuxt CMS will be accessible on `http://localhost:3001/`.

## Using the CMS

Navigate to `http://localhost:3001/` in your web browser. Here you can:

- Select an article from the list.
- View and edit the content of the article.
- Save updates to send changes back to the backend.
