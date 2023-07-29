import { html } from 'lit-html';

import {
  CaptionButton,
  ChaptersMenu,
  ChapterTitle,
  FullscreenButton,
  MuteButton,
  PiPButton,
  PlayButton,
  SettingsMenu,
  TimeGroup,
  TimeSlider,
  VolumeSlider,
} from './shared-ui';

export function renderVideo(isMobile: boolean) {
  return isMobile ? MobileUI() : DesktopUI();
}

function MobileUI() {
  return html`
    <div class="vds-media-ui">
      ${Gestures()}${BufferingIndicator()}
      <media-captions class="vds-captions"></media-captions>

      <div class="vds-scrim"></div>

      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          <div class="vds-controls-spacer"></div>
          ${CaptionButton({ tooltip: 'bottom' })}
          ${ChaptersMenu({ tooltip: 'bottom', placement: 'bottom end' })}
          ${SettingsMenu({ tooltip: 'bottom', placement: 'bottom end' })}
          ${MuteButton({ tooltip: 'bottom end' })}
        </media-controls-group>

        <div class="vds-controls-group">${PlayButton({ tooltip: 'top' })}</div>

        <media-controls-group class="vds-controls-group">
          ${TimeGroup()}${ChapterTitle()}
          <div class="vds-controls-spacer"></div>
          ${FullscreenButton({ tooltip: 'top end' })}
        </media-controls-group>

        <media-controls-group class="vds-controls-group">${TimeSlider()}</media-controls-group>
      </media-controls>

      <div class="vds-start-duration">
        <media-time class="vds-time" type="duration"></media-time>
      </div>
    </div>
  `;
}

function DesktopUI() {
  return html`
    <div class="vds-media-ui">
      ${Gestures()}${BufferingIndicator()}
      <media-captions class="vds-captions"></media-captions>

      <div class="vds-scrim"></div>

      <media-controls class="vds-controls">
        <media-controls-group class="vds-controls-group">
          <div class="vds-controls-spacer"></div>
          ${ChaptersMenu({ tooltip: 'bottom end', placement: 'bottom end' })}
          ${SettingsMenu({ tooltip: 'bottom end', placement: 'bottom end' })}
        </media-controls-group>

        <div class="vds-controls-spacer"></div>

        <media-controls-group class="vds-controls-group">${TimeSlider()}</media-controls-group>

        <media-controls-group class="vds-controls-group">
          ${PlayButton({ tooltip: 'top start' })}
          ${MuteButton({ tooltip: 'top' })}${VolumeSlider()}${TimeGroup()}
          ${ChapterTitle()}${CaptionButton({ tooltip: 'top' })}${PiPButton()}
          ${FullscreenButton({ tooltip: 'top end' })}
        </media-controls-group>
      </media-controls>
    </div>
  `;
}

function BufferingIndicator() {
  return html`
    <div class="vds-buffering-indicator">
      <svg class="vds-buffering-icon" fill="none" viewBox="0 0 120 120" aria-hidden="true">
        <circle class="vds-buffering-track" cx="60" cy="60" r="54" stroke="currentColor"></circle>
        <circle
          class="vds-buffering-track-fill"
          cx="60"
          cy="60"
          r="54"
          stroke="currentColor"
          pathLength="100"
        ></circle>
      </svg>
    </div>
  `;
}

function Gestures() {
  return html`
    <div class="vds-gestures">
      <media-gesture class="vds-gesture" event="pointerup" action="toggle:paused"></media-gesture>
      <media-gesture class="vds-gesture" event="pointerup" action="toggle:controls"></media-gesture>
      <media-gesture
        class="vds-gesture"
        event="dblpointerup"
        action="toggle:fullscreen"
      ></media-gesture>
      <media-gesture class="vds-gesture" event="dblpointerup" action="seek:-10"></media-gesture>
      <media-gesture class="vds-gesture" event="dblpointerup" action="seek:10"></media-gesture>
    </div>
  `;
}