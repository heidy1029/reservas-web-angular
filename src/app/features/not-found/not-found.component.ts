import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="er-not-found-container">
      <div class="er-not-found-card">
        <div class="er-404-glitch" data-text="404">404</div>
        <h1 class="er-not-found-title">Página no encontrada</h1>
        <p class="er-not-found-text">La página que buscas no existe o ha sido movida.</p>
        <div class="er-illustration">
          <div class="er-circle-pulse"></div>
          <i class="fa-solid fa-compass-drafting er-compass-icon"></i>
        </div>
        <a routerLink="/dashboard" class="er-btn-primary mt-4">
          <i class="fa-solid fa-house"></i>
          Volver al Dashboard
        </a>
      </div>
    </div>
  `,
  styles: [`
    .er-not-found-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 120px);
      padding: 20px;
      background: var(--er-background);
      font-family: 'Outfit', 'Inter', sans-serif;
    }

    .er-not-found-card {
      background: var(--er-surface);
      border: 1px solid var(--er-border);
      border-radius: var(--er-radius-xl);
      padding: 48px;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: var(--er-shadow-lg);
      animation: erFadeUp .4s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .er-404-glitch {
      font-size: 96px;
      font-weight: 900;
      color: var(--er-primary);
      line-height: 1;
      margin-bottom: 16px;
      position: relative;
      letter-spacing: 2px;
      animation: erPulse 2s infinite ease-in-out;
    }

    .er-not-found-title {
      font-size: 24px;
      font-weight: 800;
      color: var(--er-text);
      margin-bottom: 8px;
    }

    .er-not-found-text {
      color: var(--er-muted);
      font-size: 15px;
      margin-bottom: 32px;
      max-width: 320px;
    }

    .er-illustration {
      position: relative;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
    }

    .er-circle-pulse {
      position: absolute;
      width: 80px;
      height: 80px;
      background: var(--er-primary-light);
      border-radius: 50%;
      animation: erPulseCircle 2.5s infinite ease-in-out;
    }

    .er-compass-icon {
      font-size: 40px;
      color: var(--er-primary);
      z-index: 1;
      animation: erRotateCompass 4s infinite linear;
    }

    @keyframes erFadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes erPulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    @keyframes erPulseCircle {
      0% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.8;
      }
      100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
    }

    @keyframes erRotateCompass {
      0% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(15deg);
      }
      50% {
        transform: rotate(-15deg);
      }
      75% {
        transform: rotate(10deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  `]
})
export class NotFoundComponent {}
