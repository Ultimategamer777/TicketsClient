import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, CardContent, Typography } from "@mui/material";

export default function PieChart({ title, subtitle, data, name }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    chartInstanceRef.current = chart;

    const option = {
      title: {
        text: title,
        subtext: subtitle,
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal", 
        bottom: 0,
      },
      series: [
        {
          name,
          type: "pie",
          radius: "50%",
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [data, name, title, subtitle]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <div
          ref={chartRef}
          style={{ width: "100%", height: 400 }}
        />
      </CardContent>
    </Card>
  );
}
