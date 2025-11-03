import { useRef, useEffect, useState } from "react";
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const langStats = [
    { year: 2023, lang_ratio: 48.5788634, korlang_ratio: 39.305893 },
    { year: 2024, lang_ratio: 48.5642962, korlang_ratio: 36.2547533 },
    { year: 2025, lang_ratio: 49.9026855, korlang_ratio: 31.8798192 }
];

function LangMixChart() {
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
            연도별 언어‧한국어능력 충족 비율 <span style={{ fontSize: 12, color: "#45537A" }}>학부 기준</span>
        </h2>
        <div ref={chartRef}>
            {animate && (
                <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={langStats} margin={{ top: 40, right: 30, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                        domain={[0, 100]}
                        label={{
                        value: "비율(%)",
                        angle: 0,
                        position: "top",
                        offset: 20,
                        style: { fontSize: 14 }
                        }}
                        tickFormatter={v => typeof v === "number" ? v.toFixed(1) + "%" : String(v)}
                    />
                    <Tooltip
                        formatter={value => typeof value === "number" ? value.toFixed(1) + "%" : String(value)}
                    />
                    <Legend verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: "15px" }} />
                    <Bar
                        dataKey="lang_ratio"
                        name="언어능력 충족 비율"
                        fill="#B783B9"
                        barSize={18}
                        radius={[6, 6, 6, 6]}
                    />
                    <Line
                        type="monotone"
                        dataKey="korlang_ratio"
                        name="한국어능력 충족 비율"
                        stroke="#B7C06E"
                        strokeWidth={3}
                        dot
                        activeDot={{ r: 7 }}
                    />
                    </ComposedChart>
                </ResponsiveContainer>
            )}
        </div>
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 대학알리미</div>
            <div style={{ marginTop: "6px" }}>
                * 학부는 방송통신대, 사이버대학(대학, 전문대학)을 제외한 값 <br />
                * 언어능력 충족 비율은 학부 유학생 중 TOPIK 4급 이상, 영어 능력 TOEFL 530 점 이상, 영어권 유학생 비율 <br />
                * 한국어능력 충족 비율은 학부 유학생 중 TOPIK 4급 이상(예·체능계의 경우 3급 이상)의 비율
            </div>
        </div>
        </>
    );
}

export default LangMixChart;



