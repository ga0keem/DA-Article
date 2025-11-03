import { useRef, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

// 표 데이터 기초로 변환
const DropoutRegionStats = [
    { region: "강원", dropout_rate: 7.01430549 },
    { region: "경기", dropout_rate: 5.79064588 },
    { region: "경남", dropout_rate: 5.32319392 },
    { region: "경북", dropout_rate: 5.42869453 },
    { region: "광주", dropout_rate: 4.00145507 },
    { region: "대구", dropout_rate: 4.81058328 },
    { region: "대전", dropout_rate: 6.45317807 },
    { region: "부산", dropout_rate: 5.45031572 },
    { region: "서울", dropout_rate: 5.47578645 },
    { region: "세종", dropout_rate: 6.68016194 },
    { region: "울산", dropout_rate: 9.36170213 },
    { region: "인천", dropout_rate: 8.34586466 },
    { region: "전남", dropout_rate: 11.6071429 },
    { region: "전북", dropout_rate: 7.48592249 },
    { region: "제주", dropout_rate: 12.1863799 },
    { region: "충남", dropout_rate: 8.17165031 },
    { region: "충북", dropout_rate: 6.66666667 },
];

// 중도탈락률 내림차순 정렬
const sortedDropoutData = [...DropoutRegionStats].sort((a, b) => b.dropout_rate - a.dropout_rate);

function DropoutRegionBarChart() {
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
            시도별 유학생 중도탈락률 (%) <span style={{ fontSize: 12, color: "#45537A" }}>24년‧학부 기준</span>
        </h2>
        <div ref={chartRef}>
            {animate && (
                <ResponsiveContainer width="100%" height={650}>
                    <BarChart
                    layout="vertical"
                    data={sortedDropoutData}
                    margin={{ top: 20, right: 80, left: 40, bottom: 50 }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="number"
                        domain={[0, 14]}
                        label={{ value: "중도탈락률 (%)", position: "insideBottomRight", offset: -10 }}
                    />
                    <YAxis
                        dataKey="region"
                        type="category"
                        width={80}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                    <Bar
                        dataKey="dropout_rate"
                        name="중도탈락률"
                        fill="#B783B9"
                        barSize={12}
                        radius={[4, 4, 4, 4]}
                        label={({ x, y, width, value }: any) => (
                        <text x={Number(x) + Number(width) + 6} y={Number(y) + 9} fill="#666" fontSize={12} textAnchor="start">
                            {typeof value === "number" ? value.toFixed(2) + "%" : ""}
                        </text>
                        )}
                    >
                        {sortedDropoutData.map((entry) => (
                            <Cell
                                key={`cell-${entry.region}`}
                                fill={
                                entry.region === "서울" ? "#B7C06E" : // 서울(보라색)
                                entry.region === "경기" ? "#B7C06E" : // 경기(녹색)
                                "#B783B9" // 나머지(주황)
                                }
                            />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 대학알리미</div>
        </div>
        </>
    );
}

export default DropoutRegionBarChart;
