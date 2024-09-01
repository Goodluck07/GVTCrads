// components/ClientResultPage.js
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Container, Typography, CircularProgress, Box } from '@mui/material'

const FetchCheckoutSession = ({ session_id, onSessionFetched }) => {
  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return
      try {
        const res = await fetch(`/api/checkout_sessions?session_id=${session_id}`)
        const sessionData = await res.json()
        if (res.ok) {
          onSessionFetched(sessionData)
        } else {
          onSessionFetched(null, sessionData.error)
        }
      } catch (err) {
        onSessionFetched(null, 'An error occurred while retrieving the session.')
      }
    }
    fetchCheckoutSession()
  }, [session_id, onSessionFetched])

  return null
}

const ResultContent = ({ session, error, session_id }) => {
  if (error) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      {session?.payment_status === 'paid' ? (
        <>
          <Typography variant="h4">Thank you for your purchase!</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Session ID: {session_id}</Typography>
            <Typography variant="body1">
              We have received your payment. You will receive an email with the
              order details shortly.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">Payment failed</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Your payment was not successful. Please try again.
            </Typography>
          </Box>
        </>
      )}
    </Container>
  )
}

const ClientResultPage = () => {
  const searchParams = useSearchParams()
  const session_id = searchParams.get('session_id')
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleSessionFetched = (sessionData, errorMessage = null) => {
    setSession(sessionData)
    setError(errorMessage)
    setLoading(false)
  }

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    )
  }

  return (
    <>
      <FetchCheckoutSession session_id={session_id} onSessionFetched={handleSessionFetched} />
      <ResultContent session={session} error={error} session_id={session_id} />
    </>
  )
}

export default ClientResultPage
