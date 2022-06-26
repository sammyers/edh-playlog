import React from "react";
import { format } from "date-fns";
import { Box, Heading, List, Text } from "grommet";

import { usePlayLogContext } from "../context";

const PlayLog = () => {
  const { log } = usePlayLogContext();

  return (
    <Box direction="column" pad="small" gap="medium">
      <Heading level={4} margin="none">
        Play Log
      </Heading>
      <List
        data={log.slice().reverse()}
        primaryKey={({ date }) => (
          <Text weight="bold">
            {format(new Date(date), "MMMM do u (EEEE)")}
          </Text>
        )}
        secondaryKey={({ games }) => (
          <List
            data={games}
            primaryKey="deck"
            secondaryKey={({ won, numPlayers }) => (
              <Text>
                {won ? "Won" : "Lost"} ({numPlayers} player game)
              </Text>
            )}
            border="left"
          />
        )}
        style={{ overflowY: "auto" }}
      />
    </Box>
  );
};

export default PlayLog;
