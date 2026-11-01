import { useState } from 'react'
import { BackgroundVideo } from './components/BackgroundVideo'
import { Footer } from './components/Footer'
import { LoginPage } from './pages/LoginPage'
import { DemoWelcome } from './pages/DemoWelcome'

export default function App() {
  const [signedInAs, setSignedInAs] = useState<string | null>(null)

  return (
    <div className="relative isolate flex min-h-dvh flex-col">
      <BackgroundVideo />
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        {signedInAs ? (
          <DemoWelcome username={signedInAs} onSignOut={() => setSignedInAs(null)} />
        ) : (
          <LoginPage onSignedIn={setSignedInAs} />
        )}
      </main>
      <Footer />
    </div>
  )
}
