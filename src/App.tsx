import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { DetailPage } from '@/pages/DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal — lista de pokémon */}
        <Route path="/" element={<HomePage />} />

        {/* Ruta de detalle — recibe el nombre como parámetro */}
        <Route path="/pokemon/:name" element={<DetailPage />} />

        {/* Cualquier ruta desconocida redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;