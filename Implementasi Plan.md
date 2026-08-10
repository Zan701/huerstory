# Huerstory Landing Page Implementation Plan

This plan details the implementation of the Huerstory single landing page with its core booking functionality, aligning with the guidelines set in `implementasi.md` and `Desain.md`.

## User Review Required
> [!IMPORTANT]
> Please review this implementation plan before I proceed. This involves installing new dependencies and creating all the required React components for the landing page.
> **Confirm if you approve this plan to proceed.**

## Open Questions
> [!NOTE]
> 1. You mentioned the booking confirmation button should send information via WhatsApp or email. I plan to use a pre-filled WhatsApp `wa.me` link and a `mailto:` link for the email. Is this acceptable, or do you have a specific WhatsApp number / Email address I should use for the mockup? (If none provided, I will use a placeholder number/email).
> 2. Should I install `lucide-react` for basic icons (like arrows, checkmarks, calendars) since it aligns with clean and modern design? 

## Proposed Changes

### Setup and Dependencies
- Install `framer-motion` for animations.
- Install `lucide-react` for UI icons.
- Install `react-day-picker` and `date-fns` for the calendar UI in the booking flow.

### Global Styles & Fonts
- Update `app/globals.css` with the brand colors (`white: #FFFFFF`, `pink: #ffcddb`, `navy: #36346c`) using Tailwind v4 syntax.
- Configure `Poppins` (primary) and `Tangerine` (accent) fonts in `app/layout.tsx`.

### Components

#### [NEW] `components/Navbar.tsx`
- Simple navigation linking to sections on the page.
- "Book Now" CTA button.

#### [NEW] `components/Hero.tsx`
- Headline, tagline (Tangerine accent), and CTA button.
- Subtle fade-in/slide-up animation using Framer Motion.

#### [NEW] `components/Booking.tsx`
- The core booking component managing state for the 4 steps: Event, Date, Package, Summary.

#### [NEW] `components/EventSelector.tsx`
- UI for selecting Event Type (Wedding, Engagement, Birthday, Corporate, Other).

#### [NEW] `components/DatePicker.tsx`
- Calendar UI using `react-day-picker` showing available, booked, and selected states.

#### [NEW] `components/PackageSelector.tsx`
- Display of 3 packages (Essential, Signature, Premium) with prices and details.

#### [NEW] `components/BookingSummary.tsx`
- Displays the selected event, date, package, and total price.
- Contains the "Confirm via WhatsApp" and "Confirm via Email" buttons that open pre-filled links.

#### [NEW] `components/Benefits.tsx`, `components/Stories.tsx`, `components/About.tsx`, `components/HowItWorks.tsx`, `components/Testimonials.tsx`, `components/FAQ.tsx`, `components/FinalCTA.tsx`, `components/Footer.tsx`
- Implementation of the remaining informational sections as specified in `Desain.md`.

#### [MODIFY] `app/page.tsx`
- Assemble all the created components into the single landing page route.

## Verification Plan
### Manual Verification
- Start the Next.js dev server.
- Verify the landing page layout matches the design requirements (colors, fonts, responsive design).
- Go through the booking flow: Select Event -> Select Date -> Select Package -> View Summary.
- Verify that clicking the WhatsApp/Email confirmation buttons generates the correct pre-filled links.
