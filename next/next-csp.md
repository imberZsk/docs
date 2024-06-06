## csp

参考`https://github.com/vercel/next.js/tree/canary/examples/with-strict-csp`

注意 `middleware.ts` 一定要与 `app` 目录同级

`src/middleware.ts`

```js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

export function middleware(request: NextRequest) {
  const cspHeader = `
    default-src 'self' https://www.google-analytics.com/;
    script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com/;
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  const requestHeaders = new Headers()

  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(
    'Content-Security-Policy',
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  )

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
```

`layout.tsx`

```js
import { headers } from 'next/headers'

const nonce = headers().get('x-nonce') || ''

 <Script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-3XQLVXB48J"
  strategy="afterInteractive"
  nonce={nonce}
></Script>
<Script nonce={nonce} id="google-analytics">
  {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3XQLVXB48J');
`}
</Script>
```
