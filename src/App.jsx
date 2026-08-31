import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Companies from './pages/Companies'
import SavedJobs from './pages/SavedJobs'
import Apply from './pages/Apply'
import NotFound from './pages/NotFound'
import JobsLayout from './pages/Jobs/JobsLayout'
import JobsList from './pages/Jobs/JobsList'
import JobDetail from './pages/Jobs/JobDetail'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/apply/:jobId" element={<Apply />} />

          <Route path="/jobs" element={<JobsLayout />}>
            <Route index element={<JobsList />} />
            <Route path="category/:categoryId" element={<JobsList />} />
            <Route path=":id" element={<JobDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
