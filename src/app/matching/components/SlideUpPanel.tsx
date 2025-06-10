"use client";

import styles from "./SlideUpPanel.module.css"
import { useState } from 'react';

interface SlideUpPanelProps {
  studentYear: string;
  setStudentYear: React.Dispatch<React.SetStateAction<string>>;
  mbtiEI: "E" | "I" | "상관없음";
  setMbtiEI: React.Dispatch<React.SetStateAction<"E" | "I" | "상관없음">>;
  mbtiFT: "F" | "T" | "상관없음";
  setMbtiFT: React.Dispatch<React.SetStateAction<"F" | "T" | "상관없음">>;
}

export default function SlideUpPanel(
  {
    studentYear,
    setStudentYear,
    mbtiEI,
    setMbtiEI,
    mbtiFT,
    setMbtiFT,
  }:SlideUpPanelProps) {
  // 옵션 리스트
  const firstOptions = ['상관없음','18학번', '19학번', '20학번', '21학번', '22학번', '23학번', '24학번', '25학번'];
  const secondOptions = ['상관없음','E', 'I'] as const; 
  const thirdOptions = ['상관없음','F', 'T'] as const;

  const [isOpen, setIsOpen] = useState(false); // 패널용
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);

  return (
    <>
      <div className={styles.slideUpDiv}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={styles.toggleBtn}
      >
        {isOpen ? '닫기' : '상세설정'}
      </button>

      {/* 슬라이드 */}
      <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.panelContent}>
        <div className={styles.rowContainer}>
          <div className={styles.row} 
          onClick={() => setFirstOpen(prev => !prev)}
          >
            <span className={styles.label}>{studentYear}</span>
            <span className={styles.arrow}>▾</span>
          </div>
          {firstOpen && (
          <ul className={styles.dropdown}>
          {firstOptions.map(opt => (
            <li
              key={opt}
              className={styles.option}
              onClick={() => {
                setStudentYear(opt); 
                setFirstOpen(false);  // 옵션 리스트 닫기
              }}
            >
              {opt}
            </li>
          ))}
          </ul>
          )}
        </div>
        <div className={styles.rowContainer}>
          <div className={styles.row} 
            onClick={() => setSecondOpen(prev => !prev)}>
            <span className={styles.label}>{mbtiEI}</span>
            <span className={styles.arrow}>▾</span>
          </div>
          {/* firstOpen이 true일 때만 옵션 리스트(render) */}
          {secondOpen && (
          <ul className={styles.dropdown}>
          {secondOptions.map(opt => (
            <li
            key={opt}
            className={styles.option}
            onClick={() => {
              setMbtiEI(opt); 
              setSecondOpen(false);  // 옵션 리스트 닫기
            }}
            >
            {opt}
            </li>
          ))}
          </ul>
          )}
        </div>
        <div className={styles.rowContainer}>
          <div className={styles.row} onClick={() => setThirdOpen(prev => !prev)}>
            <span className={styles.label}>{mbtiFT}</span>
            <span className={styles.arrow}>▾</span>
          </div>
          {/* firstOpen이 true일 때만 옵션 리스트(render) */}
          {thirdOpen && (
          <ul className={styles.dropdown}>
          {thirdOptions.map(opt => (
            <li
            key={opt}
            className={styles.option}
            onClick={() => {
              setMbtiFT(opt); 
              setThirdOpen(false);  // 옵션 리스트 닫기
            }}
            >
            {opt}
            </li>
          ))}
          </ul>
          )}
        </div>

        
          {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className={`${styles.closeBtn} font-[pretendard]`}
          >
            확인
          </button>
          )}  
        </div>
      </div>
    </div>
  </>
  
  )
}