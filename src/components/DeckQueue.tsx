import React, { useMemo } from "react";
import { Box, Heading, List } from "grommet";
import _ from "lodash";

import { Deck, usePlayLogContext } from "../context";
import ColorSymbol from "./ColorSymbol";

const DeckQueue = () => {
  const { decks, log } = usePlayLogContext();

  const deckQueue = useMemo(() => {
    const allDecks = new Set(_.keys(decks));
    const queue: Deck[] = [];
    _.forEachRight(log, ({ games }) => {
      _.forEachRight(games, ({ deck }) => {
        if (allDecks.has(deck)) {
          queue.push(decks[deck]);
          allDecks.delete(deck);
        }
      });
      if (allDecks.size === 0) {
        return false;
      }
    });
    allDecks.forEach((deck) => {
      queue.push(decks[deck]);
    });
    return _.reverse(queue);
  }, [decks, log]);

  return (
    <Box direction="column" pad="small" gap="medium">
      <Heading level={4} margin="none">
        Deck Queue
      </Heading>
      <List
        data={deckQueue}
        primaryKey="name"
        secondaryKey={({ colors }) => (
          <Box direction="row">
            {colors.split("").map((color) => (
              <ColorSymbol color={color} />
            ))}
          </Box>
        )}
        style={{ overflowY: "auto" }}
      />
    </Box>
  );
};

export default DeckQueue;
