'use client';  // Ensure this is present

import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
console.log('NEXT_PUBLIC_CLERK_FRONTEND_API:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);



export default function RootLayout({ children }) {
  return (
    <ClerkProvider frontendApi={clerkFrontendApi}>
      <html>
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
