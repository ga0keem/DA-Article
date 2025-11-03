import { useRef, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const regionStats = [
    { region: "서울", totalRatio: 9.0362667, degreeRatio: 6.23343389 },
    { region: "부산", totalRatio: 8.58106179, degreeRatio: 6.02747045 },
    { region: "대구", totalRatio: 6.3386148, degreeRatio: 3.68144572 },
    { region: "인천", totalRatio: 6.3473543, degreeRatio: 4.49098652 },
    { region: "광주", totalRatio: 6.40432099, degreeRatio: 3.91203704 },
    { region: "대전", totalRatio: 9.32527053, degreeRatio: 6.2512108 },
    { region: "울산", totalRatio: 3.95232306, degreeRatio: 2.59139562 },
    { region: "세종", totalRatio: 5.04422869, degreeRatio: 4.35382956 },
    { region: "경기", totalRatio: 9.97260787, degreeRatio: 7.1270389 },
    { region: "강원", totalRatio: 6.98090747, degreeRatio: 5.75821053 },
    { region: "충북", totalRatio: 9.10748859, degreeRatio: 7.39783571 },
    { region: "충남", totalRatio: 7.86672338, degreeRatio: 5.49666808 },
    { region: "전북", totalRatio: 7.58166727, degreeRatio: 5.5157725 },
    { region: "전남", totalRatio: 8.85747857, degreeRatio: 6.84095936 },
    { region: "경북", totalRatio: 8.64652776, degreeRatio: 6.74481767 },
    { region: "경남", totalRatio: 4.21361681, degreeRatio: 2.50670716 },
    { region: "제주", totalRatio: 5.38461538, degreeRatio: 3.7806874 },
];

const sortedData = [...regionStats].sort((a, b) => b.totalRatio - a.totalRatio);

function RegionBarChart() {
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
            시도별 유학생 비율 비교 (%) <span style={{ fontSize: 12, color: "#45537A" }}>25년 기준</span>
        </h2>
        <div ref={chartRef} className="w-full flex flex-col items-center">
            {animate && (
                <ResponsiveContainer width="100%" height={650}>
                    <BarChart
                    layout="vertical"
                    data={sortedData}
                    margin={{ top: 20, right: 40, left: 40, bottom: 50 }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="number"
                        domain={[0, 12]}
                        label={{ value: "비율 (%)", position: "insideBottomRight", offset: -10 }}
                    />
                    <YAxis
                        dataKey="region"
                        type="category"
                        width={80}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                    <Legend verticalAlign="bottom" align="center" height={36} />

                    {/* 전체 유학생 비율 바, 옆에 수치 텍스트 표시 */}
                    <Bar
                        dataKey="totalRatio"
                        name="전체 유학생 비율"
                        fill="#B783B9"
                        barSize={10}
                        radius={[4, 4, 4, 4]}
                        label={({ x, y, width, value }: any) => (
                        <text x={x + width + 6} y={y + 9} fill="#000" fontSize={12} textAnchor="start">
                            {value.toFixed(2)}%
                        </text>
                        )}
                    />

                    {/* 학위과정 비율 바(텍스트 없음) */}
                    <Bar
                        dataKey="degreeRatio"
                        name="학위과정 유학생 비율"
                        fill="#B0D1ED"
                        barSize={10}
                        radius={[4, 4, 4, 4]}
                    />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 한국교육개발원</div>
        </div>
        </>
    );
}

export default RegionBarChart;

