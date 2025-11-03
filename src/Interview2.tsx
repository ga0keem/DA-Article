import React, { useEffect, useState, useRef } from "react";
import female2 from "./assets/female-2.png";
import "./Interview2.css";

const Interview2: React.FC = () => {
  // 0: fadein, 1: visible, 2: 말풍선
    const [step, setStep] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) return; // 이미 실행되었으면 observer 생성하지 않음

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setStep(0);
            // 애니메이션 시작 후 observer 해제
            observer.disconnect();
            }
        },
        { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
        );
        const currentRef = rootRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => {
        observer.disconnect();
        };
    }, [isVisible]);

    useEffect(() => {
        if (step >= 0 && step < 2) {
        document.body.style.overflow = 'hidden';
        } else if (step === 2) {
        document.body.style.overflow = 'auto';
        }
        return () => {
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
        // step 2: 말풍선
    }, [step]);

    return (
        <div className="interview2-root" ref={rootRef}>
        <div className="interview2-img-row">
            <img
            src={female2}
            alt="female2"
            className={`interview2-img interview2-img-female2
                ${step === 0 ? "fadein" : ""}
                ${step >= 1 ? "visible" : ""}
                ${step < 0 ? "hidden" : ""}
            `}
            />
            {step === 2 && (
            <div className="interview2-balloon">
                한국에서 취업하고 싶어요!
            </div>
            )}
        </div>
        </div>
    );
};

export default Interview2;


