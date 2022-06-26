import React, { useMemo } from "react";
import { Box, Grid, Grommet, Main } from "grommet";
import _ from "lodash";

import AddDeck from "./components/AddDeck";
import AddLogEntry from "./components/AddLogEntry";
import ColorStats from "./components/ColorStats";
import DeckQueue from "./components/DeckQueue";
import DeckStats from "./components/DeckStats";
import PlayLog from "./components/PlayLog";

import {
  Deck,
  Game,
  playLogContext,
  PlayLogContext,
  PlaySession,
} from "./context";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [decks, setDecks] = useLocalStorage<Record<string, Deck>>("decks", {});
  const [log, setLog] = useLocalStorage<PlaySession[]>("playLog", []);

  const contextValue = useMemo<PlayLogContext>(
    () => ({
      decks,
      log,
      addDeck: (name, colors) =>
        setDecks((decks) => ({ ...decks, [name]: { name, colors } })),
      addLogEntry: (deck, date, numPlayers, won) => {
        setLog((log) => {
          const game: Game = { deck, numPlayers, won };
          const lastSession = _.last(log);
          if (!lastSession) {
            return [{ date, games: [game] }];
          }
          if (_.find(log, (session) => session.date === date)) {
            return log.map((session) => {
              if (session.date === date) {
                return {
                  date,
                  games: [...session.games, game],
                };
              }
              return session;
            });
          }
          const newSession = { date, games: [game] };
          const targetIndex = _.sortedIndexBy(
            log,
            newSession,
            (session) => session.date
          );
          return [
            ..._.take(log, targetIndex),
            newSession,
            ..._.takeRight(log, log.length - targetIndex),
          ];
        });
      },
    }),
    [decks, log, setDecks, setLog]
  );

  return (
    <Grommet
      full
      theme={{
        global: {
          font: {
            family: "Tahoma",
            size: "14px",
          },
        },
      }}
    >
      <playLogContext.Provider value={contextValue}>
        <Main pad="medium">
          <Grid
            fill
            rows={["auto", "flex", "auto"]}
            columns={["1/3", "2/3"]}
            areas={[
              { name: "header", start: [0, 0], end: [1, 0] },
              { name: "queue", start: [0, 1], end: [0, 1] },
              { name: "log", start: [1, 1], end: [1, 1] },
              { name: "stats", start: [0, 2], end: [1, 2] },
            ]}
            gap="small"
          >
            <Box
              gridArea="header"
              background="brand"
              round={{ size: "xsmall" }}
              direction="row"
              gap="small"
            >
              <AddDeck />
              <AddLogEntry />
            </Box>
            <Box
              gridArea="queue"
              background="neutral-4"
              round={{ size: "xsmall" }}
            >
              <DeckQueue />
            </Box>
            <Box gridArea="log" background="light-2" round={{ size: "xsmall" }}>
              <PlayLog />
            </Box>
            <Box
              gridArea="stats"
              background="neutral-1"
              round={{ size: "xsmall" }}
            >
              <DeckStats />
              <ColorStats />
            </Box>
          </Grid>
        </Main>
      </playLogContext.Provider>
    </Grommet>
  );
};

export default App;
