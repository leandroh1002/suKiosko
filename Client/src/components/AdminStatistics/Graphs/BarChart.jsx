import { useState, useEffect } from "react";
import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { UniversalTransition } from "echarts/features";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
]);

function ServicesValues() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const [ventasData, setVentasData] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/ventas`);
        const ventas = await response.json();

        // Agrupar por semana ISO
        const grouped = {};

        ventas.forEach((venta) => {
          const fecha = dayjs(venta.fecha);
          const year = fecha.isoWeekYear();
          const week = fecha.isoWeek();

          const key = `${year}-W${week}`;

          if (!grouped[key]) {
            grouped[key] = { ganancia: 0, total: 0 };
          }

          grouped[key].ganancia += parseFloat(venta.ganancia_total);
          grouped[key].total += parseFloat(venta.total);
        });

        // Obtener las últimas 4 semanas ordenadas
        const sortedWeeks = Object.keys(grouped)
          .sort((a, b) => (a > b ? 1 : -1))
          .slice(-4);

        const chartData = sortedWeeks.map((week) => ({
          semana: week,
          ganancia: grouped[week].ganancia,
          total: grouped[week].total,
        }));

        setVentasData(chartData);

        const chartDom = document.getElementById("payments-chart");
        const myChart = echarts.init(chartDom);

        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          toolbox: {
            show: true,
            orient: "vertical",
            right: 0,
            top: 10,
            feature: {
              magicType: { show: true, type: ["bar", "line"] },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ["Ganancia", "Total"],
          },
          xAxis: {
            type: "category",
            data: chartData.map((d) => d.semana),
            axisPointer: {
              type: "shadow",
            },
          },
          yAxis: {
            type: "value",
            name: "Monto ($)",
            axisLabel: {
              formatter: "{value}",
            },
          },
          series: [
            {
              name: "Ganancia",
              type: "bar",
              data: chartData.map((d) => d.ganancia),
              itemStyle: { color: "#4caf50" },
            },
            {
              name: "Total",
              type: "bar",
              data: chartData.map((d) => d.total),
              itemStyle: { color: "#2196f3" },
            },
          ],
        };

        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      } catch (error) {
        console.error("Error al obtener ventas:", error);
      }
    };

    fetchVentas();
  }, []);

  return <div id="payments-chart" style={{ height: "400px" }}></div>;
}

export default ServicesValues;
