import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { getJobChartData } from "../api/job-api";

const JobChart = () => {
    const [data, setData] = useState({ pieChart: [], barChart: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getJobChartData();
                if (res.EC === 0) {
                    setData(res.DT);
                }
            } catch (err) {
                console.error("Error fetching chart data:", err);
            }
        };

        fetchData();
    }, []);

    const pieColors = ["#4ade80", "#f87171"]; // xanh lá - đỏ

    return (
        <div className="">
            {/* Stats row */}
            <div class="row g-4 mb-4 mx-2 mt-3">
                <div class="col-12 col-md-4">
                    <div class="d-flex flex-column justify-content-center align-items-center bg-primary bg-opacity-25 text-primary p-4 rounded-4 shadow">
                        <p class="fs-5 fw-semibold mb-1">Tổng số công việc</p>
                        <p class="fs-3 fw-bold mb-0">{data.totalJobs}</p>
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="d-flex flex-column justify-content-center align-items-center bg-success bg-opacity-25 text-success p-4 rounded-4 shadow">
                        <p class="fs-5 fw-semibold mb-1">Đã hoàn thành</p>
                        <p class="fs-3 fw-bold mb-0">{data.completed}</p>
                    </div>
                </div>

                <div class="col-12 col-md-4">
                    <div class="d-flex flex-column justify-content-center align-items-center bg-warning bg-opacity-25 text-warning p-4 rounded-4 shadow">
                        <p class="fs-5 fw-semibold mb-1">Chưa hoàn thành</p>
                        <p class="fs-3 fw-bold mb-0">{data.uncompleted}</p>
                    </div>
                </div>
            </div>
            {/* Chart row */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* PieChart */}
                <div className="flex-1 bg-white rounded-2xl shadow p-4 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">Tỉ lệ công việc</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.pieChart}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {data.pieChart.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={pieColors[index % pieColors.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* BarChart */}
                <div className="flex-1 bg-white rounded-2xl shadow p-4 flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-4">Công việc chưa hoàn thành theo bộ phận</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={data.barChart}
                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                            barCategoryGap="5%" // chỉnh khoảng cách giữa cột
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="department" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Số công việc chưa hoàn thành" fill="#60a5fa" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    );
};

export default JobChart;
