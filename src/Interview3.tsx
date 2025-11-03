import React, { useEffect, useState, useRef } from "react";
import male3 from "./assets/male 3.png";
import female3 from "./assets/female 3.png";
import "./Interview3.css";

const balloons = [
    { text: "팀플할 때 소통이 잘 안돼요", className: "balloon-top" },
    { text: "말할 기회가 없어요", className: "balloon-left" },
    { text: "별로 안친해요", className: "balloon-right" },
];

const Interview3: React.FC = () => {
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
                threshold: 0.5,
                rootMargin: '-20% 0px -20% 0px'
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
        if (step >= 0 && step < balloons.length) {
            // 애니메이션 진행 중: 스크롤 막기
            document.body.style.overflow = 'hidden';
        } else if (step === balloons.length) {
            // 애니메이션 완료: 스크롤 허용
            document.body.style.overflow = 'auto';
        }

        return () => {
            // cleanup: 컴포넌트 언마운트 시 스크롤 복원
            document.body.style.overflow = 'auto';
        };
    }, [step]);

    // 애니메이션 단계 진행
    useEffect(() => {
        if (step >= 0 && step < balloons.length) {
            const t = setTimeout(() => setStep(step + 1), 700);
            return () => clearTimeout(t);
        }
    }, [step]);

    return (
        <div className="interview3-root" ref={rootRef}>
            <img src={male3} alt="person" className="interview3-img img-male" />
            <img src={female3} alt="person" className="interview3-img img-female" />
            {balloons.map((b, idx) => (
                <div
                    key={idx}
                    className={
                        "interview3-balloon " +
                        b.className +
                        " " +
                        (step > idx ? "visible" : "")
                    }
                >
                    {b.text}
                </div>
            ))}
        </div>
    );
};

export default Interview3;
