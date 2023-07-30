import { Route, Routes } from 'react-router-dom';
import Page404 from '../pages/public/404Page';

function RoutesWithNotFound({ children }) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
export default RoutesWithNotFound;