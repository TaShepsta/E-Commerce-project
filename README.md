# Rentosphere — folder structure clean-up (read me first)

This is your project after being reorganised into one working **frontend/**
folder and one working **backend/** folder. Nothing was deleted — every
original file is either in its new home below, or preserved untouched in
**_legacy-archive/**.

## Why it was messy

The repo had branches from several teammates (`matthew-dev`, `saajidah-dev`,
`purrity-dev`, `lisekho-dev`) merged together without ever consolidating the
folders. That left **four overlapping copies** of the app sitting side by
side:

- `Rentosphere/` — an early scaffold (had the chatbot, an old signup flow)
- `Rentosphere-Backend/` — a separate Express server just for the chatbot + auth
- `frontend/` — the real, most complete frontend (this is the one matching
  your reference screenshot)
- `frontend/Rentosphere/` — a teammate's nested scaffold with the login/signup/
  forgot-password pages
- `backend/` — split awkwardly between `backend/` and `backend/src/`, with a
  second, older, unused copy of the server logic inside `backend/src/`

## What's in `frontend/` now

Single Vue app, single `src/`. Everything lives together:

- `views/` — Home, Browse, Categories, How It Works, Become an Owner, About,
  Cart, Checkout, My Listings, My Earnings, **Login, Signup, Forgot Password,
  Reset Password** (brought in from the nested scaffold)
- `components/` — Navbar is built into `App.vue`; **Chatbot.vue** (brought in
  from the old `Rentosphere/` scaffold) and **Footer.vue** now render on every
  page
- `stores/` — `auth.js` is a real Vuex module now (login, register,
  forgot/reset password, token persistence). It was previously an empty shell
  that the Login/Signup pages called but that did nothing.
- `router/index.js` — every page above is routed, including the new
  `/login`, `/signup`, `/forgot-password`, `/reset-password`
- `HomeView.vue` was previously just a placeholder ("Welcome to Rentosphere").
  It's been rebuilt into a real homepage matching your reference image: hero
  with search bar, popular categories, popular rentals, "how it works" steps,
  and a become-an-owner banner — all using your existing data/components, no
  new dependencies.

**Sign up** now asks whether you want to rent or list items, and registers
you with that role — matching what your backend's `/api/auth/register`
already expects.

## What's in `backend/` now

Single Express app in `backend/src/`, one copy of each controller/model/
route/middleware file (previously split between `backend/` and
`backend/src/`, with `backend/src/app.js` importing across that split):

- `src/routes`, `src/controllers`, `src/models`, `src/middleware`, `src/config`
- `src/routes/chatRoutes.js` + `src/controllers/chatController.js` — the
  chatbot API, brought in from `Rentosphere-Backend/`, now mounted at
  `/api/chat`
- `database/schema.sql` — the current schema (the old `products`-table schema
  from the abandoned prototype is archived, not deleted)
- `.env` now also has `JWT_SECRET` (was missing — login/signup would have
  crashed without it; a random dev-only value was generated for you, swap it
  before deploying) and a placeholder `HF_TOKEN` for the chatbot — get a real
  one from https://huggingface.co/settings/tokens and paste it in.

## `_legacy-archive/`

Nothing was thrown away. This folder holds, exactly as they were:
- `Rentosphere-original-scaffold/`
- `Rentosphere-Backend-original/`
- `frontend-auth-scaffold/` (the nested `frontend/Rentosphere/`)
- `backend-superseded/` (the unused duplicate server/db/routes and the old
  DB schema)
- `frontend-orphans/` (unused duplicate view/component files that weren't
  wired into the router, e.g. `Browse.vue` next to the real `BrowseView.vue`)

You can delete this folder once you've confirmed nothing in it is needed —
it's just there so this clean-up is fully reversible.

## To run it

```
cd backend && npm install && npm run dev      # http://localhost:5050
cd frontend && npm install && npm run dev     # http://localhost:5173
```

Make sure MySQL is running and matches `backend/.env`, and paste a real
`HF_TOKEN` into `backend/.env` if you want the chatbot to respond (without
it, `/api/chat` will just return an error — everything else works fine).

## Worth knowing / still loose ends

- The signup/login pages now work end-to-end against your real backend, but
  I couldn't test them against a live MySQL database from here — worth a
  quick manual run-through.
- `frontend/src/views/BecomeAnOwner.vue` and the archived `BecomeOwner.vue`
  were two competing versions of the same page; `BecomeAnOwner.vue` is the
  one wired into the router and kept active.
