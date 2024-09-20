
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
    } 
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  return (
    <div>
      <div ref={myRef} style={{ top: 100, left: 100, width: '100px', height: '100px', backgroundColor: 'lightblue' }}>
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

