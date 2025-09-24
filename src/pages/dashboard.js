import React, { useState, useEffect } from "react";
import "../App.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [storageData, setStorageData] = useState([
    { name: "Used", value: 60 },
    { name: "Available", value: 40 },
  ]);

  const energyData = [
    { name: "Energy generated", value: 40 },
    { name: "Energy Should generated", value: 30 },
  ];

  const consumptionData = [
    { name: "Homes", value: 50 },
    { name: "Farms", value: 30 },
  ];

  const dailyBarData = [
    { day: "Mon", solar: 120, wind: 80 },
    { day: "Tue", solar: 150, wind: 100 },
    { day: "Wed", solar: 170, wind: 90 },
    { day: "Thu", solar: 140, wind: 110 },
    { day: "Fri", solar: 180, wind: 120 },
    { day: "Sat", solar: 200, wind: 130 },
    { day: "Sun", solar: 160, wind: 100 },
  ];

  const COLORS = ["#FFA726", "#42A5F5", "#66BB6A", "#FF7043"];
  const machineReading = 0.45; // 45% efficiency

  // Update storageData on "k" press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k") {
        setStorageData([
          { name: "Used", value: 85 }, // random for demo
          { name: "Available", value: 15 },
        ]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const alerts = [];
  const totalEnergy = energyData.reduce((a, b) => a + b.value, 0);
  const usedStorage = storageData.find((d) => d.name === "Used").value;
  const efficiencyPercent = Math.round(machineReading * 100);

  if (totalEnergy < 50)
    alerts.push({
      label: "Energy Generation",
      text: `Energy generation is low (${totalEnergy}%). Increase input!`,
    });
  if (usedStorage > 80)
    alerts.push({
      label: "Storage Status",
      text: `Storage is almost full (${usedStorage}%). Distribute energy soon!`,
    });
  if (efficiencyPercent < 50)
    alerts.push({
      label: "Machine Efficiency",
      text: `Current efficiency is low (${efficiencyPercent}%). Inspect machines!`,
    });

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-10 text-gray-800">
        IoT Solar Grid Monitoring Dashboard
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {/* Energy Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-center mb-2">Energy</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={energyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={{ fontSize: 16 }}
                >
                  {energyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 14 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Storage Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-center mb-2">
              Storage Utilization
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={storageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={{ fontSize: 16 }}
                >
                  {storageData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 14 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Consumption Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition">
            <h2 className="text-lg font-semibold text-center mb-2">
              Consumption Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={consumptionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={{ fontSize: 16 }}
                >
                  {consumptionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 14 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="w-full lg:w-1/3 bg-gray-800 shadow-xl rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-center text-white">
              Alert Panel
            </h2>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl shadow-md bg-red-600 hover:bg-red-700 transition"
                >
                  <h3 className="font-semibold text-lg text-white">
                    {alert.label}
                  </h3>
                  <p className="text-sm mt-1 text-white">{alert.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 hover:shadow-2xl transition">
        <h2 className="text-lg font-semibold text-center mb-4">
          Daily Energy Generation (kWh)
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dailyBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 14 }} />
            <Bar dataKey="solar" fill="#FFA726" radius={[5, 5, 0, 0]} />
            <Bar dataKey="wind" fill="#42A5F5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
