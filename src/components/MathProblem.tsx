'use client';

import React, { useState, useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface MathProblemProps {
  problem: string;
  highlights: string[];
  answers?: string[];
}

const answerNumbers: string[] = ["①", "②", "③", "④", "⑤"];

const MathProblemDisplay: React.FC<MathProblemProps> = ({ problem, highlights, answers }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const answerNumberRefs = useRef<(HTMLSpanElement | null)[]>([]); // 숫자에 대한 참조 배열 생성

  useEffect(() => {
    if (answers) {
      const rects = answerNumberRefs.current.map(ref => ref?.getBoundingClientRect());
    //   const screen = 
      console.log(rects); // 숫자의 좌표 정보를 로그에 출력\
      const webviewSize = {clientHeight : containerRef.current?.clientHeight, scrollHeight : containerRef.current?.scrollHeight};
      console.log(webviewSize);
      console.log(containerRef.current?.offsetHeight);
      if(window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('reactToFlutter', JSON.stringify(rects));
        window.flutter_inappwebview.callHandler('webviewSize', JSON.stringify(webviewSize));
        
      }
    }
  }, [answers]); // answers가 변경될 때마다 실행

  const renderMathContent = (content: string) => {
    const parts = content.split(/(\$.*?\$)/);
    
    return parts.map((part, partIndex) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        return <InlineMath key={`math-${partIndex}`} math={part.slice(1, -1)} />;
      } else {
        let result: (string | React.ReactElement)[] = [part];
        highlights.forEach((highlight, highlightIndex) => {
          result = result.flatMap(node => {
            if (typeof node !== 'string') return [node];
            
            const splitParts = node.split(new RegExp(`(${highlight})`, 'g'));
            return splitParts.map((subPart, subPartIndex) => {
              if (subPart === highlight) {
                return (
                  <span key={`highlight-${partIndex}-${highlightIndex}-${subPartIndex}`} className="highlight-container">
                    <span className="highlight-text">{subPart}</span>
                    {isHighlighted && <span className="highlight"></span>}
                  </span>
                );
              }
              return subPart;
            });
          });
        });
        return <span key={`text-${partIndex}`}>{result}</span>;
      }
    });
  };

  return (
    <div ref={containerRef} className="math-problem text-lg leading-relaxed ">
      <div className="mb-4">{renderMathContent(problem)}</div>
      <div style={{height:"1000px", backgroundColor: "violet"}}></div>
      {answers && (
        <div className="mt-4 w-full">
          <div className="grid grid-cols-3 gap-4" style={{padding:"20px"}}>
            {answers.map((answer, index) => (
              <div 
                key={index} 
                className="p-2 rounded-md flex items-center justify-start h-full cursor-pointer"
              >
                <div className="w-full flex items-center"> 
                  <span 
                    ref={el => answerNumberRefs.current[index] = el} // 숫자에 대한 참조 설정
                    className="answer-number"
                  >
                    {answerNumbers[index]}
                  </span>
                  {renderMathContent(answer)}
                </div>
              </div>
            ))}
            {[...Array(Math.max(0, 6 - answers.length))].map((_, index) => (
              <div key={`empty-${index}`} className="p-2 rounded-md flex items-center justify-start h-full" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MathProblemDisplay;
