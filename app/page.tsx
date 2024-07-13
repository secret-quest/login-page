"use client";

import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect } from 'react';

export default function Home() {
  const { user } = useDynamicContext();

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
              <button className="cta-button">Join Lobby</button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Towers of Deception</h1>
            <p>Solve puzzles, uncover lies, survive the climb</p>
          </div>
        </section>

        <section className="game-info container">
          <div className="info-section">
            <h2>Active Tower Floors</h2>
            <ul className="info-list">
              <li>
                <span className="tower-name">Nexus Tower (Central Hub)</span><br />
                <span className="quest-info">Floor 42: "The Riddle of Mirrors" - 15/20 players</span>
              </li>
              <li>
                <span className="tower-name">Chronos Spire</span><br />
                <span className="quest-info">Floor 27: "Temporal Paradox" - 18/20 players</span>
              </li>
            </ul>
          </div>
          <div className="info-section">
            <h2>Starting Tower Floors</h2>
            <ul className="info-list">
              <li>
                <span className="tower-name">Novice Tower</span><br />
                <span className="quest-info">Floor 1: "Beginner's Enigma" - 3/20 players</span>
                <button className="join-button">Join</button>
              </li>
              <li>
                <span className="tower-name">Apprentice Spire</span><br />
                <span className="quest-info">Floor 1: "First Deceptions" - 7/20 players</span>
                <button className="join-button">Join</button>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <video autoPlay muted loop playsInline id="bg-video">
        <source src="/v7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}