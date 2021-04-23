import '../styles/global.scss';

import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContext } from '../contexts/PlayerContext';

import styles from '../styles/app.module.scss';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaing, setIsPlaing] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaing(true);
  }

  function togglePlay(){
    setIsPlaing(!isPlaing);
  }

  function setPlayingState(state: boolean) {
    setIsPlaing(state);
  }

  return(
    <PlayerContext.Provider 
      value={{ episodeList, currentEpisodeIndex, play, isPlaing, togglePlay, setPlayingState }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
