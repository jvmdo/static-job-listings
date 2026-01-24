# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

Time estimation: 10h

### Step by step

1. Starting off by the most difficult layout
   - Job card (+4h30)
      - Mobile
      - Got stuck in the "flex-wrap empty space hell"
      - Desktop

2. Filters + general layout (+3h30)

3. Fake server with MSW (+1h)

4. Nuqs (+3h30)
    - Got stuck on the initial complexity of `useQueryStates` + Query integration + filtering
    - Stale query issue

5. Dataset [7:00 PM]
    - Change some fields

6. Pagination

7. Animation

8. Handle not so happy path
    - Empty (no results for filter, no results at all)
    - API error

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Styled Components](https://styled-components.com/) - For styles

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

- A child element's vertical margin can affect its parent's position due to a CSS behavior called margin collapsing. This happens when there is no content, padding, or border to separate the top margin of the first child from the parent's top edge. Adding padding, border, overflow other than visible, flex or grid solves the issue.

- There is no CSS-only solution for shrink to fit the empty space left by `flex-wrap`.

- Remember: relative URL is `fetch()` is resolved relative to the current page URL, not project root.

- Remember: place `data.json` files in `public` directory (Vite) otherwise it won't be found by `fetch()`! Files in this folder won't be bundled. They will be fetched dynamically instead.

- Remember: `twMerge("...", className)` (className after defined styles) otherwise you would need to `!important`

- I ran into the situation where `URLSearchParams` was getting stale values from within `queryFn`. This happens because nuqs state update is instantaneous but URL updates are *asynchronous*. That way, when the `queryFn` is invoked, the URL search params are not fresh yet!
  - The solution is straightforward: just use the `queryKey` to build the query params instead.

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

<https://github.com/w3c/csswg-drafts/issues/191>

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
