import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KsięgaI - Księgowość dla polskich firm',
    short_name: 'KsięgaI',
    description: 'Automatyzacja faktur, podatków i KSeF dla polskich przedsiębiorców. Pełna zgodność z KSeF, JPK i polskimi przepisami.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
