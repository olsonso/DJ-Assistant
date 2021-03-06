import * as React from "react";
import { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";
import Player from "./Player";
import { useHistory } from "react-router-dom";

const App = () => {
  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  let history = useHistory();

  useEffect(() => {
    setToken(Cookies.get("spotifyAuthToken"));
  }, [history]);

  return (
    <div className="app">
      <h1>BPM and Key Finder</h1>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <Player token={token} />
        </SpotifyApiContext.Provider>
      ) : (
        <SpotifyAuth
          redirectUri="https://dj-assistant.netlify.app/"
          clientID="cb40697df5cf4f64bc29e16354c7d5ef"
          scopes={[
            Scopes.userReadPrivate,
            Scopes.userReadPlaybackPosition,
            Scopes.userReadPlaybackState,
            Scopes.streaming,
            Scopes.userReadCurrentlyPlaying,
            Scopes.playlistModifyPublic,
          ]}
        />
      )}
    </div>
  );
};

declare let module: Record<string, unknown>;

export default hot(module)(App);
