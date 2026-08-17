import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './app/routes'
import './styles/tokens.css'
import './styles/base.css'

export const createRoot = ViteReactSSG({ routes })
