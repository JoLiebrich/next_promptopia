'use client'

import { SessionProvider } from "next-auth/react"


const Provider = ({children, session}) => {
  return (
    // High Order Component -> other components are wraped with it
    <SessionProvider session = {session}>
        {/* render the children within the Session Provider  */}
        {children}
    </SessionProvider>

  )
}

export default Provider