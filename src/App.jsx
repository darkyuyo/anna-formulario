import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ClosetSellerPage from './pages/ClosetSellerPage'
import WaitlistPage from './pages/WaitlistPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitlistPage />} />
        <Route path="/quiero-vender-mi-closet" element={<ClosetSellerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
