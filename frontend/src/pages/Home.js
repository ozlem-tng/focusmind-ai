import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function Home() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/records/3');
        setRecords(response.data);
      } catch (error) {
        console.error('Kayıtlar alınamadı:', error);
      }
    };

    fetchRecords();
  }, []);

  const totalRecords = records.length;

  const lastFocus =
    records.length > 0 ? records[records.length - 1].focus_prediction : '-';

  const averageStudy =
    records.length > 0
      ? (
          records.reduce((sum, record) => sum + record.study_hours, 0) /
          records.length
        ).toFixed(1)
      : '-';

  const convertFocusToNumber = (focus) => {
    if (!focus) return 0;
    if (focus.toLowerCase().includes('low')) return 1;
    if (focus.toLowerCase().includes('medium')) return 2;
    if (focus.toLowerCase().includes('high')) return 3;
    return 0;
  };

  const chartLabels = records.map((record) =>
    new Date(record.created_at).toLocaleDateString('tr-TR'),
  );

  const chartValues = records.map((record) =>
    convertFocusToNumber(record.focus_prediction),
  );

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Odak Seviyesi',
        data: chartValues,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        min: 1,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (value === 1) return 'Low';
            if (value === 2) return 'Medium';
            if (value === 3) return 'High';
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="card">
      <h1>FocusMind AI</h1>

      <p>
        Günlük çalışma alışkanlıklarını analiz ederek odak seviyeni tahmin eden
        ve sana öneriler sunan basit bir destek sistemi.
      </p>

      <button
        className="primary-button"
        onClick={() => navigate('/veri-girisi')}
      >
        Veri Girişine Git
      </button>

      <div className="summary-grid">
        <div className="summary-box">
          <h3>Toplam Kayıt</h3>
          <p>{totalRecords}</p>
        </div>

        <div className="summary-box">
          <h3>Son Odak Sonucu</h3>
          <p>{lastFocus}</p>
        </div>

        <div className="summary-box">
          <h3>Ortalama Çalışma</h3>
          <p>{averageStudy === '-' ? '-' : `${averageStudy} saat`}</p>
        </div>
      </div>

      {records.length > 0 && (
        <div className="chart-box">
          <h3>Odak Seviyesi Grafiği</h3>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default Home;
