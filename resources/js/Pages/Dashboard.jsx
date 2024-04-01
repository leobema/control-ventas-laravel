import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ["Remera", "Corset", "Gorra"],
    datasets: [
      {
        label: "Productos Vendidos",
        data: [10, 1, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

export default function Dashboard({ auth }) {

    const [chart, setChart] = useState({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
            ],
          },
        },
        series: [
          {
            name: "series",
            data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
          },
        ],
      });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Estadísticas</h2>}
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Ventas
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
              text
              </span>

               <span className="text-xs text-gray-500"> desde siempre </span> 
            </p>
          </div>
        </article>

        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Compras
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
              text
              </span>

              {/* <span className="text-xs text-gray-500"> from $404.32 </span> */}
            </p>
          </div>
        </article>
        
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 50.0%  </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Utilidad
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
              text
              </span>

              {/* <span className="text-xs text-gray-500"> from 0 </span> */}
            </p>
          </div>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Productos
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
              text
              </span>

              {/* <span className="text-xs text-gray-500"> from $404.32 </span> */}
            </p>
          </div>
        </article>
        <div className="grid grid-cols-1 w-full  content-end">
          <label
              className=""
              htmlFor="dateDashboard"
              >
              Período
          </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                type="date"
                id=""
                name=""
              />
      </div>
        <div className="grid grid-cols-4 w-full bg-white rounded-lg py-8 col-span-full justify-center">
        <div className="grid grid-cols-1 w-full max-h-md">
              <Chart 
                  options={chart.options}
                  series={chart.series}
                  type="bar"
                  height="100%"
                />
            </div>
          
         
          <div className="grid grid-cols-2 w-full max-w-md">
  
            <Doughnut data={data} />
            
          </div>
           

      </div>
      </div>
        </AuthenticatedLayout>
    );
}
