// Prototype content. In the real site each project becomes one MDX file in content/projects/.
// Adding a project = adding one entry here (later: one .mdx file).
window.PROJECTS = [
  {
    slug: "task-master",
    name: "Task Master",
    tagline: "A personal planner that shows exactly what today holds, then reviews how your week went.",
    accent: "#16a34a",
    accent2: "#0ea5e9",
    live: "https://taskmaster-eight-sigma.vercel.app/",
    embed: false, // site sends X-Frame-Options: DENY, so show a placeholder until real screenshots exist
    repo: "https://github.com/michaelhughes45/task-master",
    role: "Solo: design, build, deploy",
    type: "Installable web app (PWA)",
    year: "2026",
    status: "Live",
    chips: ["Next.js", "TypeScript", "Postgres", "Prisma", "Better Auth", "Tailwind"],
    highlights: [
      "Google Calendar–style repeating events and tasks, with “this one / following / all” edits",
      "Timezone- and daylight-saving-safe date logic, backed by 76 unit tests",
      "Installs to your phone, with a Sunday push notification for the weekly review",
    ],
    problem:
      "Calendars handle appointments and to-do apps handle tasks, but neither gives one morning view of the day, and neither shows how the week actually went.",
    solution:
      "Task Master puts timed events and daily and weekly to-dos in one place, records what got done (and what was missed or done late), and turns it into a weekly review.",
    features: [
      { icon: "home", title: "Today page", text: "The screen to open in the morning: today's events in order, today's and this week's to-dos, and anything still open from earlier." },
      { icon: "calendar", title: "Day, week and month calendar", text: "Events with times, locations, notes and colors, viewable at any zoom level." },
      { icon: "repeat", title: "Recurrence", text: "Daily, weekly on chosen days, monthly, yearly or custom, ending never, on a date or after N times." },
      { icon: "chart", title: "Weekly review", text: "Completion rate, done and missed lists, time spent, most-missed habits and a comparison with last week." },
      { icon: "bell", title: "PWA and push", text: "Installable on phone and desktop, with a web-push reminder when the week's review is ready." },
      { icon: "shield", title: "Accounts", text: "Email and password or Google sign-in, with email verification and password reset." },
    ],
    stack: [
      { group: "Frontend", items: [
        { name: "Next.js 16", short: "N", why: "App Router with Server Components and Server Actions, so there's no separate API to maintain." },
        { name: "Tailwind v4 + shadcn/ui", short: "Tw", why: "Accessible components and light/dark theme tokens taken straight from the mockups." },
      ]},
      { group: "Backend & data", items: [
        { name: "Neon Postgres", short: "Pg", why: "Serverless Postgres with separate development and production branches." },
        { name: "Prisma", short: "Pr", why: "Typed queries, migrations and a seed script that creates a demo account." },
        { name: "Better Auth", short: "BA", why: "Email/password and Google sign-in, sessions, verification and reset." },
        { name: "Resend", short: "Rs", why: "Sends the verification and password-reset emails." },
      ]},
      { group: "Logic & tooling", items: [
        { name: "rrule", short: "rr", why: "RFC 5545 repeat rules, the same format Google Calendar uses." },
        { name: "date-fns + tz", short: "df", why: "Timezone-aware date math for “today” in the user's own zone." },
        { name: "Vitest", short: "Vi", why: "Unit tests for server actions, date helpers and recurrence." },
        { name: "Vercel", short: "▲", why: "Hosting, plus a weekly cron job that triggers the review notification." },
      ]},
    ],
    arch: {
      flow: [
        { t: "Browser / installed PWA", s: "React 19 UI" },
        { t: "Next.js on Vercel", s: "Server Components · Actions", main: true, label: "HTTPS" },
        { t: "Prisma", s: "typed queries", label: "server only" },
        { t: "Neon Postgres", s: "dev + prod branches", label: "SQL" },
      ],
      extras: [
        { e: "Auth", t: "Better Auth", s: "sessions in Postgres, Google OAuth" },
        { e: "Email", t: "Resend", s: "verify + reset links" },
        { e: "Weekly", t: "Vercel Cron → Web Push", s: "“Your review is ready”" },
      ],
    },
    challenges: [
      { title: "Getting “today” right everywhere", text: "Every date is worked out in the user's own timezone. Daylight-saving gaps and repeated hours broke the obvious library approach, so time conversion is built on UTC offsets and tested against New York, Auckland, Havana and São Paulo edge cases." },
      { title: "Repeating items without storing every copy", text: "Rules are saved as RRULE strings and only expanded for the days on screen. Only completions and exceptions become rows, which is what makes “edit this one / this and following / all” possible." },
      { title: "A review that stays honest", text: "The weekly review is calculated from live data each time it loads, so ticking off a task late updates that week's numbers instead of freezing a snapshot." },
    ],
  },
  {
    slug: "pokettrpg",
    name: "PokéTTRPG",
    tagline: "A companion app for Pokémon tabletop campaigns, with multiplayer turn-based battles in the browser.",
    accent: "#e11d48",
    accent2: "#f59e0b",
    live: "https://pokemon-game-rust.vercel.app/",
    repo: "https://github.com/michaelhughes45/pokemonGame",
    role: "Solo: design, build, deploy",
    type: "Multiplayer web app",
    year: "Ongoing",
    status: "Live · in development",
    chips: ["React", "Vite", "Express", "MongoDB", "TypeScript", "JWT"],
    highlights: [
      "Turn-based multiplayer battles kept in sync by polling, with no WebSocket server",
      "Accurate damage using the competitive @smogon/calc engine, run on the server",
      "Separate player, DM and admin roles, each with its own permissions",
    ],
    problem:
      "Running a Pokémon-themed tabletop game means tracking HP, PP, status effects, turn order and damage formulas by hand, which slows every battle to a crawl.",
    solution:
      "The DM sets up campaigns, encounters and NPCs; players manage trainers, Pokémon and items. The app resolves damage, status and turn order, while movement stays on the physical table with miniatures.",
    features: [
      { icon: "layers", title: "Campaigns and encounters", text: "DMs build encounters and NPC trainers, launch battles and award EXP." },
      { icon: "swords", title: "Multiplayer battles", text: "Everyone submits moves, the server orders turns by speed, then each actor picks targets in turn." },
      { icon: "zap", title: "Real damage math", text: "Type chart, STAB, weather, abilities, items, natures and crits, all handled by @smogon/calc." },
      { icon: "move", title: "Party and PC", text: "Drag-and-drop team management that works with touch and mouse." },
      { icon: "search", title: "On-demand Pokédex", text: "Species data is fetched from PokeAPI the first time it's needed, then cached." },
      { icon: "users", title: "Roles", text: "Players, DMs and admins each see only the controls they're allowed to use." },
    ],
    stack: [
      { group: "Frontend", items: [
        { name: "React + Vite", short: "Re", why: "Fast single-page app for the battle screen and team management." },
        { name: "Tailwind + shadcn/ui", short: "Tw", why: "Mobile-first, because players use their phones at the table." },
        { name: "dnd-kit", short: "dk", why: "Drag and drop for party and PC boxes, with touch support." },
      ]},
      { group: "Backend & data", items: [
        { name: "Express + Node (TS)", short: "Ex", why: "REST API with auth middleware that checks roles on every route." },
        { name: "MongoDB Atlas", short: "Mg", why: "Flexible documents for battle state and homebrew trainer stats." },
        { name: "JWT + bcrypt", short: "JW", why: "Stateless auth; the role lives on the user document." },
      ]},
      { group: "Game logic & hosting", items: [
        { name: "@smogon/calc", short: "Sm", why: "Battle-tested damage formula for every generation, with no network calls." },
        { name: "PokeAPI", short: "PA", why: "Source of species, moves and items, cached in the database." },
        { name: "Vercel + Render", short: "▲", why: "Frontend on Vercel, API on Render." },
      ]},
    ],
    arch: {
      flow: [
        { t: "Players' and DM's phones", s: "React on Vercel" },
        { t: "Express API", s: "Render · JWT + roles", main: true, label: "poll 2–3 s" },
        { t: "MongoDB Atlas", s: "battles · users · cache", label: "Mongoose" },
      ],
      extras: [
        { e: "Turn resolution", t: "@smogon/calc", s: "runs server-side per move" },
        { e: "Data", t: "PokeAPI", s: "fetched on first encounter, cached" },
        { e: "State", t: "Battle state machine", s: "submit → target → end of round" },
      ],
    },
    challenges: [
      { title: "Multiplayer without WebSockets", text: "Each battle is a state machine (move submission, speed-ordered targeting, end of round) stored in one document. Clients poll it every few seconds, which runs on free hosting and recovers cleanly when a phone reconnects." },
      { title: "Pokémon data without a giant import", text: "Instead of seeding every species up front, data is fetched from PokeAPI the first time it appears in a game and cached, with an admin button to refresh an entry." },
      { title: "Keeping the table in the game", text: "The app deliberately doesn't track board position. Players choose targets based on the miniatures in front of them, and the server resolves each move as soon as it's chosen." },
    ],
  },
  {
    slug: "ez-rentals",
    name: "Ez Rentals",
    tagline: "A full-stack vacation-rental booking platform, built as my school capstone project.",
    accent: "#0d9488",
    accent2: "#6366f1",
    live: "https://capstone-sigma-brown.vercel.app/",
    repo: "https://github.com/michaelhughes45/Capstone",
    role: "Capstone project (school)",
    type: "Full-stack web app",
    year: "Spring 2025",
    status: "Live demo",
    chips: ["React 19", "Redux Toolkit", "Material UI", "Express", "MongoDB", "Jest"],
    highlights: [
      "Users can post listings with photos, search by location and category, and book stays",
      "API hardened with JWT, rate limiting, Helmet and query sanitizing",
      "Backend tested with Jest and Supertest",
    ],
    problem:
      "The capstone brief: design, build, test and deploy a complete full-stack application on your own.",
    solution:
      "An Airbnb-style platform where people register, browse and search listings, post their own properties with images, book stays and keep a wishlist.",
    features: [
      { icon: "shield", title: "Accounts", text: "Register and sign in with JWT-based authentication." },
      { icon: "upload", title: "Post listings", text: "Hosts create listings with photo uploads handled by Multer." },
      { icon: "search", title: "Search", text: "Filter listings by location and category." },
      { icon: "calendar", title: "Bookings", text: "Book a stay and see it in your trips and reservations." },
      { icon: "home", title: "Trips and reservations", text: "Guests see their trips; hosts see bookings on their properties." },
      { icon: "heart", title: "Wishlist", text: "Save listings to come back to later." },
    ],
    stack: [
      { group: "Frontend", items: [
        { name: "React 19 + Vite", short: "Re", why: "Component-based UI with a fast dev server." },
        { name: "Redux Toolkit + Persist", short: "Rx", why: "Global auth and booking state that survives a page refresh." },
        { name: "Material UI + SCSS", short: "MU", why: "Ready-made components, customized with Sass." },
        { name: "React Router 7", short: "RR", why: "Client-side routing between listings, trips and profile." },
      ]},
      { group: "Backend & data", items: [
        { name: "Express + Node", short: "Ex", why: "REST API for users, listings and bookings." },
        { name: "MongoDB + Mongoose", short: "Mg", why: "Document models for listings, bookings and users." },
        { name: "Helmet · rate limit · sanitize", short: "Sx", why: "Secure headers, request throttling and NoSQL-injection protection." },
        { name: "Jest + Supertest", short: "Je", why: "Automated tests that call the API routes directly." },
      ]},
    ],
    arch: {
      flow: [
        { t: "Browser", s: "React on Vercel" },
        { t: "Express API", s: "Render · JWT", main: true, label: "Axios / REST" },
        { t: "MongoDB Atlas", s: "users · listings · bookings", label: "Mongoose" },
      ],
      extras: [
        { e: "Uploads", t: "Multer", s: "listing photos" },
        { e: "Security", t: "Helmet · rate limit", s: "plus Mongo sanitize" },
        { e: "Tests", t: "Jest + Supertest", s: "route-level API tests" },
      ],
    },
    challenges: [
      { title: "Deploying across two hosts", text: "With the frontend on Vercel and the API on Render, the port, CORS origin and API URL all moved into environment variables, so the same code runs locally and in production." },
      { title: "A public demo visitors can't break", text: "Seeded demo users, listings and bookings are flagged, and the update and delete routes refuse to change them, so anyone can explore without wrecking the demo." },
      { title: "Security from the start", text: "Helmet headers, rate limiting and query sanitizing protect the API against common attacks, and Jest tests cover the main routes." },
    ],
  },
];
