# 🚀 SolvedThis

![App Screenshoot](/public/home.png)

SolvedThis is a modern discussion platform that empowers communities to engage in meaningful conversations. Built with cutting-edge technologies, it offers a seamless experience for creating, sharing, and engaging with content. SolvedThis promotes healthy discussions within a secure and user-friendly environment.

## 🚀 Features

### Interactive Discussions

- **Create Threads:** Users can easily create new discussion threads with rich text formatting and multimedia support
- **Engage with Content:** Like, save, and share interesting discussions with the community
- **Reply System:** Participate in conversations through threaded replies and nested discussions
- **Rich Text Editor:** Customize content with a powerful editor supporting markdown, images, and code snippets

### User Experience

- **Light/Dark Mode:** Toggle between light and dark themes for comfortable viewing
- **Responsive Design:** Seamless experience across all devices and screen sizes
- **Smart Search:** Find relevant discussions and content quickly
- **User Profiles:** Customize your profile and track your contributions
- **User Reputation:** Earn points for quality contributions

### Security & Authentication

- **Email Verification:** Secure account creation with email verification
- **Password Recovery:** Easy password reset process through email
- **OAuth Integration:** Multiple sign-in options for user convenience
- **Account Management:** Update profile information and security settings

### Upcoming Features

- **Report System:** Community moderation through content reporting

## 🛠 Techstack

- **Nextjs:** React framework for production
- **TypeScript:** Type-safe code
- **Drizzle ORM:** Modern TypeScript ORM
- **PostgreSQL:** Reliable database solution
- **Better-Auth:** Secure authentication system
- **Shadcn/UI:** Beautiful UI components
- **TailwindCSS:** Utility-first CSS
- **Tiptap:** Rich text editor integration
- **Uploadthing:** Manage file uploads

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/Ibaliqbal/SolvedThis.git
```

2. Go to the project directory

```bash
  cd SolvedThis
```

3. Install dependencies

```bash
  pnpm install
```

4. Set up environment variables

```bash
  cp .env.example .env.local
```

5. Set up the database
   Before running the project, set up your PostgreSQL database and update your environment variables:

```bash
  BETTER_AUTH_SECRET=
  BETTER_AUTH_URL=http://localhost:3000

  DATABASE_CONNECTION_STRING=postgresql://username:YOUR_PASSWORD@host:port/dbname

  RESEND_API_KEY=
  EMAIL_VERIFICATION_CALLBACK_URL=http://localhost:3000/email-verified

  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=

  GITHUB_CLIENT_ID=
  GITHUB_CLIENT_SECRET=

  NEXT_PUBLIC_APP_URL=http://localhost:3000
```

6. Run database migrations

```bash
  pnpm db:generate
   pnpm db:migrate
```

7. Start the server

```bash
  pnpm dev
```

## Usage

After logging in, users can:

- Create new discussion threads
- Engage with existing content through likes and replies
- Use the rich text editor for creating content

## Footer

SolvedThis - Fostering Meaningful Discussions

<div align="center">Don't forget to ⭐ this repo if you found it helpful!</div>
