import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MockInterview: React.FC = () => {
  const navigate = useNavigate();

  const externalUrl = 'https://d2381b631800.ngrok-free.app';

  const domains = [
    { id: 'machine-learning', title: 'Machine Learning', description: 'ML, Data pipelines, modeling' },
    { id: 'cloud', title: 'Cloud Engineer', description: 'AWS/GCP/Azure architecture and services' },
    { id: 'backend', title: 'Backend Developer', description: 'APIs, Databases, Scalability' },
    { id: 'frontend', title: 'Frontend Developer', description: 'React, TypeScript, Performance' },
    { id: 'data', title: 'Data Scientist', description: 'ML, Data pipelines, modeling' },
    { id: 'qa', title: 'QA / SDET', description: 'Testing, automation, reliability' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, padding: 40, background: '#f5f7fb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 36, marginBottom: 8, textAlign: 'center' }}>Mock Interview Sessions</h1>
          <p style={{ color: '#6b7280', marginBottom: 24, textAlign: 'center' }}>Choose a technical domain and start a mock interview session.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 24 }}>
            {domains.map((d) => (
              <div
                key={d.id}
                role="button"
                tabIndex={0}
                onClick={() => { window.location.href = externalUrl; }}
                onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = externalUrl; }}
                style={{ cursor: 'pointer', background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 6px 20px rgba(16,24,40,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{d.title}</div>
                  <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>{d.description}</div>
                </div>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>Duration: 10m</div>
                  <button onClick={(e) => { e.stopPropagation(); window.location.href = externalUrl; }} style={{ padding: '8px 12px', background: '#667eea', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Start</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MockInterview;
