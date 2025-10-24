import { useState } from "react";
import "./ChallengeCard.css";

interface ChallengeCardProps {
    title: string;
    challenge: {
        brief: string;
        detailed: string;
    };
    solution: {
        brief: string;
        detailed: string;
    };
    impact: {
        brief: string;
        detailed: string;
    };
    challengeNumber: number;
}

export default function ChallengeCard({ 
    title,
    challenge, 
    solution, 
    impact,
    challengeNumber
}: ChallengeCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="challenge-card-engaging">
            {/* Attention-grabbing header with visual interest */}
            <div className="card-glow"></div>
            
            <div className="card-header-engaging">
                <div className="challenge-badge-animate">
                    <span className="badge-number">{challengeNumber.toString().padStart(2, '0')}</span>
                    <span className="badge-label">Challenge</span>
                </div>
                <div className="status-badge-animate">
                    <span className="pulse-dot"></span>
                    <span className="status-text">Solved</span>
                </div>
            </div>
            
            <h4 className="challenge-title-engaging">
                {title}
            </h4>
            
            {/* Visual separator for better scanning */}
            <div className="info-timeline">
                <div className="timeline-item problem-item">
                    <div className="timeline-icon">
                        <div className="icon-wrapper problem-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className="timeline-connector"></div>
                    </div>
                    <div className="timeline-content">
                        <h5 className="section-label">The Challenge</h5>
                        <p className="section-brief">{challenge.brief}</p>
                        <p className={`section-detailed ${isExpanded ? 'expanded' : ''}`}>
                            {challenge.detailed}
                        </p>
                    </div>
                </div>
                
                <div className="timeline-item solution-item">
                    <div className="timeline-icon">
                        <div className="icon-wrapper solution-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9.663 17H5.5C3.567 17 2 15.433 2 13.5C2 11.567 3.567 10 5.5 10C5.5 7.239 7.739 5 10.5 5C13.261 5 15.5 7.239 15.5 10H16C17.657 10 19 11.343 19 13C19 14.657 17.657 16 16 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M13 13L10 10M10 10L7 13M10 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="timeline-connector"></div>
                    </div>
                    <div className="timeline-content">
                        <h5 className="section-label">The Solution</h5>
                        <p className="section-brief">{solution.brief}</p>
                        <p className={`section-detailed ${isExpanded ? 'expanded' : ''}`}>
                            {solution.detailed}
                        </p>
                    </div>
                </div>
                
                <div className="timeline-item impact-item">
                    <div className="timeline-icon">
                        <div className="icon-wrapper impact-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M13 7L9 11L7 9M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div className="timeline-content">
                        <h5 className="section-label">The Impact</h5>
                        <p className="section-brief">{impact.brief}</p>
                        <p className={`section-detailed ${isExpanded ? 'expanded' : ''}`}>
                            {impact.detailed}
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Engaging CTA with micro-interaction */}
            <button 
                className="expand-button"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span className="button-content">
                    <span className="button-text">
                        {isExpanded ? 'Read Less' : 'Read Full Story'}
                    </span>
                    <span className="button-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                </span>
                <span className="button-shimmer"></span>
            </button>
        </div>
    );
}
