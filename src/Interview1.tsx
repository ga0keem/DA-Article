import React, { useEffect, useState, useRef } from "react";
import male1 from "./assets/male 1.png";
import male2 from "./assets/male 2.png";
import "./Interview1.css";

const Interview1: React.FC = () => {
  // 0: male1 fadein, 1: male1 visible, 2: male1 fadeout, 3: male2 fadein, 4: speech bubble
    const [step, setStep] = useState(-1); // -1: 애니메이션 시작 전
    const [isVisible, setIsVisible] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    // Intersection Observer로 화면 중앙에 왔을 때 감지
    useEffect(() => {
        if (isVisible) return; // 이미 실행되었으면 observer 생성하지 않음

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    setStep(0); // 애니메이션 시작
                    // 애니메이션 시작 후 observer 해제
                    observer.disconnect();
                }
            },
            {
                threshold: 0.5, // 50% 보이면 트리거 (화면 중앙)
                rootMargin: '-20% 0px -20% 0px' // 화면 중앙 영역에서 트리거
            }
        );

        const currentRef = rootRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            observer.disconnect();
        };
    }, [isVisible]);

    // 애니메이션 진행 중 스크롤 막기
    useEffect(() => {
        if (step >= 0 && step < 4) {
            // 애니메이션 진행 중: 스크롤 막기
            document.body.style.overflow = 'hidden';
        } else if (step === 4) {
            // 애니메이션 완료: 스크롤 허용
            document.body.style.overflow = 'auto';
        }

        return () => {
            // cleanup: 컴포넌트 언마운트 시 스크롤 복원
            document.body.style.overflow = 'auto';
        };
    }, [step]);

    useEffect(() => {
        if (step === 0) {
        const t = setTimeout(() => setStep(1), 800);
        return () => clearTimeout(t);
        }
        if (step === 1) {
        const t = setTimeout(() => setStep(2), 1000);
        return () => clearTimeout(t);
        }
        if (step === 2) {
        const t = setTimeout(() => setStep(3), 800);
        return () => clearTimeout(t);
        }
        if (step === 3) {
        const t = setTimeout(() => setStep(4), 800);
        return () => clearTimeout(t);
        }
    }, [step]);

    return (
        <div className="interview1-root" ref={rootRef}>
        <div className="interview1-img-row">
            {/* male1 이미지 */}
            <img
            src={male1}
            alt="male1"
            className={`interview1-img interview1-img-male1
                ${step === 0 ? "fadein" : ""}
                ${step === 1 ? "visible" : ""}
                ${step === 2 ? "fadeout" : ""}
            `}
            />
            {/* male2 이미지 */}
            <img
            src={male2}
            alt="male2"
            className={`interview1-img interview1-img-male2
                ${step >= 3 ? "fadein" : ""}
                ${step < 3 ? "hidden" : ""}
            `}
            />
            {/* 말풍선 */}
            {step === 4 && (
            <div className="interview1-balloon">
                마치 내가 유학을 온 것 같아
            </div>
            )}
        </div>
        </div>
    );
};

export default Interview1;
