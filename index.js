/**
 * Laurie 239661
 * Laurie 239661
 */
import axios from "axios";

const players = {
  nick: { id: "239664", elements: [], totalPoints: 0 },
  ben: { id: "239705", elements: [], totalPoints: 0 },
  james: { id: "239576", elements: [], totalPoints: 0 },
  laurie: { id: "239661", elements: [], totalPoints: 0 },
  sean: { id: "239709", elements: [], totalPoints: 0 },
};

async function getLeaguePlayerData() {
  await Promise.all(
    Object.entries(players).map(async ([playerName, playerObject]) => {
      const url = `https://draft.premierleague.com/api/entry/${playerObject.id}/event/1`;
      try {
        const { data } = await axios.get(url);
        const { picks } = data;
        // const firstEleven = Object.fromEntries(picks);
        let firstEleven = [];
        for (let i = 0; i < 11; i++) {
          firstEleven[i] = picks[i];
        }
        playerObject.elements = firstEleven;
      } catch (error) {
        console.error(error);
      }
    })
  );
}

const playerDataUrl = "https://draft.premierleague.com/api/event/1/live";
let playerData = [];
async function getPlayerData() {
  try {
    const { data } = await axios.get(playerDataUrl);
    const { elements } = data;
    playerData = elements;
  } catch (error) {
    console.error(error);
  }
}

await getPlayerData();
// console.log("playerData", playerData);

await getLeaguePlayerData();
// console.log("players", players);

Object.entries(players).map(([playerName, playerObject]) => {
  let teamPoints = 0;
  playerObject.elements.forEach(({ element }) => {
    const player = playerData[element];
    // console.log(`element ${element}: ${player.stats.total_points}`);
    teamPoints += player.stats.total_points;
  });
  console.log(`${playerName} Total points: ${teamPoints}`);
});
