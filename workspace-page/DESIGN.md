---
name: CollabHub Enterprise
colors:
  surface: '#f8f9fc'
  surface-dim: '#cfdaf1'
  surface-bright: '#f8f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#f0f3ff'
  surface-container-high: '#e7e8eb'
  surface-container-highest: '#e1e2e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434843'
  inverse-surface: '#2e3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737973'
  outline-variant: '#e1e4ea'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#586158'
  on-secondary: '#ffffff'
  secondary-container: '#dae2d7'
  on-secondary-container: '#5d655c'
  tertiary: '#131818'
  on-tertiary: '#ffffff'
  tertiary-container: '#272c2c'
  on-tertiary-container: '#8e9393'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#410002'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b7ccb7'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#dde5da'
  secondary-fixed-dim: '#c0c9be'
  on-secondary-fixed: '#161d17'
  on-secondary-fixed-variant: '#414941'
  tertiary-fixed: '#dfe3e3'
  tertiary-fixed-dim: '#c3c7c7'
  on-tertiary-fixed: '#181c1d'
  on-tertiary-fixed-variant: '#434848'
  background: '#f8f9fc'
  on-background: '#191c1e'
  surface-variant: '#e1e2e5'
typography:
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-desktop: 48px
  margin-mobile: 16px
  gutter: 24px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---

## Brand & Style
CollabHub is a professional, high-trust ecosystem designed for serious innovation and collaborative ventures. The brand personality is **Corporate Modern with an Editorial touch**, blending the reliability of a fintech platform with the sophisticated storytelling of a high-end publication.

The visual style utilizes a high-contrast interaction between deep botanical greens and clean, expansive surfaces. It avoids unnecessary ornamentation in favor of crisp typography, structural integrity, and subtle micro-interactions that respond to user intent with weighted transitions. The target audience includes institutional investors, domain experts, and high-stakes innovators who value clarity, efficiency, and a premium aesthetic that signals stability.

## Colors
The palette is rooted in a deep, authoritative "Forest Ebony" (#1b3022) which serves as the primary brand anchor. This is supported by a sophisticated "Cool Slate" surface system that utilizes slight blue tints in the container backgrounds to maintain a fresh, modern feel.

- **Primary:** Used for key brand moments, primary CTAs, and structural accents (like card top-borders).
- **Secondary/Tertiary:** Subdued grays and muted teals used for supplementary information and low-priority interaction states.
- **Surface System:** Employs a specific hierarchy where the lowest surface is pure white (#ffffff), contrasting against a background of #f9f9ff.
- **Functional Colors:** Error states utilize high-chroma reds softened by pastel containers to ensure urgency without causing visual alarm.

## Typography
The typographic system relies on a high-contrast pairing between **Playfair Display** (Serif) and **Inter** (Sans-Serif). 

- **Display & Headlines:** Use Playfair Display to inject an editorial, authoritative character. Tighten letter spacing slightly for larger sizes to maintain visual density.
- **Body & Functional Text:** Use Inter for maximum legibility. Use a weight of 400 for long-form reading and 500-600 for UI labels and interactive elements.
- **Micro-labels:** Utilize all-caps styling with increased letter-spacing for category headers and tags to create a "technical" or "curated" feel.

## Layout & Spacing
The system utilizes a **Fixed-Width Grid** approach for content clarity. 
- **Desktop:** A standard 12-column grid with a maximum content width. Use 48px outer margins and 24px gutters.
- **Sidebar:** The filter/navigation aside is fixed at 288px (18rem).
- **Responsive Behavior:** Below 1024px, the sidebar collapses into a hidden state or a mobile drawer. Margins reduce to 16px on phone screens.
- **Rhythm:** An 8px base unit drives all internal padding and component gaps, ensuring consistent vertical rhythm across varied content types.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Structural Outlines** rather than aggressive shadows.

1.  **Level 0 (Background):** #f9f9ff — the canvas.
2.  **Level 1 (Cards/Containers):** Pure white #ffffff with a 1px solid border of #e1e4ea. 
3.  **Level 2 (Interaction):** Upon hover, cards lift using a subtle, deep-tinted shadow `0 12px 24px rgba(27, 48, 34, 0.08)` and a border-color shift to the primary brand color.
4.  **Sticky Elements:** The TopNavBar utilizes a very light `shadow-sm` and a bottom-border to maintain separation from the content during scroll.

## Shapes
The shape language is **Refined & Modern**, favoring a moderate corner radius that feels friendly but professional. 

- **Standard Containers:** Cards and major blocks use a 1rem (16px) radius.
- **Interactive Elements:** Buttons and Input fields use a 0.5rem (8px) radius for a more precise, functional look.
- **Small Tags:** Use a 4px (0.25rem) radius to maintain a "chip" or "stamp" aesthetic.
- **Avatars/Badges:** Use "full" (999px) for complete circularity.

## Components

### Buttons
- **Primary:** Solid #1b3022 background with white text. Subtle 0.96 scale transform on click.
- **Outline:** 1px solid primary color with primary text. Background fills slightly on hover.
- **Icons:** Material Symbols (Outlined) with a 400 weight.

### Cards
- **The "Enterprise Card":** White background, 1px light gray border. Some cards feature a "Hero Border" (4px solid top-border in the primary color) to denote featured or high-priority items.

### Inputs & Selects
- Inputs feature a light surface color (#f9f9ff) and a gray border. On focus, they transition to a 1px primary-colored ring.
- Select menus are styled minimally, often removing the default browser chevron in favor of a clean, text-only label when used in headers.

### Chips & Tags
- Used for categories. Active states use a "Fixed Dim" primary color (#d3e8d3) with deep green text.
- Inactive states use a light gray surface-container-high background.
- Labels inside tags are always uppercase with a bold weight and 10px-12px size.

### Lists & Navigation
- Top navigation items use a bold label-md font. The active state is indicated by a 2px solid bottom border, while hover states transition the text color to primary.