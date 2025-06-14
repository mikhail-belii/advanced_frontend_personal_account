import LoginPage from './pages/LoginPage/LoginPage'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BASE_ERROR_PAGE, PAGE_TITLES } from './constants'
import NotFound from './pages/NotFound/NotFound'
import './App.css'
import { AuthorizationProvider } from './context/AuthorizationContext'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import { useLanguage } from './context/LanguageContext'
import CertificatesPage from './pages/CertificatesPage/CertificatesPage'
import ProtectedRoute from './api/models/ProtectedRoute'
import UsefulServicesPage from './pages/UsefulServicesPage/UsefulServicesPage'
import EventsPage from './pages/EventsPage/EventsPage'
import ConcreteEventPage from './pages/ConcreteEventPage/ConcreteEventPage'

const TitleUpdater = () => {
  const location = useLocation()
  const {translate, language} = useLanguage()

  useEffect(() => {
    const route: string = location.pathname
    let title: string
    
    if (route.startsWith('/event/')) {
      title = translate(PAGE_TITLES['/event/:id']) || translate("oopsTitle")
    } 
    else {
      title = translate(PAGE_TITLES[route]) || translate("oopsTitle")
    }
    
    document.title = title
  }, [location.pathname, language])

  return null
}

const AdminPage = () => <h1>Admin Page</h1>;

const AppContent = () => {
  return (
    <>
      <TitleUpdater/>
      <Routes>
        <Route path='/' element={<EventsPage />}/>
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:id" element={<ConcreteEventPage />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/profile" element={
          <ProtectedRoute requiredRoles={['Default', 'Admin']}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRoles={['Admin']}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/certificates" element={
          <ProtectedRoute requiredRoles={['Default', 'Admin']}>
            <CertificatesPage />
          </ProtectedRoute>
        } />
        <Route path="/usefulservices" element={
          <ProtectedRoute requiredRoles={['Default', 'Admin']}>
            <UsefulServicesPage />
          </ProtectedRoute>
        } />
        <Route path='*' element={<NotFound 
                                    statusCode={BASE_ERROR_PAGE.statusCode}
                                    statusMessageEN={BASE_ERROR_PAGE.statusMessageEN}
                                    statusMessageRU={BASE_ERROR_PAGE.statusMessageRU}
                                    description={BASE_ERROR_PAGE.description}/>}/>
      </Routes>
    </>
  )
}

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthorizationProvider>
          <AppContent/>
        </AuthorizationProvider>
      </BrowserRouter>
    </>
  )
}

export default App
