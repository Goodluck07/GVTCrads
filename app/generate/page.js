'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress
} from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, collection, setDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [savedFlashcards, setSavedFlashcards] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    if (!user) {
      alert('To save flashcards, you need to be signed in.')
      return
    }

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)

      await setDoc(setDocRef, { flashcards })

      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  const handleSearchFlashcards = async () => {
    if (!searchName.trim()) {
      alert('Please enter a name to search.')
      return
    }

    if (!user) {
      alert('To view saved flashcards, you need to be signed in.')
      return
    }

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const flashcardSetsRef = collection(userDocRef, 'flashcardSets')
      const q = query(flashcardSetsRef, where('__name__', '==', searchName))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        alert('No flashcard set found with that name.')
        setSavedFlashcards([])
      } else {
        const setDoc = querySnapshot.docs[0]
        const setData = setDoc.data()
        setSavedFlashcards(setData.flashcards || [])
      }
    } catch (error) {
      console.error('Error searching flashcards:', error)
    }
  }

  const handleSignOut = () => {
    const auth = getAuth()
    auth.signOut()
    router.push('/') // Redirect to the main page of unsigned-in users
  }

  return (
    <Container maxWidth="md" sx={{ position: 'relative' }}>
      {/* User Button */}
      <Box sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        '@media (max-width: 600px)': {
          top: 8,
          right: 8,
        },
      }}>
        {user ? (
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {user.email}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="primary" onClick={() => router.push('/sign-in')}>
            Sign In
          </Button>
        )}
      </Box>
  
      {/* Back to Home Button */}
      <Box sx={{
        position: 'buttom',
        top: 16,
        left: 16,
        zIndex: 10,
        '@media (max-width: 600px)': {
          top: 8,
          left: 8,
        },
      }}>
        <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </Box>
  
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Enhance your knowledge!
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={loading}
        >
          Generate Flashcards
        </Button>
  
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
  
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '200px',
                      width: '200px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      border: '1px solid #ddd',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      position: 'relative',
                      perspective: '1000px',
                      '&:hover .card-inner': {
                        transform: 'rotateY(180deg)',
                      },
                    }}
                  >
                    <Box
                      className="card-inner"
                      sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        className="card-front"
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          borderRadius: '8px',
                          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                          p: 2,
                          fontSize: '16px',
                          overflow: 'auto',
                        }}
                      >
                        <Typography variant="body1" sx={{ m: 0 }}>
                          {flashcard.front}
                        </Typography>
                      </Box>
                      <Box
                        className="card-back"
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '8px',
                          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                          p: 2,
                          fontSize: '16px',
                          overflow: 'auto',
                        }}
                      >
                        <Typography variant="body1" sx={{ m: 0 }}>
                          {flashcard.back}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Save Flashcards
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setSearchDialogOpen(true)} sx={{ ml: 2 }}>
                View Saved Flashcards
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Save Flashcards Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your flashcard set:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Flashcard Set Name"
            type="text"
            fullWidth
            variant="outlined"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Search Flashcards Dialog */}
      <Dialog open={searchDialogOpen} onClose={() => setSearchDialogOpen(false)}>
        <DialogTitle>Search Saved Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of the flashcard set you want to view:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="search-name"
            label="Flashcard Set Name"
            type="text"
            fullWidth
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSearchDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSearchFlashcards}>Search</Button>
        </DialogActions>
        {savedFlashcards.length > 0 && (
          <DialogContent>
            <Typography variant="h6">Saved Flashcards:</Typography>
            <Grid container spacing={2}>
              {savedFlashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '200px',
                      width: '200px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      border: '1px solid #ddd',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      position: 'relative',
                      perspective: '1000px',
                      '&:hover .card-inner': {
                        transform: 'rotateY(180deg)',
                      },
                    }}
                  >
                    <Box
                      className="card-inner"
                      sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        className="card-front"
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          borderRadius: '8px',
                          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                          p: 2,
                          fontSize: '16px',
                          overflow: 'auto',
                        }}
                      >
                        <Typography variant="body1" sx={{ m: 0 }}>
                          {flashcard.front}
                        </Typography>
                      </Box>
                      <Box
                        className="card-back"
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '8px',
                          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                          p: 2,
                          fontSize: '16px',
                          overflow: 'auto',
                        }}
                      >
                        <Typography variant="body1" sx={{ m: 0 }}>
                          {flashcard.back}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  )
}
