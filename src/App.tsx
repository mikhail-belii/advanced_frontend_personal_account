import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BASE_ERROR_PAGE, PAGE_TITLES } from './constants'
import NotFound from './pages/NotFound/NotFound'

const TitleUpdater = () => {
  const location = useLocation()

  useEffect(() => {
    const oops: string = "Упс..."
    const route: string = location.pathname
    const title: string = PAGE_TITLES[route] || oops
    document.title = title
  }, [location.pathname])

  return null
}

function App() {

  return (
    <>
      <BrowserRouter>
        <TitleUpdater/>
        <Routes>
          <Route path='/' element={<div>Home Page</div>}/>
          <Route path='/signin' element={<LoginPage/>}/>
          <Route path='*' element={<NotFound 
                                      statusCode={BASE_ERROR_PAGE.statusCode}
                                      statusMessageEN={BASE_ERROR_PAGE.statusMessageEN}
                                      statusMessageRU={BASE_ERROR_PAGE.statusMessageRU}
                                      description={BASE_ERROR_PAGE.description}/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
