import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { TrackFeatures } from "react-spotify-api";
import Cookies from "js-cookie";

type PlayerProps = {
  token: string;
};

const keys = {
  0: "C",
  1: "C#/Dflat",
  2: "D",
  3: "D#/Eflat",
  4: "E",
  5: "E#/Fflat",
  6: "F",
  7: "F#/Gflat",
  8: "G",
  9: "G#/Aflat",
  10: "A",
  11: "A#/Bflat",
  12: "B",
  13: "B#Cflat",
};

const Player = ({ token }: PlayerProps) => {
  const [songTitle, setSongTitle] = useState(null);
  const [songArtist, setSongArtist] = useState(null);
  const [songId, setSongId] = useState(null);
  const [albumUrl, setAlbumUrl] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/player", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }: any) => {
        setSongTitle(data?.item?.name);
        setSongArtist(data?.item?.artists?.[0]?.name);
        setSongId(data?.item?.id);
        setAlbumUrl(data?.item?.album?.images[0].url);
      })
      .catch((error) => {
        console.log(error);
        Cookies.remove("spotifyAuthToken");
      });
  }, [token]);

  return (
    <>
      <div className="song-info-container">
        {songTitle && songArtist ? (
          <>
            <div>Song: {songTitle}</div>
            <div>Artist: {songArtist}</div>
            {songId && (
              <TrackFeatures id={songId}>
                {(features, loading, error) =>
                  features && (
                    <>
                      <div>BPM: {features.data?.tempo}</div>
                      <div>Key: {keys[features.data?.key]}</div>
                      <div className="album">
                        <img src={albumUrl} height="200px" width="200px" />
                      </div>
                    </>
                  )
                }
              </TrackFeatures>
            )}
          </>
        ) : (
          <div>
            {" "}
            No current song - please make sure you are playing a song currently
            on your Spotify account{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default Player;
