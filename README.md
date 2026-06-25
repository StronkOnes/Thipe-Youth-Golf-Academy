# Thipe Youth Golf Academy (TYGA) Website

This repository contains the source code for the official website of the Thipe Youth Golf Academy (TYGA). It is a modern React application built with TypeScript and Vite, designed to be deployed as a static site on any web hosting provider.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Local Development](#local-development)
3.  [Managing Site Content](#managing-site-content)
4.  [Building for Production](#building-for-production)
5.  [Deployment to Shared Hosting](#deployment-to-shared-hosting)

---

## 1. Prerequisites

### Node.js
You need to have [Node.js](https://nodejs.org/) (which includes `npm`) installed on your machine to run and build the project.

---

## 2. Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open the local address shown in your terminal (e.g., `http://localhost:5173`) in your browser. The site will auto-reload when you save code changes.

---

## 3. Managing Site Content

### Admin Interface
All dynamic content and site branding can be managed through the admin interface after logging in. This includes adding or deleting items for:
*   Team Members
*   Sponsors
*   Events
*   Gallery Photos

Additionally, administrators can change the main **Site Logo** and **Homepage Image** from a special panel on the "About" page. The image uploader allows you to select files directly from your computer. All changes are saved in the browser's local storage, meaning they will persist on the machine where they were made.

### Core Site Images
To make permanent changes to core images that are part of the site's default code, you can follow these steps:
1.  **Place your new image** in the `public/` directory of the project.
2.  **Open the relevant component file** in the `src/components/` directory. For example, for the homepage background, open `src/components/LandingPage.tsx`.
3.  **Find the `<img>` tag** and replace the default `src="..."` value with the path to your new image (e.g., `/new-background.jpg`).
4.  Save the file, then [build and deploy](#building-for-production) the site to make the change live for all users.

---

## 4. Building for Production

To deploy your changes, you must create an optimized `build` of the site. This compiles all code into a small set of static files.

1.  **Run the build command:**
    ```bash
    npm run build
    ```

2.  This creates a new folder named `dist` in your project. This folder contains your complete website.

---

## 5. Deployment to Shared Hosting

Static hosting services (like InfinityFree, cPanel hosting, etc.) serve files directly. You will use an FTP client to upload the contents of your `dist` folder.

1.  **Build your project** by running `npm run build`.
2.  **Use an FTP client** (like [FileZilla](https://filezilla-project.org/)) to connect to your hosting server using the FTP credentials provided by your host.
3.  On the server, navigate to your public web directory (usually `htdocs` or `public_html`).
4.  **Important:** Delete any default files inside this directory.
5.  On your local machine panel, navigate into the `dist` folder.
6.  **Select all files and folders** inside `dist` and upload them to the empty web directory on your server.

Once the upload is complete, your updated website will be live.