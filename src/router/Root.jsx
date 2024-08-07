import { Outlet, useLocation } from 'react-router-dom';
import { useSocketSetup } from '@zustand/socketStore';
import { Toaster } from 'react-hot-toast';
import Footer from '@components/footer/Footer';

function Root() {
  useSocketSetup();
  const location = useLocation();

  // MessageContainer 페이지에서는 Footer를 숨깁니다
  const showFooter = !location.pathname.startsWith('/chat/');
  return (
    
      <div className='overflow-hidden'>
        {/* 여기에 네비게이션 등 공통 UI 요소를 넣을 수 있습니다 */}
        <Toaster/>
        <div id="detail">
          <Outlet />
        </div>
        {showFooter && <Footer/>}
      </div>
    
  );
}

export default Root;