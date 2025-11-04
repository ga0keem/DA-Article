import React, { useState, useRef, useEffect } from "react";
import people1 from "./assets/people-1.png";
import people2 from "./assets/people-2.png";
import people3 from "./assets/people-3.png";
import people4 from "./assets/people-4.png";
import people5 from "./assets/people-5.png";
import people6 from "./assets/people-6.png";
import guy1 from "./assets/Guy-1.png";
import guy2 from "./assets/Guy-2.png";
import guy3 from "./assets/Guy-3.png";
import guy4 from "./assets/Guy-4.png";
import woman1 from "./assets/Woman-1.png";
import woman2 from "./assets/Woman-2.png";
import woman3 from "./assets/Woman-3.png";
import woman4 from "./assets/Woman-4.png";
import woman5 from "./assets/Woman-5.png";
import "./Intro.css";

const defaultPersonIcons = [people1, people2, people3, people4, people5, people6];
const foreignGuyIcons = [guy1, guy2, guy3, guy4];
const foreignWomanIcons = [woman1, woman2, woman3, woman4, woman5];

const introDatasets = [
    { year: 2023, label: "2023년 외국인 유학생 비율", count: 6 },
    { year: 2024, label: "2024년 외국인 유학생 비율", count: 7 },
    { year: 2025, label: "2025년 외국인 유학생 비율", count: 8 },
];

function getRandomForeignIndexes(foreignCount: number): number[] {
    const indexes = Array.from({ length: 100 }, (_, i) => i);
    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes.slice(0, foreignCount);
}

const Intro: React.FC = () => {
    const [step, setStep] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const foreignIndexesCache = useRef<number[]>(getRandomForeignIndexes(introDatasets[0].count));
    const containerRef = useRef<HTMLDivElement>(null);

    // 모바일 체크
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initialize and update foreign indexes when step changes
    useEffect(() => {
        if (step <= 2) {
            foreignIndexesCache.current = getRandomForeignIndexes(introDatasets[step].count);
        }
    }, [step]);

    // Scroll-based step detection
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const containerHeight = containerRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollProgress = -containerRect.top / (containerHeight - viewportHeight);

            // Determine step based on scroll progress
            let newStep = 0;
            if (scrollProgress > 0.75) {
                newStep = 3; // Title section
            } else if (scrollProgress > 0.5) {
                newStep = 2;
            } else if (scrollProgress > 0.25) {
                newStep = 1;
            } else {
                newStep = 0;
            }

            if (newStep !== step) {
                setStep(newStep);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [step]);

    const makePeopleIcons = (): React.ReactNode[] => {
        const icons: React.ReactNode[] = [];
        const foreignIndexes = foreignIndexesCache.current;

        for (let i = 0; i < 100; i++) {
            if (foreignIndexes.includes(i)) {
                const pool = [...foreignGuyIcons, ...foreignWomanIcons];
                const imgSrc = pool[i % pool.length];
                icons.push(
                    <div key={i} className="person-cell">
                        <img
                            src={imgSrc}
                            alt="foreign student"
                            className="person-img foreign-student"
                            draggable={false}
                        />
                    </div>
                );
            } else {
                const imgSrc = defaultPersonIcons[i % defaultPersonIcons.length];
                icons.push(
                    <div key={i} className="person-cell">
                        <img
                            src={imgSrc}
                            alt="student"
                            className="person-img"
                            draggable={false}
                        />
                    </div>
                );
            }
        }
        return icons;
    };

    return (
        <div ref={containerRef} style={{ background: "#F1F2F8" }}>
            <section
                style={{
                    minHeight: isMobile ? "200vh" : "400vh",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "sticky",
                        top: 0,
                        height: "100vh",
                    }}
                >
                    {step <= 2 ? (
                        <>
                            <div className="people-grid">{makePeopleIcons()}</div>
                            <div className="intro-chart-label">
                                <span className="label-text">{introDatasets[step].label}</span>
                                <br />
                                <span className="highlight-count-1">100명 중</span>{" "}
                                <span className="highlight-count-2">{introDatasets[step].count}명</span>
                            </div>
                        </>
                    ) : (
                        <div className="intro-title-area">
                            <div className="subtitle">한국 대학의 다문화화</div>
                            <h1 className="main-title taebaek-font">대학은 변하고 있다</h1>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Intro;


