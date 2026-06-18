# SignFlow Frontend

This is the React frontend for SignFlow, a document signing application. It handles authentication screens, the dashboard, document upload, PDF viewing, signer assignment, signature placement, signature capture, and signed document download.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- react-pdf and pdfjs-dist
- react-signature-canvas
- react-icons

## Setup

Install dependencies:

```bash
npm install
```

Create `signflow/.env`:

```env
VITE_PUBLIC_API_URL=http://localhost:5000/signflow
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | `Landing` | Public landing page |
| `/login` | `Login` | User login |
| `/register` | `Register` | User registration |
| `/dashboard` | `Dashoard` | Dashboard summary and document table |
| `/dashboard/documents` | `Documents` | Uploaded documents list |
| `/dashboard/documents/:id` | `DocumentViewer` | PDF viewer, signer tools, signature tools, download |
| `/dashboard/pending-signatures` | `PendingSignatures` | Documents waiting for the current user's signature |
| `*` | `NotFound` | Fallback route |

## Important Files

- `src/App.tsx`: Main route configuration.
- `src/Contexts/AuthContext.tsx`: Loads the authenticated user session, exposes logout, and refreshes user state.
- `src/Pages/Dashoard.tsx`: Dashboard summary cards and document table.
- `src/Pages/Documents.tsx`: Wrapper for the documents table.
- `src/Pages/DocumentViewer.tsx`: Main PDF workflow for viewing, placing, signing, and downloading documents.
- `src/Pages/PendingSignatures.tsx`: Lists documents where the current user has unsigned signature fields.
- `src/components/ResponsiveTable/ResponisveTable.tsx`: Documents table and upload modal entry point.
- `src/components/UploadModel/UploadModel.tsx`: Document upload modal.
- `src/components/SearchBox/SearchBox.tsx`: User search modal for adding signers.
- `src/components/SignatureModel/SignatureModal.tsx`: Signature capture modal.
- `src/utils/documentOwner.ts`: Checks whether the current user owns the active document.
- `src/utils/userPendingSignatures.ts`: Fetches pending signature documents.

## Main User Flow

1. A user registers or logs in.
2. The dashboard loads the user's session and document list.
3. The user uploads a document with a title.
4. After upload, the user is redirected to the document viewer.
5. The document owner searches for registered users and adds them as signers.
6. The owner selects a signer and places signature fields on the PDF.
7. The owner saves the signature fields.
8. Assigned signers open pending documents and sign their assigned fields.
9. A user downloads the PDF with saved signatures embedded.

## API Usage

All API calls use `VITE_PUBLIC_API_URL` as their base URL. For local development this should usually be:

```text
http://localhost:5000/signflow
```

Most protected requests include:

```ts
credentials: "include"
```

This lets the browser send the backend's httpOnly `token` cookie.

## Notes

- The upload UI accepts PDFs and the viewer uses `react-pdf`, so PDF is the intended document type for the current frontend.
- The component and page names include a few typos, such as `Dashoard`, `ResponisveTable`, and `UploadModel`. These names are currently used by imports, so rename them carefully if you decide to clean them up.
- Some action buttons for approve/reject/audit trail are present visually but are not fully wired to backend behavior yet.
