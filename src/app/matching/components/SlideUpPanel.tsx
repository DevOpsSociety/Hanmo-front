"use client";

import styles from "./SlideUpPanel.module.css"
import { useState } from 'react';

export default function SlideUpPanel() {
  //하드코딩용 옵션 리스트
  const firstOptions = ['상관없음','18학번', '19학번', '20학번', '21학번', '22학번', '23학번', '24학번', '25학번'];

  const [isOpen, setIsOpen] = useState(false); // 패널용
  const [firstValue, setFirstValue] = useState(firstOptions[0]);
  const [firstOpen, setFirstOpen] = useState(false);

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
          <div className={styles.row} onClick={() => setFirstOpen(prev => !prev)}>
            <span className={styles.label}>{firstValue}</span>
            <span className={styles.arrow}>▾</span>
          </div>
          {/* firstOpen이 true일 때만 옵션 리스트(render) */}
          {firstOpen && (
          <ul className={styles.dropdown}>
          {firstOptions.map(opt => (
            <li
            key={opt}
            className={styles.option}
            onClick={() => {
              setFirstValue(opt); 
              setFirstOpen(false);  // 옵션 리스트 닫기
            }}
            >
            {opt}
            </li>
          ))}
          </ul>
          )}
        </div>
          <div></div>
          {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className={styles.closeBtn}
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