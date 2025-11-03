import { useRef, useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// 표 데이터 기반
const dropoutStats = [
    { year: 2022, dropout_rate: 6.79101046 },
    { year: 2023, dropout_rate: 7.25448194 },
    { year: 2024, dropout_rate: 6.00150038 }
];

function DropoutLineChart() {
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
            연도별 유학생 중도탈락률 추이 <span style={{ fontSize: 12, color: "#45537A" }}>학부 기준</span>
        </h2>
        <div ref={chartRef}>
            {animate && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dropoutStats} margin={{ top: 40, right: 30, left: 30, bottom: 5 }} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                        domain={[0, 10]}
                        label={{ value: "중도탈락률(%)", angle: 0, position: "top", offset: 20, style: { fontSize: 14 } }}
                        tickFormatter={v => typeof v === "number" ? v.toFixed(1) + "%" : String(v)}
                    />
                    <Tooltip
                        formatter={value =>
                        typeof value === "number" ? value.toFixed(2) + "%" : String(value)
                        }
                    />
                    <Line
                        type="monotone"
                        dataKey="dropout_rate"
                        name="중도탈락률"
                        stroke="#B7C06E"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 6 }}
                    />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 대학알리미</div>
            <div style={{ marginTop: "6px" }}>
                * 산출식: (중도탈락 학생 / 재적학생)*100 <br />
                * 학부는 방송통신대, 사이버대학(대학, 전문대학)을 제외한 값 
            </div>
        </div>
        </>
    );
}

export default DropoutLineChart;
