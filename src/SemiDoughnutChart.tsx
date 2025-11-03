import { useRef, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { region: "남아메리카", count: 1034 },
    { region: "북아메리카", count: 4217 },
    { region: "아시아", count: 189635 },
    { region: "아프리카", count: 3011 },
    { region: "오세아니아", count: 384 },
    { region: "유럽", count: 10681 },
];

const sortedData = [...data].sort((a, b) => b.count - a.count);
const COLORS = ["#B783B9", "#B0D1ED", "#FDE583", "#F5A883", "#F3A1B5", "#B7C06E"];

const countryData = [
    { country: "중국", ratio: 34.5 },
    { country: "베트남", ratio: 26.8 },
    { country: "우즈벡", ratio: 5.8 },
    { country: "몽골", ratio: 5.9 },
    { country: "일본", ratio: 2.5 },
    { country: "미국", ratio: 1.5 },
    { country: "기타", ratio: 23.1 },
];
const COUNTRY_COLORS = ["#B783B9", "#B0D1ED", "#FDE583", "#F5A883", "#F3A1B5", "#B7C06E", "#dddddd"];

function SemiDoughnutCharts() {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setAnimate(true);
                observer.disconnect(); // 최초 한 번만 트리거
            }
        }, { threshold: 0.1, rootMargin: "50px" });
        if (chartRef.current) observer.observe(chartRef.current);
        return () => observer.disconnect();
    }, []);

    return (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            gap: 60,
            alignItems: "center",
        }}
        >
        {/* 출신지역별 반도넛 차트 */}
        <div ref={chartRef} style={{ width: "100%", maxWidth: 600 }}>
            <h2 style={{ textAlign: "center", marginBottom: 18, fontSize: 18 }}>
            출신지역별 유학생 수 현황 <span style={{ fontSize: 12, color: "#45537A" }}>24년 기준</span>
            </h2>
            {animate && (
                <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                    data={sortedData}
                    dataKey="count"
                    nameKey="region"
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={50}
                    outerRadius={110}
                    paddingAngle={3}
                    label={({ name, percent, x, y }) => (
                        <text
                        x={x}
                        y={y}
                        fontSize={name === "아시아" ? 16 : 9}
                        fill="#222"
                        fontWeight={name === "아시아" ? 500 : 400}
                        alignmentBaseline="middle"
                        textAnchor={name === "아시아" ? "middle" : "start"}
                        >
                        {`${name} ${(percent as number * 100).toFixed(1)}%`}
                        </text>
                    )}
                    labelLine={true}
                    >
                    {sortedData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toLocaleString()}명`} />
                </PieChart>
                </ResponsiveContainer>
            )}
        </div>

        {/* 주요 국가별 도넛 차트 */}
        <div style={{ width: "100%", maxWidth: 600 }}>
            <h2 style={{ textAlign: "center", marginBottom: 18, fontSize: 18 }}>
            주요 국가별 유학생 비율 <span style={{ fontSize: 12, color: "#45537A" }}>24년 기준</span>
            </h2>
            {animate && (
                <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                    data={countryData}
                    dataKey="ratio"
                    nameKey="country"
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={50}
                    outerRadius={110}
                    paddingAngle={3}
                    label={({ country, percent, x, y }) => (
                        <text
                        x={x}
                        y={y}
                        fontSize={country === "중국" ? 16 : 9}
                        fill="#222"
                        fontWeight={country === "중국" ? 500 : 400}
                        alignmentBaseline="middle"
                        textAnchor="middle"
                        >
                        {`${country} ${(percent as number * 100).toFixed(1)}%`}
                        </text>
                    )}
                    labelLine={true}
                    >
                    {countryData.map((_entry, index) => (
                        <Cell key={`cell-country-${index}`} fill={COUNTRY_COLORS[index % COUNTRY_COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                </PieChart>
                </ResponsiveContainer>
                )}
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 20, fontSize: 12, color: "#666" }}>
            <div>출처: 한국교육개발원</div>
        </div>
        </div>
    </div>
    );
}

export default SemiDoughnutCharts;




