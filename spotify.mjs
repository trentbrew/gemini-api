import spotify from "spotify";

function fetchSong(query) {
  spotify.search({ type: "track", query }, (err, data) => {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }
    return data;
  });
}

export { fetchSong };
