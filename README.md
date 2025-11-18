# Bad UI Battle - Worst Ticket Flow 🎫💀

This is a **terrible UX experience** created for Bad UI Battle, simulating the worst possible flow to show your ticket to a ticket inspector. Based on the Ruter → Retur rebrand scenario from Norway.

## 🎯 The Experience

Experience 7 intentionally frustrating steps:

1. **Old Ruter App** - Told you need to download new app
2. **Download Retur** - Slow, annoying download with fake errors
3. **New Retur App** - Unnecessary loading delays
4. **Reauthentication** - Digipost code you can't paste, hard to read
5. **Human Verification** - Click crickets that appear for less than a second
6. **Birthday Verification** - Re-enter info because "we can't store it longer than 2 hours"
7. **Show Ticket** - Finally see your ticket (which expires in 30 seconds)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience the horror.

## 📁 Project Structure

- `app/page.tsx` - Main flow controller
- `app/components/Step1OldRuter.tsx` - Old app warning
- `app/components/Step2Download.tsx` - App store download
- `app/components/Step3NewRetur.tsx` - New app welcome
- `app/components/Step4Reauth.tsx` - Digipost authentication
- `app/components/Step5Cricket.tsx` - Human verification game
- `app/components/Step6Birthday.tsx` - Birthday verification (placeholder for custom component)
- `app/components/Step7Ticket.tsx` - Final ticket display

## 🏆 Features (That Make It Terrible)

- ✅ Annoying delays and loading screens
- ✅ Confusing navigation
- ✅ Hard-to-read text and codes
- ✅ No paste functionality
- ✅ Frustrating mini-games
- ✅ Expiring tickets
- ✅ Poor visual design
- ✅ Unhelpful error messages

## 🚀 Deployment to GitHub Pages

This app is configured for GitHub Pages deployment:

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Enable GitHub Pages**: 
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
3. **Automatic Deployment**: 
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy on every push to `main`
   - The app will be available at `https://yourusername.github.io/repository-name`

**Note**: If your repository name is `username.github.io`, update `next.config.ts` to use an empty `basePath`. Otherwise, the basePath is automatically set to `/repository-name`.

## 📝 Notes

- Step 6 (Birthday) uses a custom horrible flow component that requires users to calculate their age in days
- Each step is intentionally designed to be frustrating
- The ticket expires quickly to add extra pressure

**Good luck showing your ticket to the inspector!** 🚌
