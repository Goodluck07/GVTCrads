'use client'

import { useState } from 'react'
import { Box, Button, Grid, Typography, AppBar, Toolbar, Container } from '@mui/material'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { getStripe } from './utils/get-stripe' // Adjust the import based on your file structure

export default function Home() {
  const [showLearnMore, setShowLearnMore] = useState(false)

  const handleLearnMoreClick = () => {
    setShowLearnMore(!showLearnMore)
  }

  const handleContactUs = () => {
    window.location.href = 'mailto:badewolegoodluck55@gmail.com';
  }

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      // Removed the headers line for production
    })
    const checkoutSessionJson = await checkoutSession.json()

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            style={{ 
              flexGrow: 1,
              background: 'linear-gradient(90deg, orange, blue, red)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            GVTCards
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="https://thorough-badger-42.accounts.dev/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      
      {/* Welcome Message */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <SignedOut>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              background: 'linear-gradient(120deg, orange, blue, red)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to GVTCards
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to enhance your knowledge from just a simple text.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
            Try Demo
          </Button>
        </SignedOut>
        <SignedIn>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              background: 'linear-gradient(120deg, orange, blue, red)', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Thank you for choosing GVTCards!
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            We are thrilled to have you back! Dive into your flashcards and continue your learning journey.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
            Start Creating
          </Button>
        </SignedIn>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={handleLearnMoreClick}>
          {showLearnMore ? 'Hide' : 'Learn More'}
        </Button>
      </Box>
      
      {/* Learn More Section */}
      {showLearnMore && (
        <Container maxWidth="md">
          <Box sx={{ my: 6, textAlign: 'center' }}>
            <SignedOut>
              <Typography variant="h4" component="h2" gutterBottom>Learn More</Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                GVTCards is designed to simplify the process of learning by allowing users to quickly
                generate flashcards from their study materials. Whether you are a student preparing
                for exams, a professional brushing up on skills, or just someone who loves learning, 
                GVTCards offers a seamless experience to create, organize, and review flashcards.
                With our intuitive design, you can easily input your content, generate flashcards,
                and access them anytime, anywhere.
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                The Pro version offers additional features such as cloud storage, advanced formatting
                options, and the ability to share your flashcard sets with others. Upgrade now to
                enhance your learning experience!
              </Typography>
            </SignedOut>
            <SignedIn>
              <Typography variant="h4" component="h2" gutterBottom>Welcome Back!</Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                As a valued member, you are already enjoying the benefits of GVTCards. Explore new features, 
                and maximize your productivity with our Pro options. Discover more about the Pro version 
                to get the most out of your experience!
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Your Pro features include enhanced customization options, cloud storage, and more. If you have not 
                checked out these features yet, now is the perfect time to dive in and see how they can benefit you.
              </Typography>
            </SignedIn>
          </Box>
        </Container>
      )}

      {/* Features Section */}
      <Container maxWidth="md">
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Feature items */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{
                padding: 2,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}>
                <Typography variant="h6" gutterBottom>
                  Easy Flashcard Creation
                </Typography>
                <Typography variant="body1">
                  Quickly create flashcards by inputting your text, and GVTCards will handle the rest.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{
                padding: 2,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}>
                <Typography variant="h6" gutterBottom>
                  Organized Sets
                </Typography>
                <Typography variant="body1">
                  Keep your flashcards organized with easy-to-manage sets and categories.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{
                padding: 2,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}>
                <Typography variant="h6" gutterBottom>
                  Accessible Anywhere
                </Typography>
                <Typography variant="body1">
                  Access your flashcards from any device, ensuring you are always prepared.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      
      {/* Meet Our Amazing Team Section */}
      <SignedOut>
        <Container maxWidth="md">
          <Box sx={{ my: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>Meet Our Amazing Team</Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Goodluck Badewole</Typography>
                  <Typography variant="body1">
                    An International Student hailing from Nigeria. Current sophomore studying at AAMU with a major in Computer Science. 
                    Goodluck is aspiring to become a data analyst.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Vincent</Typography>
                  <Typography variant="body1">
                    Vincent is a key member of our development team, contributing extensively to our project’s backend and design elements.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Tapiwa</Typography>
                  <Typography variant="body1">
                    Tapiwa specializes in user experience and is responsible for ensuring our platform is both functional and user-friendly.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </SignedOut>

      {/* Pricing Section */}
      <SignedIn>
        <Container maxWidth="md">
          <Box sx={{ my: 6, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
            <Grid container spacing={4} justifyContent="center">
              {/* Pricing plans */}
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{
                  padding: 2,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom>Basic Plan</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Free access to core features. Create and manage basic flashcards with ease.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{
                  padding: 2,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom>Pro Plan</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    $9.99/month. Includes cloud storage, advanced formatting options, and more.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Upgrade to Pro
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{
                  padding: 2,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  },
                }}>
                  <Typography variant="h5" gutterBottom>Enterprise Plan</Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Custom pricing for organizations. Includes additional features and team management.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </SignedIn>

      {/* Contact Us Button */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Button variant="contained" color="primary" onClick={handleContactUs}>
          Contact Us
        </Button>
      </Box>
    </>
  )
}
