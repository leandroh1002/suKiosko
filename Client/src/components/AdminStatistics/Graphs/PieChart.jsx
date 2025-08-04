// import { useState, useEffect } from "react";
// import * as echarts from "echarts/core";
// import { PieChart } from "echarts/charts";
// import {
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   ToolboxComponent,
// } from "echarts/components";
// import { CanvasRenderer } from "echarts/renderers";

// echarts.use([
//   PieChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
//   ToolboxComponent,
//   CanvasRenderer,
// ]);

// function PieChartComponent() {
//   const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  
//   const [statistics, setStatistics] = useState([]);
//   useEffect(() => {
//     const fetchAndDrawChart = async () => {
//         // const response = await fetch(`${REACT_APP_API_URL}/ventas`);
//         // const data = await response.json();
//         // console.log(data, "data de ventas en pie chart");
        
//         // const misServiciosMasContratados = data.data.serviciosTotales.map(
//         //   (option) => ({
//         //     servicio: option.Servicio || "",
//         //     cantidad: parseInt(option.Cantidad) || 1,
//         //   })
//         // );
//         const response = await fetch(`${REACT_APP_API_URL}/ventas`);
//         const data = await response.json();
//         console.log(data, "data de ventas en pie chart");

//         // Creamos un mapa para acumular cantidades por nombre de producto
//         const productoCantidadMap = new Map();

//         data.forEach((venta) => {
//           venta.DetalleVenta.forEach((detalle) => {
//             const nombreProducto = detalle.Producto?.nombre || "Producto desconocido";
//             const cantidad = detalle.cantidad || 0;

//             if (productoCantidadMap.has(nombreProducto)) {
//               productoCantidadMap.set(
//                 nombreProducto,
//                 productoCantidadMap.get(nombreProducto) + cantidad
//               );
//             } else {
//               productoCantidadMap.set(nombreProducto, cantidad);
//             }
//           });
//         });

//         // Convertimos el Map en un array de objetos para el pie chart
//         const productosMasVendidos = Array.from(productoCantidadMap, ([producto, cantidad]) => ({
//           producto,
//           cantidad,
//         }));

//         console.log(productosMasVendidos);

//         setStatistics(misServiciosMasContratados);

//         const chartDom = document.getElementById("pie-chart");
//         const myChart = echarts.init(chartDom);

//         const option = {
//           tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b}: {c} ({d}%)'
//           },
//           title: {
//             text: "",
//           },
//           toolbox: {
//             right: 10,
//             top: 0,
//             show: true,
//             orient: "vertical",
//             feature: {
//               dataView: { show: true, readOnly: false },
//               mark: { show: true },
//               restore: { show: true },
//               saveAsImage: { show: true },
//             },
//           },
          
         
//           series: [
//             {
//               name: "Servicio",
//               type: "pie",
//               radius: [20, 120],
//               center: ["50%", "50%"], 
//               roseType: "area",
//               itemStyle: {
//                 borderRadius: 6,
//               },
//               label: {
//                 bottom: 10,
//                 width: 170,
//                 height: 70,
//                 formatter: function (params) {
//                   const name = params.name.length > 24 ? params.name.slice(0, 24) + '...' : params.name;
//                   return '{hr|' + name + '}\n{b|Cantidad: ' + params.value + '}  {per|' + params.percent + '%}';
//                 },
//                 backgroundColor: '#F6F8FC',
//                 borderColor: '#8C8D8E',
//                 borderWidth: 1,
//                 borderRadius: 4,
//                 rich: {
//                   a: {
//                     color: '#6E7079',
//                     lineHeight: 22,
//                     align: 'center'
//                   },
//                   hr: {
//                     width: 140,
//                     height: 30,
//                     margin: 'auto',
//                     align: 'left'
//                   },
//                   b: {
//                     color: '#4C5058',
//                     fontSize: 14,
//                     fontWeight: 'bold',
//                     lineHeight: 23,
//                     align: 'left'
//                   },
//                   per: {
//                     color: '#fff',
//                     backgroundColor: '#4C5058',
//                     padding: [3, 4],
//                     borderRadius: 4,
//                     align: 'right'
//                   }
//                 }
//               },
//               data: productosMasVendidos.map((option) => ({
//                 value: option.cantidad || 0,
//                 name: option.servicio ,
//               })),
//             },
//           ],
//         };

//         myChart.setOption(option);

//         return () => {
//           myChart.dispose();
//         };
     
//     };

//     fetchAndDrawChart();
//   }, []);

//   return <div id="pie-chart" style={{ height: "400px" }}></div>;
// }

// export default PieChartComponent;
import { useState, useEffect } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

function PieChartComponent() {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchAndDrawChart = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/ventas`);
        const data = await response.json();
        console.log(data);
        
        // Filtrar ventas no anuladas y parsear números
        const validSales = data.filter((venta) => !venta.anulada);
        let totalGanancia = 0;
        let totalVentas = 0;

        validSales.forEach((venta) => {
          console.log(venta.ganancia_total, "ganancia total de cada venta");
        
          const ganancia = parseFloat(venta.ganancia_total);
          const total = parseFloat(venta.total);
        
          // Verifica si los valores son números válidos antes de sumarlos
          totalGanancia += !isNaN(ganancia) ? ganancia : 0;
          totalVentas += !isNaN(total) ? total : 0;
        });

        const chartData = [
          { name: "Ganancia total", value: totalGanancia },
          { name: "Total de ventas", value: totalVentas },
        ];

        setStatistics(chartData);

        const chartDom = document.getElementById("pie-chart");
        const myChart = echarts.init(chartDom);

        const option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          title: {
            text: "Resumen de ventas",
            left: "center",
          },
          toolbox: {
            right: 10,
            top: 0,
            show: true,
            orient: "vertical",
            feature: {
              dataView: { show: true, readOnly: false },
              mark: { show: true },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: "Estadísticas",
              type: "pie",
              radius: "50%",
              data: chartData,
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

        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      } catch (error) {
        console.error("Error al cargar las ventas:", error);
      }
    };

    fetchAndDrawChart();
  }, []);

  return <div id="pie-chart" style={{ height: "400px" }}></div>;
}

export default PieChartComponent;