import { MediaPlayer, MediaProvider } from '@vidstack/react';

function Player() {
  return (
    <MediaPlayer>
      <MediaProvider />
      <div className="media-controls-container" role="group" aria-label="Media Controls">
        <div className="media-controls-group">Controls Top</div>
        <div className="media-controls-group">Controls Middle</div>
        <div className="media-controls-group">Controls Bottom</div>
      </div>
    </MediaPlayer>
  );
}