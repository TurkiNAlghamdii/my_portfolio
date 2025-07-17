# Personal Portfolio

A modern, responsive personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- ✨ **Modern Design**: Clean, professional design with smooth animations
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Built with Next.js for optimal performance
- 🎨 **Customizable**: Easy to customize colors, content, and layout
- 🔒 **Type Safe**: Written in TypeScript for better development experience
- 📊 **Database Ready**: Supabase integration for dynamic content management

## Sections

- **Hero**: Eye-catching introduction with social links
- **About**: Personal information and background
- **Skills**: Technical skills with progress bars
- **Projects**: Portfolio projects with descriptions and links
- **Contact**: Contact form and information
- **Footer**: Additional links and information

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (optional, for database features)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my_portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information

Update the following files with your personal information:

- `src/components/hero.tsx` - Name, title, and social links
- `src/components/about.tsx` - About section content
- `src/components/skills.tsx` - Your skills and proficiency levels
- `src/components/projects.tsx` - Your projects and their details
- `src/components/contact.tsx` - Contact information
- `src/components/footer.tsx` - Footer content

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors: Modify the color scheme in the components
- Fonts: Update font settings in `src/app/layout.tsx`
- Layout: Adjust spacing and layout in individual components

### Adding Database Features

To use Supabase for dynamic content:

1. Create tables in your Supabase dashboard
2. Update the Supabase client in `src/lib/supabase.ts`
3. Add database operations to your components

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help customizing the portfolio, feel free to:
- Open an issue on GitHub
- Contact me through the portfolio contact form
- Check the Next.js documentation for framework-specific questions
