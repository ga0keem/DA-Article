import { useRef, useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const studentStats = [
    { year: 2023, foreigners_total: 181842 },
    { year: 2024, foreigners_total: 208962 },
    { year: 2025, foreigners_total: 253434 }
];

function EduAbroadBarChart() {
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
        <h2 style={{ textAlign: "center", marginBottom: 20, fontSize: 18  }}>
            연도별 유학생 수
        </h2>
        <div ref={chartRef} className="w-full flex flex-col items-center">
            {animate && (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={studentStats} margin={{ top: 40, right: 30, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                        label={{ value: "유학생 수(명)", angle: 0, position: "top", offset: 20, style: { fontSize: 14 } }}
                        tickFormatter={v => v.toLocaleString()}
                    />
                    <Tooltip 
                        formatter={(value) => `${value.toLocaleString()}명`}
                    />
                    <Bar
                        dataKey="foreigners_total"
                        name="유학생 수"
                        fill="#B783B9"
                        barSize={24}
                        radius={[6, 6, 6, 6]}
                    />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div> 
        <div style={{ textAlign: "right", marginTop: 12, marginRight: 30, fontSize: 12, color: "#666" }}>
            <div>출처: 한국교육개발원</div>
            <div style={{ marginTop: "6px" }}>* 전문대학, 4년제대학, 대학원대학, 원격대학, 각종학교에 재학중인 외국인 유학생 모두 포함</div>
        </div>
        </>
    );
}


export default EduAbroadBarChart;

