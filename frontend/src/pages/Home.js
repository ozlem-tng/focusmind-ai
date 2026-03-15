import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/records/1");
        setRecords(response.data);
      } catch (error) {
        console.error("Kayıtlar alınamadı:", error);
      }
    };

    fetchRecords();
  }, []);

  const totalRecords = records.length;

  const lastFocus =
    records.length > 0 ? records[records.length - 1].focus_prediction : "-";

  const averageStudy =
    records.length > 0
      ? (
          records.reduce((sum, record) => sum + record.study_hours, 0) /
          records.length
        ).toFixed(1)
      : "-";

  return (
    <div className="card">
      <h1>FocusMind AI</h1>

      <p>
        Günlük çalışma alışkanlıklarını analiz ederek odak seviyeni tahmin eden
        ve sana öneriler sunan basit bir destek sistemi.
      </p>

      <button
        className="primary-button"
        onClick={() => navigate("/veri-girisi")}
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
          <p>{averageStudy === "-" ? "-" : `${averageStudy} saat`}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;