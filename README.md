# READIFY – Your Personal Digital Bookshelf & Reading Tracker

> **Academic Mini-Project for ReactJS Course**  
> Built with React 18, React Router v6, Context API, and LocalStorage.  
> Demonstrates comprehensive practical mastery across **Units I, II, III, IV, and V** of the ReactJS Curriculum.

---

## 1. Project Introduction

**Readify** is a modern, responsive personal reading management platform designed to help passionate readers catalogue physical and digital books, track chapter/page completion milestones in real time, set yearly reading targets, and visualize reading habits through analytics.

Unlike basic CRUD tutorials that feel like generic admin tables, Readify features an editorial, warm-cream, library-inspired visual design with rich typography, book cover artwork previews, animated progress gauges, and intuitive user workflows. It functions completely on the client side with zero external database dependencies, paid APIs, or third-party authentication services, relying on robust browser `localStorage` for complete data persistence.

---

## 2. Problem Statement

Avid readers and students frequently struggle to maintain consistent reading habits, measure reading velocity, and organize scattered book collections across multiple genres. Commercial reading platforms often suffer from:
- Intrusive ads, paywalls, and heavy social networking bloat.
- Mandatory cloud authentication that compromises privacy.
- Over-engineered interfaces that prioritize social feeds over personal focus.
- Inflexible progress tracking that requires manual calculations.

**Readify** solves this by providing a lightweight, distraction-free, privacy-preserving digital bookshelf that readers can run entirely in their browser.

---

## 3. Project Objectives

1. **Academic Rigor:** Fully demonstrate every fundamental and advanced concept outlined in the 5-unit ReactJS syllabus through clean, idiomatic code.
2. **Comprehensive CRUD Lifecycle:** Enable users to seamlessly Create, Read, Update, and Delete books, reviews, and reading progress.
3. **Smart Progress Automation:** Automatically compute reading percentage (`(current / total) * 100`) and transition books from *Want to Read* $\rightarrow$ *Currently Reading* $\rightarrow$ *Completed* when page milestones are reached.
4. **Annual Challenge Motivation:** Empower readers to establish yearly targets, monitor pace benchmarks, and celebrate unlocked literary milestones.
5. **Data Resilience & Privacy:** Guarantee 100% offline functionality and instantaneous LocalStorage synchronization without requiring paid APIs or remote databases.
6. **Aesthetic Excellence:** Deliver a warm, tactile, cozy editorial UI with sophisticated typography (`Playfair Display` + `Plus Jakarta Sans`) and responsive layouts.

---

## 4. Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React.js 18** | Core library for declarative, component-driven UI architecture |
| **JavaScript (ES6+)** | Modern functional programming, destructuring, arrow functions, promises |
| **JSX** | Semantic UI templating with embedded expressions and dynamic bindings |
| **HTML5 & CSS3** | Modern semantic structure and CSS custom properties (variables) |
| **React Router DOM v6** | Client-side routing, nested navigation, dynamic URL params (`/book/:id`) |
| **React Hooks** | `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useContext` |
| **Browser LocalStorage** | Resilient client-side persistence with automatic serialization |
| **Lucide React** | Clean, accessible SVG iconography |
| **Vite 5** | High-performance build tool, fast HMR dev server, and optimized production bundler |

---

## 5. Application Features

### 🌟 Dashboard Overview (`/`)
- Dynamic greeting and reading summary.
- 4 real-time KPI metric cards (Total Books, Currently Reading, Completed Books, Want to Read).
- Cumulative catalog page progress meter.
- Embedded Annual Reading Challenge progress ring.
- **Currently Reading Spotlight** with quick page update shortcuts.
- **Recently Added Books** gallery.

### 📚 My Bookshelf (`/books`)
- Dynamic book collection browser supporting both **Grid View** and **List View**.
- Live search filtering by title and author.
- Category filter dropdown across 10 literary genres.
- Quick status filter tabs (*All*, *Currently Reading*, *Want to Read*, *Completed*) with dynamic counters.
- Multi-criteria sorting: *Recently Added*, *Title (A-Z)*, *Highest Rated*, *Reading Progress*, *Page Count*.
- Active filter pill badges with single-click removal.

### ➕ Add Book (`/add-book`)
- Controlled form with real-time field validation (required inputs, boundary checking).
- Triple-source cover selector:
  1. Curated aesthetic preset covers.
  2. Custom public URL input.
  3. Local image file upload with `FileReader` converting images into offline Data URLs.
- Interactive star rating component.
- Live card mockup preview reflecting changes in real time.
- Immediate reflection on bookshelf and dashboard upon submission.

### 📖 Book Details & Reading Log (`/book/:id`)
- Deep dynamic route displaying full metadata, cover artwork, and reading history.
- Dynamic page progress slider with $-10$ and $+10$ page step buttons.
- Automatic status transformation to *Completed* upon reaching 100% page completion.
- Full Edit modal dialog pre-populated with existing book records.
- Permanent Delete option protected with confirmation modal dialog.
- Reader reviews, reflections, and private quote annotations.

### 🎯 Annual Reading Goals (`/goals`)
- Customizable yearly reading target setter (persisted in LocalStorage).
- Circular SVG progress visualizer displaying percentage and remaining books.
- Reading pace indicator (comparing current progress against monthly benchmarks).
- Unlockable achievement badges (*First Step*, *Habit Builder*, *Double Digits*, *Annual Champion*).
- Showcase gallery of all books finished in the current calendar year.

### 📊 Reading Statistics & Insights (`/statistics`)
- Deep analytics computed dynamically from actual user books:
  - Total books read vs. total catalog volume.
  - Cumulative pages read vs. total pages logged.
  - Overall average rating.
  - Responsive visual bar charts displaying **Genre Distribution**.
  - Color-coded **Reading Status Breakdown**.
  - Favorite genre and top-rated book highlights.

### ℹ️ About & Academic Documentation (`/about`)
- Comprehensive overview of project background and architecture.
- Detailed syllabus mapping guide across Units I through V.
- Step-by-step instructions for inspecting components in **React Developer Tools**.

### ⚠️ Fallback 404 Route (`*`)
- Clean, branded Not Found page with return navigation buttons.

---

## 6. Application Architecture

```
                       [ Browser LocalStorage ]
                                  ▲
                                  │ (Sync via useLocalStorage)
                                  ▼
                        [ <BookProvider> ] (Context API)
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
    Global State            CRUD Operations          Toast Alerts
(books, yearlyGoal)   (add, update, delete, prog)   (success, info, err)
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  ▼
                         [ <App> Layout ]
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
    [ <Sidebar> ]                                    [ <Navbar> ]
  (NavLink routing)                              (Stats Pill, Add Btn)
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  ▼
                       [ <Routes> & Outlet ]
                                  │
   ┌───────────┬───────────┬──────┴─────┬───────────┬───────────┐
   ▼           ▼           ▼            ▼           ▼           ▼
Dashboard  Bookshelf    AddBook    BookDetails    Goals     Statistics
```

---

## 7. Folder Structure

```
Readify/
├── index.html                     # HTML5 root with Google Fonts & cozy favicon
├── package.json                   # Project metadata and dependencies
├── vite.config.js                 # Vite bundler configuration
├── dist/                          # Production distribution build (generated)
├── REACT_SYLLABUS_MAPPING.md      # Detailed academic syllabus evaluation guide
├── README.md                      # Complete project documentation
└── src/
    ├── main.jsx                   # React 18 createRoot & Provider mounting
    ├── App.jsx                    # Layout shell, Sidebar, Navbar & Routes
    │
    ├── components/                # Reusable Functional Components
    │   ├── Navbar.jsx             # Top bar with mobile toggle and quick actions
    │   ├── Sidebar.jsx            # Sidebar navigation with active NavLinks
    │   ├── BookCard.jsx           # Reusable card with progress, rating & actions
    │   ├── BookList.jsx           # Grid/List container with unique key mapping
    │   ├── BookForm.jsx           # Controlled form for Add & Edit modes
    │   ├── ProgressBar.jsx        # Customizable visual progress bar
    │   ├── StatisticsCard.jsx     # Metric card for KPIs and dashboard numbers
    │   ├── ReadingGoal.jsx        # Circular/compact goal visualizer
    │   ├── Modal.jsx              # Reusable modal leveraging props.children
    │   ├── RatingStars.jsx        # Interactive & read-only star rating
    │   ├── Toast.jsx              # Auto-dismissing transient alert banner
    │   └── EmptyState.jsx         # Friendly empty state display
    │
    ├── pages/                     # Routed View Pages
    │   ├── Dashboard.jsx          # KPI cards, active spotlight & recent books
    │   ├── Bookshelf.jsx          # Search, genre/status filter, grid/list view
    │   ├── AddBook.jsx            # Book creation page with live preview
    │   ├── BookDetails.jsx        # Dynamic /book/:id view with page updates
    │   ├── ReadingGoals.jsx       # Target setting, pacing & milestone badges
    │   ├── Statistics.jsx         # Visual CSS charts & reading analytics
    │   ├── About.jsx              # Academic syllabus guide & DevTools guide
    │   └── NotFound.jsx           # Fallback 404 error page
    │
    ├── context/
    │   └── BookContext.jsx        # Centralized state provider & custom hook
    │
    ├── hooks/
    │   └── useLocalStorage.js     # Custom Hook for resilient storage sync
    │
    ├── utils/
    │   ├── bookUtils.js           # Math, status resolvers, filters & stats
    │   └── initialData.js         # Sensible initial seed books & targets
    │
    └── styles/                    # Modular Organized CSS
        ├── global.css             # Theme variables, typography & layout shell
        ├── dashboard.css          # Welcome banner, KPI cards & layout grids
        ├── bookshelf.css          # Search, filters, grid/list & card styles
        ├── forms.css              # Controlled form layout & live card mockup
        ├── details.css            # Hero details, progress controls & notes
        ├── goals.css              # SVG circular charts, pacing & badges
        ├── statistics.css         # Visual bar charts & catalog page meters
        └── about.css              # Syllabus cards & DevTools guide styles
```

---

## 8. Installation and Execution Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 16 or newer installed on your machine)
- npm (comes bundled with Node.js)

### Step 1: Open Terminal in Project Directory
```bash
cd "c:\Users\Victus\OneDrive\Desktop\Readify"
```

### Step 2: Install Dependencies
```bash
npm install
```
*(On Windows systems where script execution is restricted in PowerShell, run `npm.cmd install`)*

### Step 3: Run Local Development Server
```bash
npm run dev
```
*(or `npm.cmd run dev`)*

The terminal will output a local URL, typically:
```
  VITE v5.4.9  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```
Open **http://localhost:3000** in your browser (Google Chrome, Firefox, or Edge).

---

## 9. Explanation of Important React Concepts Used

### 1. Functional Components & JSX (Units I & II)
All components are written as pure functional components utilizing modern React hooks. JSX is used to declaratively define the user interface with embedded expressions such as:
```jsx
<span className="percentage-badge">{calculateProgress(book.currentPage, book.totalPages)}%</span>
```

### 2. Props & Parent-Child Communication (Unit II)
Data flows downward from parent pages to child components through props. For example, `BookList` maps over an array of book entities and passes individual `book` objects and callbacks to `BookCard`.

### 3. Component Containment with `props.children` (Unit II)
The `Modal` component demonstrates reusable layout composition. It encapsulates the backdrop, ESC key listener, and headers, rendering whatever arbitrary content the consumer supplies via `props.children`:
```jsx
<Modal isOpen={isEditOpen} onClose={handleClose} title="Edit Book">
  <BookForm initialValues={book} onSubmit={handleSave} />
</Modal>
```

### 4. Controlled Form Architecture & Validation (Unit III)
Forms maintain a single source of truth in React state. Each input binds its `value` to state and updates via `onChange`. Submissions validate required inputs and page boundaries, offering instant inline feedback:
```jsx
<input
  type="text"
  name="title"
  value={formData.title}
  onChange={handleChange}
  className={errors.title ? 'is-invalid' : ''}
/>
```

### 5. Client-Side Routing with React Router v6 (Unit IV)
Declarative routing using `<BrowserRouter>`, `<Routes>`, and `<Route>` allows smooth navigation without full browser refreshes. Dynamic routes such as `/book/:id` extract the URL parameter using the `useParams()` hook:
```jsx
const { id } = useParams();
const book = getBookById(id);
```

### 6. Custom Hook & LocalStorage Synchronization (Unit V)
The `useLocalStorage` custom hook abstracts the synchronization logic between React state and the browser's storage engine. Whenever state changes, a `useEffect` automatically serializes the data to `localStorage`.

### 7. Performance Optimization with `useMemo` & `useCallback` (Unit V)
High-computation operations (e.g., calculating genre distributions, sorting 10+ books by complex criteria) are wrapped in `useMemo` so calculations only execute when book data changes.

---

## 10. Deployment Instructions

Readify is a pure client-side Single Page Application (SPA). It can be deployed to any static web hosting platform for free.

### Creating a Production Build
Run the following build command:
```bash
npm run build
```
*(or `npm.cmd run build`)*

This compiles and minifies all assets into the `dist/` directory.

### Deploying to Popular Platforms:

#### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Accept the default settings. Vercel automatically detects Vite and deploys the `dist/` folder.

#### Option B: Netlify
1. Create a `_redirects` file in your `public/` directory with:
   ```
   /*    /index.html   200
   ```
   *(This ensures client-side routes like `/book/book-1` do not return a 404 on refresh)*
2. Drag and drop the `dist/` folder directly onto the [Netlify Drop](https://app.netlify.com/drop) dashboard.

#### Option C: GitHub Pages
1. Install `gh-pages`: `npm install gh-pages --save-dev`
2. Add `"base": "/<repository-name>/"` in `vite.config.js`.
3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run deploy`.

---

## 11. Testing and Verification Checklist

| Test Scenario | Action | Expected Result |
| :--- | :--- | :--- |
| **Initial Launch** | Open `http://localhost:3000` | Sample books load automatically with stats and charts |
| **Add New Book** | Navigate to `/add-book`, submit valid book data | Toast alert appears; book appears immediately in shelf |
| **Form Validation** | Submit empty form or current pages > total pages | Field-level error messages appear; submit blocked |
| **Update Progress** | In `/book/:id`, increment pages to total | Progress reaches 100%; status auto-updates to "Completed" |
| **Search & Filter** | On `/books`, search "Dune" or filter by genre | Bookshelf updates in real time to show only matching cards |
| **Grid/List Toggle** | Click the grid/list icons on `/books` | Layout transitions smoothly between card and list mode |
| **Reading Goals** | Navigate to `/goals`, adjust target to 15 | Ring chart updates; remaining count recalculates instantly |
| **Delete Book** | In `/book/:id`, click Delete and confirm | Book is deleted; user is redirected to `/books` with toast |
| **Data Persistence** | Refresh the browser (`F5`) | All user changes, added books, and goals remain intact |
| **404 Routing** | Visit `http://localhost:3000/random-page` | Clean 404 page displays with return to dashboard link |

---

## 12. Academic Evaluation Credits

- **Course:** ReactJS Mini-Project
- **Project Name:** READIFY – Your Personal Digital Bookshelf
- **Architecture:** Client-Side Single Page Application (SPA)
- **Syllabus Coverage:** Units I, II, III, IV, and V (Detailed in `REACT_SYLLABUS_MAPPING.md`)
