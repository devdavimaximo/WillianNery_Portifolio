import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './Layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/app/Layout.tsx',
    children: [
      {
        index: true,
        entry: 'src/features/home/HomePage.tsx',
        lazy: () => import('../features/home/HomePage'),
      },
      {
        // Página interna de verificação do design system (F1). Noindex, sem link
        // no site, removida antes do lançamento — ver PENDENCIAS.md.
        path: 'design-system',
        entry: 'src/features/design-system/DesignSystemPage.tsx',
        lazy: () => import('../features/design-system/DesignSystemPage'),
      },
    ],
  },
]
