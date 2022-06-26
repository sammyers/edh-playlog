import _ from "lodash";
import React, { useMemo } from "react";
import { usePlayLogContext } from "../context";

const ColorStats = () => {
  const { decks, log } = usePlayLogContext();

  const colorStats = useMemo(() => {
    const decksPerColor = _.reduce(
      decks,
      (all, { colors }) => {
        colors.split("").forEach((colorSymbol) => {
          all[colorSymbol] = (all[colorSymbol] ?? 0) + 1;
        });
        return all;
      },
      {} as Record<string, number>
    );
    const colorRepresentation = _.mapValues(
      decksPerColor,
      (numDecks) => numDecks / _.size(decks)
    );

    const winsAndLosses = _.reduce(
      log,
      (all, { games }) =>
        _.reduce(
          games,
          (all, { deck, won }) => {
            const { colors } = decks[deck];
            colors.split("").forEach((color) => {
              const [wins, losses] = all[color] ?? [0, 0];
              all[color] = won ? [wins + 1, losses] : [wins, losses + 1];
            });
            return all;
          },
          all
        ),
      {} as Record<string, [number, number]>
    );

    return _.map(winsAndLosses, ([wins, losses], color) => ({
      color,
      winPct: wins / (wins + losses),
      deckPct: colorRepresentation[color],
    }));
  }, [decks, log]);

  console.log(colorStats);

  return <div></div>;
};

export default ColorStats;
