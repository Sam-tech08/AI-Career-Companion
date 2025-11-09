import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/common/Hero';
import Footer from '../components/common/Footer';
import InteractiveProductCard from '../components/common/InteractiveProductCard';
import { useNavigate } from 'react-router-dom';



const Home: React.FC = () => {
        const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <Hero />
                        <section className="home-cards-section" style={{ padding: '48px 24px', background: '#fff' }}>
                            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                                <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, textAlign: 'center' }}>Get started</h2>
                                <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 28 }}>Explore our main tools — optimized for speed and accessibility.</p>

                                <div className="home-cards-grid">
                                    <InteractiveProductCard
                                        imageUrl={'🤖'}
                                        title={'AI Resume Builder'}
                                        description={'Generate an AI-optimized resume tailored to the job description.'}
                                        onClick={() => navigate('/ai-resume-builder')}
                                        onActionClick={() => navigate('/ai-resume-builder')}
                                    />

                                    <InteractiveProductCard
                                        imageUrl={'💼'}
                                        title={'Careers'}
                                        description={'Browse jobs, get AI optimizations and apply in one click.'}
                                        onClick={() => navigate('/jobs')}
                                        onActionClick={() => navigate('/jobs')}
                                    />

                                    <InteractiveProductCard
                                        imageUrl={'🎙️'}
                                        title={'Mock Interview'}
                                        description={'Practice interviews with coached feedback and tips.'}
                                        onClick={() => navigate('/mock-interview')}
                                        onActionClick={() => navigate('/mock-interview')}
                                    />
                                </div>
                            </div>
                        </section>
            <Footer />
        </div>
    );
};

export default Home;