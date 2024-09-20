
import React, { useRef, useEffect, useState } from 'react';

const MyComponent = () => {
  const myRef = useRef<HTMLDivElement>(null); // DOM 요소에 대한 참조 생성
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    if (myRef.current) {
      const rect = myRef.current.getBoundingClientRect(); // 요소의 위치 및 크기 가져오기
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });

      // window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
      //    window.flutter_inappwebview.callHandler('reactToFlutter', JSON.stringify(rect.toJSON()));
      // });

      const buttonOffset = {top : rect.top, lenft: rect.left, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height};
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('reactToFlutter', JSON.stringify(buttonOffset));
      }
    } 


  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  return (
    <div>
      <div
        ref={myRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'lightblue',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // 화면 중앙으로 이동
        }}
      >
        대상 컴포넌트
      </div>
      <p>좌표 정보:</p>
      <ul>
        <li>Top: {coords.top}</li>
        <li>Left: {coords.left}</li>
        <li>Width: {coords.width}</li>
        <li>Height: {coords.height}</li>
      </ul>
    </div>
  );

};

export default MyComponent;

