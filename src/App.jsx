import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Solutions from './pages/Solutions'
import HowItWorks from './pages/HowItWorks'
import CaseStudies from './pages/CaseStudies'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import DataProcessing from './pages/DataProcessing'
import AIUsagePolicy from './pages/AIUsagePolicy'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/data-processing" element={<DataProcessing />} />
        <Route path="/ai-usage-policy" element={<AIUsagePolicy />} />
      </Route>
    </Routes>
  )
}
