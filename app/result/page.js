// app/result/page.js

import dynamic from 'next/dynamic'

// Dynamically import the client-only component
const ClientResultPage = dynamic(() => import('../components/ClientResultPage'), {
  ssr: false,
})

const ResultPage = () => {
  return (
    <div>
      <ClientResultPage />
    </div>
  )
}

export default ResultPage
