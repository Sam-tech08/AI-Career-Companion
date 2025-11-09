import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AnalyticsData {
  totalUsers: number;
  totalApplications: number;
  avgJobFitScore: number;
  weeklySummary: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [analytics] = useState<AnalyticsData>({
    totalUsers: 1247,
    totalApplications: 3892,
    avgJobFitScore: 87.5,
    weeklySummary: 'This week saw a 23% increase in user registrations and a 15% improvement in average job-fit scores. The AI Resume Builder feature has been the most popular, with 456 new resumes created. Top performing job categories are Software Engineering and Data Science.'
  });
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    // Fetch profile to validate admin role
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/admin/login');
          return;
        }

        const res = await fetch('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (!res.ok || !json.user || json.user.role !== 'admin') {
          // Not authorized
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/admin/login');
        }
      } catch (err) {
        console.error('Admin check failed', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const sections = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'blogs', name: 'Manage Blogs', icon: '📝' },
    { id: 'services', name: 'Manage Services', icon: '⚙️' },
    { id: 'jobs', name: 'Manage Jobs', icon: '💼' },
    { id: 'applications', name: 'View Applications', icon: '📋' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827' }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
            Manage your platform
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{
          width: 260,
          background: '#fff',
          borderRight: '1px solid #e5e7eb',
          minHeight: 'calc(100vh - 73px)',
          padding: '24px 0'
        }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%',
                padding: '12px 24px',
                background: activeSection === section.id ? '#f3f4f6' : 'transparent',
                color: activeSection === section.id ? '#667eea' : '#6b7280',
                border: 'none',
                borderLeft: activeSection === section.id ? '3px solid #667eea' : '3px solid transparent',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: 20 }}>{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 32 }}>
          {activeSection === 'overview' && (
            <>
              {/* Analytics Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 24,
                marginBottom: 32
              }}>
                <div style={{
                  background: '#fff',
                  padding: 24,
                  borderRadius: 12,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
                  <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>Total Users</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#111827' }}>
                    {analytics.totalUsers.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#10b981', marginTop: 8 }}>
                    ↑ 12% from last month
                  </div>
                </div>

                <div style={{
                  background: '#fff',
                  padding: 24,
                  borderRadius: 12,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
                  <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>Total Applications</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#111827' }}>
                    {analytics.totalApplications.toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#10b981', marginTop: 8 }}>
                    ↑ 8% from last month
                  </div>
                </div>

                <div style={{
                  background: '#fff',
                  padding: 24,
                  borderRadius: 12,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
                  <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>Avg Job-Fit Score</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#111827' }}>
                    {analytics.avgJobFitScore}%
                  </div>
                  <div style={{ fontSize: 12, color: '#10b981', marginTop: 8 }}>
                    ↑ 5% from last month
                  </div>
                </div>
              </div>

              {/* Weekly Summary */}
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: 32,
                borderRadius: 12,
                color: '#fff',
                marginBottom: 32
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 32 }}>🤖</span>
                  <h2 style={{ fontSize: 20, fontWeight: 700 }}>AI-Generated Weekly Summary</h2>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.95 }}>
                  {analytics.weeklySummary}
                </p>
              </div>
            </>
          )}

          {activeSection === 'blogs' && (
            <div style={{ background: '#fff', padding: 32, borderRadius: 12 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Blogs</h2>
              <button style={{
                padding: '12px 24px',
                background: '#667eea',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 24
              }}>
                + Add New Blog
              </button>
              <div style={{ color: '#6b7280', fontSize: 14 }}>
                Blog management interface would be implemented here with CRUD operations.
              </div>
            </div>
          )}

          {activeSection === 'services' && (
            <div style={{ background: '#fff', padding: 32, borderRadius: 12 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Services</h2>
              <button style={{
                padding: '12px 24px',
                background: '#667eea',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 24
              }}>
                + Add New Service
              </button>
              <div style={{ color: '#6b7280', fontSize: 14 }}>
                Service management interface would be implemented here with CRUD operations.
              </div>
            </div>
          )}

          {activeSection === 'jobs' && (
            <div style={{ background: '#fff', padding: 32, borderRadius: 12 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Manage Jobs</h2>
              <button style={{
                padding: '12px 24px',
                background: '#667eea',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 24
              }}>
                + Post New Job
              </button>
              <div style={{ color: '#6b7280', fontSize: 14 }}>
                Job posting management interface would be implemented here with CRUD operations.
              </div>
            </div>
          )}

          {activeSection === 'applications' && (
            <div style={{ background: '#fff', padding: 32, borderRadius: 12 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>View Applications</h2>
              <div style={{ color: '#6b7280', fontSize: 14 }}>
                Application tracking and management interface would be implemented here.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
