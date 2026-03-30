import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function History() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      navigate('/giris');
      return;
    }

    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/records/${userId}`,
        );
        setRecords(response.data);
      } catch (err) {
        console.error('Kayıtlar alınamadı:', err);
        setError('Kayıtlar alınamadı.');
      }
    };

    fetchRecords();
  }, [navigate, userId]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('tr-TR');
  };

  return (
    <div className="card">
      <h2>Geçmiş Kayıtlar</h2>

      {error && <p>{error}</p>}

      {records.length === 0 ? (
        <p>Henüz kayıt bulunmuyor.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Çalışma</th>
              <th>Mola</th>
              <th>Uyku</th>
              <th>Ekran</th>
              <th>Kafein</th>
              <th>Stres</th>
              <th>Odak</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{formatDate(record.created_at)}</td>
                <td>{record.study_hours}</td>
                <td>{record.break_count}</td>
                <td>{record.sleep_hours}</td>
                <td>{record.screen_time}</td>
                <td>{record.caffeine_cups}</td>
                <td>{record.stress_level}</td>
                <td>{record.focus_prediction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
