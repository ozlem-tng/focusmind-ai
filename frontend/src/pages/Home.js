import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
    </div>
  );
}

export default Home;