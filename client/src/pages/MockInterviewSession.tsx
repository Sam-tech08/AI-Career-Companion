import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const MockInterviewSession: React.FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [transcript, setTranscript] = useState<string[]>([
    'AI: Tell me about yourself and why you are a great fit.'
  ]);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    let t: any;
    if (running) {
      t = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [running]);

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const handleSend = () => {
    if (!userAnswer.trim()) return;
    setTranscript((t) => [...t, `You: ${userAnswer.trim()}`]);
    // simulate AI reply and suggestion
    setTimeout(() => {
      setTranscript((t) => [...t, 'AI: Good — highlight your problem-solving and teamwork experience.']);
    }, 800);
    setUserAnswer('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, padding: 24, background: '#f3f6fb' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>Mock interview Sessions</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Timer</div>
              <div style={{ padding: '6px 10px', background: '#fff', borderRadius: 6, border: '1px solid #e6eef8' }}>{formatTime(seconds)}</div>
              <button onClick={() => { setRunning(!running); }} style={{ padding: '8px 12px', borderRadius: 6 }}>{running ? 'Pause' : 'Resume'}</button>
              <button onClick={() => navigate('/mock-interview')} style={{ padding: '8px 12px', borderRadius: 6 }}>Exit</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            {/* Left: video + user */}
            <div style={{ background: '#fff', padding: 16, borderRadius: 12, minHeight: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ flex: 1, display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, background: '#0f172a', borderRadius: 8, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.5)', padding: '6px 8px', borderRadius: 6 }}>HR - Agent</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 220, height: 140, background: 'linear-gradient(135deg,#9ca3ff,#6b7280)', borderRadius: 6 }} />
                  </div>
                </div>

                <div style={{ width: 260, background: '#fff', borderRadius: 8, border: '1px solid #e6eef8', padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Live Transcript</div>
                  <div style={{ fontSize: 12, color: '#374151', height: 360, overflowY: 'auto', paddingRight: 6 }}>
                    {transcript.map((t, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>{t}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Type your answer..." style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #e5e7eb', minHeight: 64 }} />
                <button onClick={handleSend} style={{ padding: '12px 16px', background: '#667eea', color: '#fff', border: 'none', borderRadius: 8 }}>Send</button>
              </div>
            </div>

            {/* Right: insights / suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#fff', padding: 12, borderRadius: 8, minHeight: 220, border: '1px solid #e6eef8' }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>AI Suggest</div>
                <div style={{ fontSize: 13, color: '#374151' }}>
                  The AI will highlight your strengths and provide suggestions to improve clarity and impact. Try to include metrics and concrete outcomes.
                </div>
              </div>

              <div style={{ background: '#fff', padding: 12, borderRadius: 8, border: '1px solid #e6eef8', flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Key Insights</div>
                <ul style={{ paddingLeft: 18, color: '#374151' }}>
                  <li>Emphasize measurable outcomes</li>
                  <li>Mention team size and your role</li>
                  <li>Keep answers under 2 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MockInterviewSession;
