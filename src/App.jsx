import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AuthLayout from './components/AuthLayout'
import DashboardLayout from './components/DashboardLayout'
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
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

// Dashboard pages
import DashboardOverview from './pages/dashboard/DashboardOverview'
import AgentsPage from './pages/dashboard/AgentsPage'
import AgentDetailsPage from './pages/dashboard/AgentDetailsPage'
import TasksPage from './pages/dashboard/TasksPage'
import MonitoringPage from './pages/dashboard/MonitoringPage'

export default function App() {
  return (
    <Routes>
      {/* Public marketing pages */}
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

      {/* Auth pages (separate layout, no navbar/footer) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Dashboard pages (authenticated) */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/dashboard/agents" element={<AgentsPage />} />
        <Route path="/dashboard/agents/:id" element={<AgentDetailsPage />} />
        <Route path="/dashboard/tasks" element={<TasksPage />} />
        <Route path="/dashboard/monitoring" element={<MonitoringPage />} />
      </Route>
    </Routes>
  )
}
