ASSKFANS PREVIEW – SPLIT ZIP REASSEMBLY GUIDE
=============================================

This project is split into FIVE zip files. Extract ALL of them into the SAME folder
so they merge into one directory called `asskfans_preview`.

Order doesn't matter; just make sure they all land in the same root.

ZIP PARTS
---------
1) asskfans_core.zip        (this file)
2) asskfans_lib.zip         (library modules: config, rotation engine, stores, debug, auth)
3) asskfans_components.zip  (React components: LoginGate, RoomPlayer, Stores, Nav, etc.)
4) asskfans_app.zip         (Next.js pages: /login, /home, /explore, /rooms/[slug], /debug, /api routes)
5) asskfans_public.zip      (media placeholders under /public/media)

AFTER EXTRACTION
----------------
1. Run:  npm install
2. Set environment variables (or .env.local):
   NEXT_PUBLIC_MEDIA_BASE=/media        (or your CDN URL)
   NEXT_PUBLIC_DEBUG=0
3. Start dev:  npm run dev

KEY FEATURES INCLUDED
---------------------
- Ass King rotating login intros (no-repeat rotation)
- Rosie lounge with 10-clip engine, scaling no-repeat window, and story chaining
- Explore/Home grid + nav
- Credit Store + Merch Store (Stripe checkout stubs)
- VIP page + PaywallGuard (upsell flow)
- Debug hooks (console) and hidden /debug page
- Universal RotationEngine for all lounges

If a ZIP fails to download, ask for that exact part name again.
