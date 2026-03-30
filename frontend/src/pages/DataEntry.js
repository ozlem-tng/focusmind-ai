import React, { useState } from 'react';
import axios from 'axios';

function DataEntry() {
  const [formData, setFormData] = useState({
    user_id: 3,
    study_hours: '',
    break_count: '',
    sleep_hours: '',
    screen_time: '',
    caffeine_cups: '',
    stress_level: '',
  });

  const [result, setResult] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/predict',
        formData,
      );
      console.log('Predict response:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Predict hatası:', error);
      console.error('Response data:', error.response?.data);
      alert('Backend bağlantısı başarısız');
    }
  };

  const sendFeedback = async (value) => {
    if (!result?.id) {
      setFeedbackMessage('Feedback için kayıt id bulunamadı.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/feedback', {
        record_id: result.id,
        is_correct: value,
      });
      setFeedbackMessage('Geri bildiriminiz için teşekkürler!');
    } catch (error) {
      console.error('Feedback gönderilemedi:', error);
      console.error('Feedback response:', error.response?.data);
      setFeedbackMessage('Feedback gönderilemedi.');
    }
  };

  const getFocusClass = (focusText) => {
    if (!focusText) return 'result-box';

    if (focusText.toLowerCase().includes('high')) {
      return 'result-box result-high';
    }

    if (focusText.toLowerCase().includes('medium')) {
      return 'result-box result-medium';
    }

    if (focusText.toLowerCase().includes('low')) {
      return 'result-box result-low';
    }

    return 'result-box';
  };

  return (
    <div className="card">
      <h2>Günlük Veri Girişi</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>Çalışma Süresi (saat)</label>
        <input
          type="number"
          name="study_hours"
          value={formData.study_hours}
          onChange={handleChange}
          required
        />

        <label>Mola Sayısı</label>
        <input
          type="number"
          name="break_count"
          value={formData.break_count}
          onChange={handleChange}
          required
        />

        <label>Uyku Süresi (saat)</label>
        <input
          type="number"
          name="sleep_hours"
          value={formData.sleep_hours}
          onChange={handleChange}
          required
        />

        <label>Ekran Süresi (saat)</label>
        <input
          type="number"
          name="screen_time"
          value={formData.screen_time}
          onChange={handleChange}
          required
        />

        <label>Kafein Miktarı</label>
        <input
          type="number"
          name="caffeine_cups"
          value={formData.caffeine_cups}
          onChange={handleChange}
          required
        />

        <label>Stres Seviyesi (1-10)</label>
        <input
          type="number"
          name="stress_level"
          value={formData.stress_level}
          onChange={handleChange}
          required
        />

        <button className="primary-button" type="submit">
          Tahmin Yap
        </button>
      </form>

      {result && (
        <div
          className={getFocusClass(
            result.focus_level || result.focus_prediction,
          )}
        >
          <h3>Odak Seviyesi</h3>
          <p className="focus-text">
            {result.focus_level || result.focus_prediction}
          </p>

          <h3>Öneri</h3>
          <p>{result.recommendation}</p>

          <div className="feedback-box">
            <p>Bu öneri faydalı mı?</p>

            <button type="button" onClick={() => sendFeedback(true)}>
              👍 Faydalıydı
            </button>

            <button type="button" onClick={() => sendFeedback(false)}>
              👎 Faydalı değildi
            </button>

            {feedbackMessage && <p>{feedbackMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataEntry;
