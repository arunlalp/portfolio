# Profile Image Setup

## To use your LinkedIn profile image:

1. **Download your LinkedIn profile image:**
   - Go to your LinkedIn profile: https://www.linkedin.com/in/arun-lal-preman
   - Right-click on your profile image
   - Save it as `arun-profile.jpg`

2. **Add the image to your portfolio:**
   - Create an `assets` folder in your project root if it doesn't exist
   - Place the downloaded image as `assets/arun-profile.jpg`
   - The portfolio will automatically use this image

3. **Alternative method (if you prefer a direct URL):**
   - If you have a direct URL to your profile image, you can update line 71 in `index.html`:
   ```html
   <img src="YOUR_LINKEDIN_IMAGE_URL" alt="Arun Lal" class="profile-photo"
   ```

## Recommended image specifications:
- **Size:** 800x800 pixels or larger (square format works best)
- **Format:** JPG or PNG
- **Quality:** High resolution for crisp display on all devices

The image will be automatically cropped to a circle and optimized for display.