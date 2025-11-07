# DigiHealth Record System - Design Guidelines

## Design Approach

**Selected Approach**: Healthcare-optimized design system drawing from Material Design principles with inspiration from Epic MyChart and modern healthcare platforms.

**Rationale**: Medical applications demand clarity, trust, and efficiency. Information-dense interfaces require strong hierarchy, excellent readability, and familiar patterns that reduce cognitive load for healthcare professionals and patients.

## Typography

**Font Family**: 
- Primary: Inter or IBM Plex Sans (professional, highly readable)
- Monospace: JetBrains Mono (for IDs, prescriptions codes)

**Hierarchy**:
- Page Titles: text-3xl font-semibold (Patient Dashboard, Doctor Dashboard)
- Section Headers: text-xl font-semibold (My Prescriptions, Patient Information)
- Card Titles: text-lg font-medium
- Body Text: text-base font-normal
- Labels/Meta: text-sm text-gray-600
- Timestamps/IDs: text-xs font-mono text-gray-500

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8** for consistency
- Component padding: p-6
- Card spacing: space-y-4
- Section gaps: gap-8
- Page margins: p-8

**Container Strategy**:
- Dashboard layouts: max-w-7xl mx-auto
- Form containers: max-w-2xl
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
**Role-Based Sidebar Navigation**:
- Fixed left sidebar (w-64) with role indicator at top
- Navigation items with icons (Heroicons) and labels
- Active state with left border accent
- Bottom section for user profile and logout

**Patient Navigation**: Dashboard, Prescriptions, Reports, Profile, Consents, Downloads
**Doctor Navigation**: Dashboard, Search Patients, New Prescription
**Pharmacy Navigation**: Dashboard, Verify Prescriptions

### Core Components

**Dashboard Cards**:
- Elevated cards (shadow-md) with rounded-lg borders
- Header with icon + title + optional badge
- Content area with structured data display
- Footer with timestamp and actions
- Use grid layout for multiple cards

**PatientSummaryCard** (for Doctor/Pharmacy dashboards):
- Two-column layout: Patient photo/avatar (left), demographics (right)
- Display: Name, Patient ID (monospace), DOB, Contact
- Status indicator badge (Active/Inactive)

**SearchBar** (Doctor & Pharmacy only):
- Prominent placement at dashboard top
- Search icon prefix, clear button suffix
- Placeholder: "Search by Patient ID..."
- Results dropdown with patient previews

**PrescriptionList**:
- List view with alternating row backgrounds
- Each item: Medication name (bold), dosage, frequency, prescribing doctor
- Status badge: Pending/Dispensed/Expired
- Expandable details with prescription date and instructions

**RecordFilter** (for My Prescriptions/Reports tabs):
- Horizontal filter bar with dropdowns
- Filters: Date range, Status, Doctor/Pharmacy
- Clear filters button

**Data Tables**:
- Striped rows for readability
- Sticky headers on scroll
- Column sorting indicators
- Row hover states

### Forms

**PrescriptionForm** (Doctor):
- Single-column layout with clear field grouping
- Required field indicators (asterisk)
- Medication autocomplete/dropdown
- Dosage and frequency selectors
- Special instructions textarea
- Submit with confirmation modal

**ShareConsentModal** (Patient):
- Modal overlay with centered content
- Grant access form: Select doctor/pharmacy, set duration
- Active consents list below form
- Revoke button with confirmation

**Authentication Forms**:
- Centered card layout (max-w-md)
- Role selector (radio buttons with icons)
- Email and password inputs
- Remember me checkbox
- Primary action button (full width)
- Link to alternate action (Login ↔ Register)

### Interactive Elements

**Buttons**:
- Primary: Filled with role-specific accent
- Secondary: Outlined
- Danger: For revoke/delete actions
- Download: Icon + text combination

**Status Badges**:
- Pill-shaped with dot indicator
- Color coding: Green (Active/Dispensed), Yellow (Pending), Red (Expired/Revoked), Blue (Granted)

**DownloadButton**:
- Dropdown menu for format selection (PDF/JSON)
- Icon indicating file type
- Loading state during generation

### Dashboard-Specific Layouts

**Patient Dashboard**:
- Tab navigation for sections (My Prescriptions, Reports, Profile, Consents, Downloads)
- Summary cards row: Total Prescriptions, Recent Reports, Active Consents
- Content area adapts to selected tab

**Doctor Dashboard**:
- Search-first interface with SearchBar prominence
- Two-panel layout: Patient summary (top/left), Prescriptions list (bottom/right)
- Quick action: "New Prescription" floating button

**Pharmacy Dashboard**:
- Search-driven workflow
- Prescription verification cards with large status display
- Action buttons: Verify, Dispense, Flag Issue

## Visual Treatment

**Professional Healthcare Aesthetic**:
- Clean, clinical appearance without being sterile
- Ample whitespace for clarity
- Subtle shadows for depth, no heavy effects
- Consistent 8px border-radius for friendly professionalism

**Trust Indicators**:
- Security icons for sensitive data sections
- Verified badges for authenticated users
- Consent status clearly visible
- Timestamp tracking for all records

**Accessibility**:
- High contrast ratios for all text
- Large touch targets (min 44px)
- Clear focus indicators
- ARIA labels for all interactive elements
- Screen reader friendly structure

## Images

No hero images required. Use medical-themed iconography throughout:
- Role icons (patient, doctor, pharmacy symbols)
- Medical icons for prescriptions, reports (pill, document, clipboard)
- Avatar placeholders for users
- Empty state illustrations for "No prescriptions found"