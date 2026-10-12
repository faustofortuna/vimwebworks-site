# VIM Webworks transfer package

This archive contains two versions of the website:

- **Ready-to-host files (this folder):** upload the contents of this folder to a static web host. The `_redirects`, `vercel.json`, and `.htaccess` files configure single-page-app route fallback for common hosts. For another host, configure unknown page paths to serve `/index.html` so routes such as `/work` and `/samples/northline-home-services` load directly.
- **Editable source (`editable-source/`):** a standalone React + TypeScript + Vite project with its own `package.json`, public images, app source, and portable Vite config. In a Node.js environment, enter that folder, run `npm install`, then `npm run dev` to edit or `npm run build` to produce a fresh `dist/` folder.

## Important preview limitations

This version remains a private-preview website. Consultation and sample interactions are front-end demonstrations only: no messages are delivered or stored, and no real calls, bookings, reservations, payments, or customer accounts are created. The page metadata currently contains `noindex, nofollow`; review the legal pages, public copy, metadata, and privacy notice before making it public. Google Fonts are loaded from Google Fonts at runtime.

No credentials, database, or deployment configuration specific to Replit is included.
