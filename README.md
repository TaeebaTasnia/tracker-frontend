# MGH Shipment Tracker — Login

Login page for the MGH Shipment Tracker / Freight Visibility Portal.
React 19 + Vite + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
```

## Demo login
No backend is connected. Sign-in is a clearly labelled **demo flow** (`src/lib/demoAuth.ts`)
that checks against sample credentials in `src/config/demo.ts`:

| Username | Password |
| --- | --- |
| `demo_user` | `Demo@123` |

To connect real authentication, replace `demoLogin` with an API call returning the same result shape.
"Remember me" stores only the username in `localStorage`, never the password.

## Structure
- `src/components/BackgroundVideo.tsx`: muted freight footage that crossfades between clips. It shows only the poster
  image when the user prefers reduced motion, on Data Saver or 2G connections, or when autoplay is blocked.
- `src/components/LoginCard.tsx`: glass panel with MGH branding
- `src/components/TextField.tsx`, `PasswordField.tsx`, `Toggle.tsx`, `DemoCredentials.tsx`: form building blocks
- `src/pages/LoginPage.tsx`: form state, validation and the demo sign-in
- `src/index.css`: design tokens (brand indigo is sampled from the official MGH logo)
- `public/brand`: official MGH logos from mghgroup.com
- `public/media`: background clips and poster (see `CREDITS.md`)
