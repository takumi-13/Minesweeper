import { Auth0Provider } from '@auth0/auth0-react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="https://dev-u4obg5lc.us.auth0.com"
      clientId="X8mhTAo99FoyUScgcqPZyVwJyTe8xG3t"
      redirectUri="http://localhost:3000"
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}
export default MyApp
