THE MEMORY ARCHIVE — CUSTOMER SETUP GUIDE
=========================================

1. PERSONALIZE YOUR WEBSITE
- Open js/config.js in a text editor (Notepad or VS Code).
- Change the names, messages, dates, captions, timeline entries and keepsake messages.
- Keep quotation marks and commas in place.
- For line breaks in the letter, leave blank lines inside the backticks.

2. ADD YOUR PHOTOS
- Put your images inside the images folder.
- Use simple file names, for example: cover.jpg, memory1.jpg, photo1.jpg.
- In js/config.js, change the matching image path.
  Example: image: "images/cover.jpg"
- JPG or WebP is recommended. Resize very large photos before uploading.

3. ADD BACKGROUND MUSIC
- Put an audio file inside the music folder.
- In js/config.js, set file: "music/your-song.mp3"
- Set the title to the song name.
- The recipient must tap the music button before playback can start.
- Only use audio you have permission to share.

4. TEST BEFORE PUBLISHING
- Open index.html in a browser to preview the site.
- Check every image path and all text.
- Test the layout on a phone-sized browser window.
- Test the music button after adding your audio file.

5. PUBLISH WITH GITHUB PAGES
- Sign in or create an account at https://github.com
- Click the + button in the top-right, then choose New repository.
- Name the repository: yourname.github.io
  (Replace yourname with your GitHub username.)
- Set it to Public, then create the repository.
- On the repository page, choose Add file > Upload files.
- Upload the CONTENTS of this folder (index.html, css, js, images, music, README.txt).
  Do not upload only the outer memory-archive folder.
- Click Commit changes.
- Open Settings > Pages.
- Under Build and deployment, choose Deploy from a branch.
- Select Branch: main and Folder: / (root), then Save.
- Wait a few minutes and refresh the Pages settings.
- Your website address will be https://yourname.github.io

IMPORTANT
- GitHub Pages sites are public. Anyone with the link may be able to view the site.
- Do not upload private, sensitive, or embarrassing content.
- Large photos and audio files make websites load slowly. Compress media first.
- GitHub Pages is static hosting. This template does not collect form submissions
  or keep visitor information in a database.
