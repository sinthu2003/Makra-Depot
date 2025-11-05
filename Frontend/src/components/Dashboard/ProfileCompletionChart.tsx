import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfileCompletionChart = ({ user }) => {

  // fields to check
  const fields = [
    user.name,
    user.email,
    user.phone,
    user.address,
    user.dateOfBirth
  ];

  const completedFields = fields.filter(Boolean).length;
  const totalFields = fields.length;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  const data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completionPercentage, 100 - completionPercentage],
        backgroundColor: ["#de8a66ff", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ width: "250px", margin: "auto" }}>
      <Doughnut data={data} options={options} />
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        {completionPercentage}% Complete
      </h3>
    </div>
  );
};

export default ProfileCompletionChart;
