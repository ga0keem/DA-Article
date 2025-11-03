import { useRef, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

// 연도별 주요국가 유학생 수 데이터 (숫자 ',' 제거)
const studentTrends = [
    { year: 2020, 중국: 67030, 베트남: 38337, 우즈벡: 9104, 몽골: 6842 },
    { year: 2021, 중국: 67348, 베트남: 35843, 우즈벡: 8242, 몽골: 6028 },
    { year: 2022, 중국: 67439, 베트남: 37940, 우즈벡: 8608, 몽골: 7348 },
    { year: 2023, 중국: 68065, 베트남: 43361, 우즈벡: 10409, 몽골: 10375 },
    { year: 2024, 중국: 72020, 베트남: 56003, 우즈벡: 12025, 몽골: 12317 }
];

function MajorCountryLineChart() {
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
        <>
        <h2 style={{ textAlign: "center", marginBottom: 20, fontSize: 18 }}>
            연도별 주요국가 유학생 수 추이
        </h2>
        <div ref={chartRef}>
            {animate && (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={studentTrends} margin={{ top: 40, right: 30, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                        label={{ value: "인원(명)", angle: 0, position: "top", offset: 20, style: { fontSize: 14 } }}
                        tickFormatter={v => v.toLocaleString()}
                    />
                    <Tooltip
                        formatter={value => typeof value === "number" ? value.toLocaleString() + "명" : value}
                    />
                    <Line
                        type="monotone"
                        dataKey="중국"
                        name="중국"
                        stroke="#B783B9"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="베트남"
                        name="베트남"
                        stroke="#B7C06E"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="우즈벡"
                        name="우즈벡"
                        stroke="#F3A1B5"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="몽골"
                        name="몽골"
                        stroke="#B0D1ED"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 6 }}
                    />
                    <Legend verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "15px" }} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 한국교육개발원</div>
        </div>
        </>
    );
}

export default MajorCountryLineChart;
