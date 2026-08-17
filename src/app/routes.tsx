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
    ],
  },
]
