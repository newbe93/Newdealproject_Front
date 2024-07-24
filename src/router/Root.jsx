import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      {/* 여기에 네비게이션 등 공통 UI 요소를 넣을 수 있습니다 */}
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default Root;