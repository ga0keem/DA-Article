import { useRef, useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const studentStats = [
    { year: 2023, ratio_total: 5.97604613, degree_ratio: 4.24733671 },
    { year: 2024, ratio_total: 6.94862602, degree_ratio: 4.84756465 },
    { year: 2025, ratio_total: 8.40096741, degree_ratio: 5.93988711 }
];

function EduAbroadLineChart() {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setAnimate(true);
                observer.disconnect(); // 최초 한 번만 트리거
            }
        }, { threshold: 0.3 });
        if (chartRef.current) observer.observe(chartRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
        <h2 style={{ textAlign: "center", marginBottom: 20, fontSize: 18 }}>
            연도별 유학생 비율 추이
        </h2>
        <div ref={chartRef}>
            {animate && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={studentStats} margin={{ top: 40, right: 30, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                        label={{ value: "유학생 비율(%)", angle: 0, position: "top", offset: 20, style: { fontSize: 14 } }}
                        tickFormatter={v => Number(v).toFixed(1) + "%"}
                    />
                    <Tooltip 
                        formatter={value => typeof value === "number" ? value.toFixed(2) + "%" : value}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="ratio_total" 
                        name="전체 유학생 비율"
                        stroke="#B783B9" 
                        strokeWidth={3} 
                        dot 
                        activeDot={{ r: 6 }} 
                    />
                    <Line 
                        type="monotone" 
                        dataKey="degree_ratio" 
                        name="학위과정 유학생 비율"
                        stroke="#B7C06E" 
                        strokeWidth={3} 
                        dot 
                        activeDot={{ r: 6 }} 
                    />
                    <Legend 
                        verticalAlign="bottom" 
                        align="center"
                        wrapperStyle={{ fontSize: "15px" }} 
                    />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 한국교육개발원</div>
            <div style={{ marginTop: "6px" }}>
            * 비학위과정에는 교육과정공동운영생, 어학연수생, 교환연수생, 방문연수생, 기타연수생이 포함됨
            </div>
        </div>
        </>
    );
}

export default EduAbroadLineChart;

