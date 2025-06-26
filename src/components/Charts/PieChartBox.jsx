// import {
//   PieChart as RePieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F"];

// const PieChartBox = ({ approvedClaims, totalClaims }) => {
//   const pendingClaims = (totalClaims || 0) - (approvedClaims || 0);
//   console.log(pendingClaims);
//   console.log(approvedClaims)
//   console.log(totalClaims)

//   const data = [
//     { name: "Approved", value: approvedClaims || 0 },
//     { name: "Pending", value: pendingClaims > 0 ? pendingClaims : 0 },
//   ];

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <RePieChart>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={80}
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </RePieChart>
//     </ResponsiveContainer>
//   );
// };

// export default PieChartBox;

import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F"];

const PieChartBox = ({ approvedClaims, totalClaims }) => {
  console.log(approvedClaims);
  console.log(totalClaims)
  const approved = approvedClaims;
  const total = totalClaims;
  const pending = Math.max(total - approved, 0);

  let data = [];

  if (total > 0) {
    // Convert counts to percentages
    const approvedPercentage = (approved / total) * 100;
    const pendingPercentage = (pending / total) * 100;

    data = [
      { name: "Approved", value: approvedPercentage },
      { name: "Pending", value: pendingPercentage },
    ];
  } else if (approved > 0 && pending === 0) {
    // Handle 100% approved when totalClaims was not provided
    data = [{ name: "Approved", value: 100 }];
  } else {
    // No data case
    data = [{ name: "No Claims", value: 100 }];
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RePieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length] || "#ccc"}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
      </RePieChart>
    </ResponsiveContainer>
  );
};

export default PieChartBox;
