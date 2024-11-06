'use client'

import Link from 'next/link'
import CookieConsent from 'react-cookie-consent'

function CookieConsentComponent() {
  return (
    <CookieConsent
      location="bottom"
      cookieName={
        process.env.NEXT_PUBLIC_USER_TOKEN_STORAGE_NAME || 'chamagro_tkn'
      }
      buttonText="Fechar e continuar"
      buttonStyle={{
        color: 'white',
        fontSize: '13px',
        borderRadius: '4px',
        background: '#0958d9',
      }}
      acceptOnScroll={true}
      style={{ display: 'flex', alignItems: 'center', background: '#2B373B' }}
    >
      Este site utiliza cookies para garantir a melhor experiência possível. Ao
      continuar a navegar no site, você concorda com o uso de cookies. Para mais
      informações, consulte nossa{' '}
      <Link href="/politica-de-privacidade" className="link italic">
        política de privacidade
      </Link>
      .
    </CookieConsent>
  )
}

export default CookieConsentComponent
