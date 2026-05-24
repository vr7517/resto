// NormalLayout.jsx
import Navbar from '../pages/Navbar'
import { Outlet } from 'react-router-dom';

function NormalLayout() {
  return (
    <>
      <Navbar />
        <main className="pt-24">
        <Outlet />
      </main>
    </>
  );
}

export default NormalLayout;