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

const TitleUpdater = () => {
  const location = useLocation()
  const {translate, language} = useLanguage()

  useEffect(() => {
    const route: string = location.pathname
    const title: string = translate(PAGE_TITLES[route]) || translate("oopsTitle")
    document.title = title
  }, [location.pathname, language])

  return null
}

const AdminPage = () => <h1>Admin Page</h1>;
const UsefulServicesPage = () => <h1>Services Page</h1>;
const EventsPage = () => <h1>Events Page</h1>;

const AppContent = () => {
  return (
    <>
      <TitleUpdater/>
      <Routes>
        <Route path='/' element={<div>Home Page</div>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/usefulservices" element={<UsefulServicesPage />} />
        <Route path="/events" element={<EventsPage />} />
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
