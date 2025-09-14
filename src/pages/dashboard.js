import React from "react";
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
  // Sample Data
  const energyData = [
    { name: "Solar", value: 40 },
    { name: "Wind", value: 30 },
    { name: "Other", value: 30 },
  ];

  const storageData = [
    { name: "Used", value: 70 },
    { name: "Available", value: 30 },
  ];

  const consumptionData = [
    { name: "Homes", value: 50 },
    { name: "Farms", value: 30 },
    { name: "Shops", value: 20 },
  ];
  const voltageDrop =[
    { name : "10:00", value: 2},
    { name : "11:00", value: 5},
    { name : "12:00", value: 15},
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-100 min-h-screen relative z-30">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-800 z-10 relative">
        IoT Solar Grid Monitoring Dashboard
      </h1>

      {/* Pie Charts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-16 z-10 relative">
        {/* Energy Source Distribution */}
        <div className="relative z-20 bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center mb-2">
            Energy Source Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={energyData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {energyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Storage Usage */}
        <div className="relative z-20 bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center mb-2">
            Storage Utilization
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={storageData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {storageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Consumption Breakdown */}
        <div className="relative z-20 bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center mb-2">
            Consumption Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={consumptionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {consumptionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="relative z-20 bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center mb-2">
            Voltage Drop
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={voltageDrop}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {voltageDrop.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="relative z-20 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-center mb-4">
          Daily Energy Generation (kWh)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="solar" fill="#FFA726" />
            <Bar dataKey="wind" fill="#42A5F5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
