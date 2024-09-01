// pages/sign-in/[[...catchall]].tsx

import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <Container maxWidth="sm">
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GVTCards
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <SignIn path="/sign-in" routing="path" />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Don’t have an account? <Link href="/sign-up">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
}
