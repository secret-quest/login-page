"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from 'react';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';

const verifyProof = async (proof: any) => {
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...proof, action: "player-only-lobbies" }),
    });

    if (response.ok) {
      const { success, message } = await response.json();
      return success;
    } else {
      const { message } = await response.json();
      throw new Error(message);
    }
  } catch (error) {
    console.error("Verification failed:", error);
    throw error;
  }
};

const onSuccess = () => {
  console.log("World ID verification successful");
  // Optionally update UI or state here
};

export default function Home() {
  const { user } = useDynamicContext();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

  useEffect(() => {
    const video = document.getElementById('bg-video') as HTMLVideoElement;
    if (video) {
      video.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="content-wrapper">
      <header>
        <div className="container">
          <nav>
            <div className="logo">Secret Quest</div>
            <div className="nav-links">
              <DynamicWidget />
              <IDKitWidget
                app_id="app_staging_37cfcfbf727938290fe0d73c94c64870"
                action="player-only-lobbies"
                onSuccess={onSuccess}
                handleVerify={verifyProof}
                verification_level={VerificationLevel.Device}
              >
                {({ open }) => (
                  <button onClick={open} className="worldcoin-button">
                    Verify with World ID
                  </button>
                )}
              </IDKitWidget>
              
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Towers of Deception</h1>
            <button className="cta-button">Join Lobby</button>
            <p></p>
            {verificationStatus && <p className="verification-status">{verificationStatus}</p>}
          </div>
        </section>

        <section className="game-info container">
          <div className="info-section">
            <h2>Active Tower Floors</h2>
            <ul className="info-list">
              <li>
                <div className="tower-info">
                  <span className="tower-name">Nexus Tower (Central Hub)</span>
                  <button className="spectate-button">Spectate</button>
                </div>
                <span className="quest-info">Floor 42: "The Riddle of Mirrors" - 15/20 players</span>
              </li>
              <li>
                <div className="tower-info">
                  <span className="tower-name">Chronos Spire</span>
                  <button className="spectate-button">Spectate</button>
                </div>
                <span className="quest-info">Floor 27: "Temporal Paradox" - 18/20 players</span>
              </li>
            </ul>
          </div>
          <div className="info-section">
            <h2>Starting Tower Floors</h2>
            <ul className="info-list">
              <li>
                <div className="tower-info">
                  <span className="tower-name">Novice Tower</span>
                  <button className="join-button">Join</button>
                </div>
                <span className="quest-info">Floor 1: "Beginner's Enigma" - 3/20 players</span>
              </li>
              <li>
                <div className="tower-info">
                  <span className="tower-name">Apprentice Spire</span>
                  <button className="join-button">Join</button>
                </div>
                <span className="quest-info">Floor 1: "First Deceptions" - 7/20 players</span>
              </li>
            </ul>
          </div>
          <div className="info-section">
            <h2>Player-Only Floors</h2>
            <ul className="info-list">
              <li>
                <div className="tower-info">
                  <span className="tower-name">Deception Den</span>
                  <button className="join-button">Join</button>
                </div>
                <span className="quest-info">Players act as deceivers - 5/10 players</span>
              </li>
              <li>
                <div className="tower-info">
                  <span className="tower-name">Liar's Lair</span>
                  <button className="join-button">Join</button>
                </div>
                <span className="quest-info">Advanced deception game - 8/12 players</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <video autoPlay muted loop playsInline id="bg-video">
        <source src="/v7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <style jsx>{`
        .worldcoin-button {
          background-color: var(--accent-color);
          color: var(--text-color);
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-right: 10px;
        }

        .worldcoin-button:hover {
          background-color: var(--secondary-color);
          color: var(--primary-color);
          box-shadow: 0 0 15px var(--accent-color);
        }

        .cta-button,
        .spectate-button,
        .join-button {
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .verification-status {
          margin-top: 10px;
          font-weight: bold;
          color: var(--accent-color);
        }
      `}</style>
    </div>
  );
}