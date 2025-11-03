import { useRef, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine
} from "recharts";

// 원자료(단위: 백만달러)
const balanceStats = [
    { year: 2020, income: 95.0, expense: 2735.5 },
    { year: 2021, income: 181.3, expense: 2878.3 },
    { year: 2022, income: 221.6, expense: 2875.5 },
    { year: 2023, income: 228.9, expense: 2875.9 },
    { year: 2024, income: 262.3, expense: 2726.1 },
];

// 수지 계산 (수입-지급)
const statsWithNet = balanceStats.map(d => ({
    ...d,
    net: d.income - d.expense
}));

function StudyAbroadNetLineChart() {
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
            연도별 유학연수 국제수지 추이
        </h2>
        <div ref={chartRef}>
            {animate && (
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={statsWithNet} margin={{ top: 40, right: 30, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                        label={{ value: "백만달러", angle: 0, position: "top", offset: 20, style: { fontSize: 14 } }}
                    />
                    {/* 0 기준선 추가 (적자/흑자 구분) */}
                    <ReferenceLine y={0} stroke="gray" strokeDasharray="2 4" />
                    <Tooltip
                        formatter={value => typeof value === "number"
                        ? value >= 0
                            ? value.toLocaleString() + "백만달러"
                            : value.toLocaleString() + "백만달러 (적자)"
                        : value}
                    />
                    <Legend verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "15px" }} />
                    <Line
                        type="monotone"
                        dataKey="income"
                        name="유학연수수입"
                        stroke="#B7C06E"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        name="유학연수지급"
                        stroke="#B783B9"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="net"
                        name="수지(수입-지급)"
                        stroke="#F5A883"
                        strokeDasharray="2 2"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 7 }}
                    />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 한국은행 경제통계시스템</div>
            <div style={{ marginTop: "6px" }}>
            * 수지(Net)는 유학·연수 서비스 해외유출 규모. 음수(적자)일수록 해외로 지급한 금액이 많음을 의미함 <br />
            * 유학·연수 수지는 초·중·고 및 대학생 이상의 유학생을 모두 포함하여 산정함
            </div>
        </div>
        </>
    );
}

export default StudyAbroadNetLineChart;
