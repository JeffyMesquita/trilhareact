import { createContext, ReactNode, useState, useContext } from 'react';

type Episode = {
   title: string;
   members: string;
   thumbnail: string;
   duration: number;
   url: string;
};

type PlayerContextData = {
   episodeList: Episode[];
   currentEpisodeIndex: number;
   isPlaing: boolean;
   isLooping: boolean;
   isShuffling: boolean;
   playList: (list: Episode[], index: number) => void;
   play: (episode: Episode) => void;
   setPlayingState: (state: boolean) => void;
   togglePlay: () => void;
   toggleLoop: () => void;
   toggleShuffle: () => void;
   playNext: () => void;
   playPrevious: () => void;
   clearPlayerState: () => void;
   hasPrevious: boolean;
   hasNext: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
   children: ReactNode;
}

export function PlayerContextProvider({ children } : PlayerContextProviderProps){
   const [episodeList, setEpisodeList] = useState([]);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
   const [isPlaing, setIsPlaing] = useState(false);
   const [isLooping, setIsLooping] = useState(false);
   const [isShuffling, setIsShuffling] = useState(false);

   function play(episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaing(true);
   }

   function playList(list: Episode[], index: number){
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaing(true);
   }

   function togglePlay(){
      setIsPlaing(!isPlaing);
   }   

   function toggleLoop(){
      setIsLooping(!isLooping);
   }   

   function toggleShuffle(){
      setIsShuffling(!isShuffling);
   }   

   function setPlayingState(state: boolean) {
      setIsPlaing(state);
   }

   function clearPlayerState(){
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
   }

   const hasPrevious= currentEpisodeIndex > 0;
   const hasNext= isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

   function playNext(){
      if (isShuffling) {
         const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
         setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      } else if (hasNext){
         setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }            
   }

   function playPrevious(){
      if (isShuffling) {
         const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
         setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      } else if(hasPrevious) {
         setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }
   }

   return(
      <PlayerContext.Provider 
         value={{ 
            episodeList, 
            currentEpisodeIndex, 
            play, 
            playList,
            playNext,
            playPrevious,
            isPlaing, 
            isLooping,
            isShuffling,
            togglePlay, 
            toggleLoop,
            toggleShuffle,
            setPlayingState,
            hasNext,
            hasPrevious,
            clearPlayerState
         }}
      >
         {children}
      </PlayerContext.Provider>
   )
}

export const usePlayer = () => {
   return useContext(PlayerContext);
}