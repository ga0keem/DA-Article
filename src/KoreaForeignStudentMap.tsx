import { useState, useRef, useEffect } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import type { Feature } from "geojson";

import koreaGeoJson from "../korea-geojson.json";

interface RegionData {
    region: string;
    count: number;
    ratio: number;
    coords: [number, number];
}

const koreaData: RegionData[] = [
    { region: "Seoul", count: 82911, ratio: 9.0363, coords: [126.978, 37.5665] },
    { region: "Busan", count: 18630, ratio: 8.5811, coords: [129.0756, 35.1796] },
    { region: "Daegu", count: 7457, ratio: 6.3386, coords: [128.6014, 35.8714] },
    { region: "Incheon", count: 5440, ratio: 6.3474, coords: [126.7052, 37.4563] },
    { region: "Gwangju", count: 6640, ratio: 6.4043, coords: [126.8514, 35.1595] },
    { region: "Daejeon", count: 13478, ratio: 9.3253, coords: [127.3845, 36.3504] },
    { region: "Ulsan", count: 1333, ratio: 3.9523, coords: [129.3114, 35.5384] },
    { region: "Sejong", count: 1169, ratio: 5.0442, coords: [127.289, 36.48] },
    { region: "Gyeonggi-do", count: 49040, ratio: 9.9726, coords: [127.5183, 37.4138] },
    { region: "Gangwon-do", count: 7565, ratio: 6.9809, coords: [128.4602, 37.8228] },
    { region: "Chungcheongbuk-do", count: 10537, ratio: 9.1075, coords: [127.7223, 36.6356] },
    { region: "Chungcheongnam-do", count: 13871, ratio: 7.8667, coords: [126.8005, 36.5184] },
    { region: "Jeollabuk-do", count: 8650, ratio: 7.5817, coords: [127.1088, 35.8208] },
    { region: "Jeollanam-do", count: 5126, ratio: 8.8575, coords: [126.7074, 34.8679] },
    { region: "Gyeongsangbuk-do", count: 16109, ratio: 8.6465, coords: [129.2227, 36.4919] },
    { region: "Gyeongsangnam-do", count: 4162, ratio: 4.2136, coords: [128.6811, 35.2384] },
    { region: "Jeju-do", count: 1316, ratio: 5.3846, coords: [126.5312, 33.4996] },
];

const BAR_COLORS = [
    { color: "#B783B9", label: "30,000명 이상" },
    { color: "#B7C06E", label: "10,000명 이상 ~ 30,000명 미만" },
    { color: "#B0D1ED", label: "10,000명 미만" },
];

type Projection = (coords: [number, number]) => [number, number];

function getBarColor(value: number): string {
    if (value > 30000) return "#B783B9";
    if (value > 10000) return "#B7C06E"; 
    return "#B0D1ED"; 
}

function convertRegionName(region: string): string {
    const mapping: Record<string, string> = {
        Seoul: "서울",
        Busan: "부산",
        Daegu: "대구",
        Incheon: "인천",
        Gwangju: "광주",
        Daejeon: "대전",
        Ulsan: "울산",
        Sejong: "세종",
        "Gyeonggi-do": "경기",
        "Gangwon-do": "강원",
        "Chungcheongbuk-do": "충북",
        "Chungcheongnam-do": "충남",
        "Jeollabuk-do": "전북",
        "Jeollanam-do": "전남",
        "Gyeongsangbuk-do": "경북",
        "Gyeongsangnam-do": "경남",
        "Jeju-do": "제주",
    };
    return mapping[region] || region;
}

export default function KoreaForeignStudentMap() {
    const projectionRef = useRef<Projection | null>(null);
    const [, setDummy] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [animComplete, setAnimComplete] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 모바일 체크
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const target = containerRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setAnimComplete(true);
            observer.disconnect();
            }
        },
        { threshold: 0.3 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="w-full flex flex-col items-center">
        <h2 style={{ textAlign: "center", marginBottom: 20, fontSize: 18 }}>
            시도별 유학생 수 현황 <span style={{ fontSize: 12, color: "#45537A" }}>25년 기준</span>
        </h2>

        <div style={{ display: "flex", gap: 16, marginBottom: 16, justifyContent: "center" }}>
            {BAR_COLORS.map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                style={{
                    background: color,
                    width: 16,
                    height: 16,
                    display: "inline-block",
                    borderRadius: 2,
                }}
                />
                <span style={{ fontSize: 13, color: "#000" }}>{label}</span>
            </div>
            ))}
        </div>

        <ComposableMap
            projection="geoMercator"
            projectionConfig={{
                center: [127.8, 36.0],
                scale: isMobile ? 5500 : 3500
            }}
            style={{
                width: "100%",
                height: isMobile ? "80vh" : "60vh"
            }}
        >
            <Geographies
            geography={koreaGeoJson}
            >
            {({ geographies, projection }: { geographies: Feature[]; projection: Projection }) => {
                if (!projectionRef.current) {
                projectionRef.current = projection;
                setDummy((v) => !v);
                }
                return geographies.map((geo: Feature) => (
                <Geography
                    key={geo.properties?.NAME_1 || geo.id}
                    geography={geo}
                    fill="#383838"
                    stroke="#444"
                    strokeWidth={0.3}
                    style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                    }}
                />
                ));
            }}
            </Geographies>

            {projectionRef.current &&
            koreaData.map(({ coords, count, region }) => {
                const [x, y] = projectionRef.current!(coords);
                const barHeight = Math.sqrt(count) * 0.5;
                const color = getBarColor(count);

                const height = animComplete ? barHeight : 0;
                const rectY = animComplete ? y - barHeight : y;

                return (
                <g key={region}>
                    <rect
                    x={x - 2.5}
                    y={rectY}
                    width={5}
                    height={height}
                    fill={color}
                    rx={2}
                    style={{ transition: "height 1s ease, y 1s ease" }}
                    data-tooltip-id="region-tooltip"
                    data-tooltip-content={`${convertRegionName(region)}\n유학생 수: ${count.toLocaleString()}명`}
                    />
                    <text
                    x={x}
                    y={y + 15}
                    textAnchor="middle"
                    fill="white"
                    fontSize={12}
                    fontWeight="600"
                    style={{ pointerEvents: "none" }}
                    >
                    {convertRegionName(region)}
                    </text>
                </g>
                );
            })}
        </ComposableMap>

        <ReactTooltip
            id="region-tooltip"
            place="top"
            style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "white",
            padding: "6px 10px",
            borderRadius: "6px",
            fontSize: "13px",
            whiteSpace: "pre-line",
            zIndex: 9999,
            }}
        />

        <div style={{ textAlign: "right", fontSize: 12, color: "#aaa", marginTop: 10 }}>
            출처: 한국교육개발원
        </div>
        </div>
    );
}




