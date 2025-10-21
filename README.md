# VG Website
___

This website is a progect from my year 10 STEM project. It is a website about Vertical Group.[^web]

[^web]:https://gtref.github.io/vg-website.github.io/index.html

___


# MY-VG-WEBSITE

This is a modern, responsive website for the VG (Vertical Group) program at St. Peters College, Palmerston North. It's built with clean HTML, CSS, and vanilla JavaScript, and includes several dynamic features to make it easy to manage and use.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

---

## Features

This website is packed with features designed for a great user experience and easy maintenance:

*   **Dynamic Header & Footer:** The header and footer are loaded dynamically on every page using JavaScript's `fetch` API. This means you only need to update `header.html` or `footer.html` once to see the changes across the entire site.

*   **Light/Dark Theme Switcher:** A theme switcher in the footer allows users to toggle between a high-contrast light mode (black text on white background) and a dark mode (white text on black background).

*   **Persistent Theme:** The user's theme choice is automatically saved to their browser's `localStorage`, so their preference is remembered on their next visit.

*   **Dropdown Navigation:** The navigation menu in the header uses clean, hover-based dropdowns to organize the "Houses" and "Events" sections, keeping the layout uncluttered.

*   **Dynamic Pathing System:** The site uses a clever JavaScript-based system to automatically fix all navigation links and asset paths. This ensures that all links work correctly, whether the page is at the root level or in a subdirectory, which is essential for deployments to services like GitHub Pages.

---

## How It Works

The dynamic pathing system is the core of the site's functionality. Here's a brief overview:

1.  **`page_level` Variable:** Each HTML file contains a small script in its `<head>` that defines a `page_level` variable.
    *   `const page_level = 0;` for pages in the root directory (like `index.html`).
    *   `const page_level = 1;` for pages in a subdirectory (like `house/redwood.html`).

2.  **`main.js` Logic:** The central `main.js` script reads this `page_level` variable to determine the correct relative path (`'./'` or `'../'`).

3.  **Dynamic Path Correction:**
    *   The script uses this calculated path to reliably `fetch` the `header.html` and `footer.html` files.
    *   After the header is loaded, the script iterates through all the navigation links and prepends the correct relative path to their `href` attributes.

This ensures that all links are always correct, no matter where the user is on the site.

---

## Footnotes

**VG** stands for **Vertical Group**, which is an activity group that students are placed in when they first enroll at St. Peters College, Palmerston North. For more information, you can visit the [official school website](https://www.stpeterspn.school.nz/).


