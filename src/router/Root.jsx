import { Outlet } from 'react-router-dom';
import { useSocketSetup } from '@zustand/socketStore';
import { Toaster } from 'react-hot-toast';

function Root() {
  useSocketSetup();
  return (
    <>
      {/* 여기에 네비게이션 등 공통 UI 요소를 넣을 수 있습니다 */}
      <Toaster/>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default Root;