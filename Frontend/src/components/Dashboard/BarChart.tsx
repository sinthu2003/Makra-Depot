import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { myOrders } from "../../api";
import { useEffect, useState } from "react";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = () => {
  const [order,setOrder] = useState([])
  
  useEffect(()=> {
    datas()
     const interval = setInterval(() => {
      datas()
    },5000)

    return () => clearInterval(interval)
 })
 
  // auto fetch orders
  const datas = async() => {
      const orderList = await myOrders()
      setOrder(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(orderList?.data.data)) {
          return orderList?.data.data
        }
        return prev
      })
    }

  const monthlyCounts = new Array(12).fill(0)

  order?.forEach((o) => {
    const month = new Date(o.createdAt).getMonth()
    monthlyCounts[month]++
  })

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May","June","July","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Orders",
        data: monthlyCounts,
        backgroundColor: "#d5754d",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Chart",
      },
    },
  };
    
  return <Bar data={data} options={options}/>
}

export default BarChart