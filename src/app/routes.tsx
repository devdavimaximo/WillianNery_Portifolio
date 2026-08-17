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
        path: 'portfolio',
        entry: 'src/features/portfolio/PortfolioPage.tsx',
        lazy: () => import('../features/portfolio/PortfolioPage'),
      },
      {
        path: 'about',
        entry: 'src/features/about/AboutPage.tsx',
        lazy: () => import('../features/about/AboutPage'),
      },
      {
        path: 'contact',
        entry: 'src/features/contact/ContactPage.tsx',
        lazy: () => import('../features/contact/ContactPage'),
      },
    ],
  },
]
