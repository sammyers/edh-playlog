import React, { FC, useMemo } from "react";
import { Box, Chart, Heading, Text } from "grommet";
import _ from "lodash";

import { PlaySession, usePlayLogContext } from "../context";

interface WinPercentBarProps {
  deck: string;
  winPct: number;
  totalGames: number;
}

const WinPercentBar: FC<WinPercentBarProps> = ({
  deck,
  winPct,
  totalGames,
}) => (
  <Box flex={false} basis="xsmall" align="center" gap="small">
    <Chart
      type="bar"
      bounds={[
        [0, 2],
        [0, 1],
      ]}
      values={[{ value: [1, winPct] }]}
      color={
        winPct > 0.67 ? "accent-4" : winPct > 0.33 ? "accent-3" : "accent-2"
      }
      round
      size={{ height: "small", width: "xsmall" }}
    />
    <Box align="center">
      <Text style={{ whiteSpace: "nowrap" }}>{deck}</Text>
      <Text weight="bold">{winPct * 100}%</Text>
      <Text>
        {totalGames} game{totalGames === 1 ? "" : "s"}
      </Text>
    </Box>
  </Box>
);

const DeckStats = () => {
  const { log } = usePlayLogContext();

  const [overallWinPct, stats] = useMemo(() => {
    const winsAndLosses = _.reduce<
      PlaySession,
      Record<string, [number, number]>
    >(
      log,
      (all, { games }) =>
        _.reduce(
          games,
          (all, { deck, won }) => {
            const [wins, losses] = all[deck] ?? [0, 0];
            return {
              ...all,
              [deck]: won ? [wins + 1, losses] : [wins, losses + 1],
            };
          },
          all
        ),
      {}
    );

    const winPcts = _.map(winsAndLosses, ([wins, losses], deck) => ({
      deck,
      winPct: wins / (wins + losses),
      totalGames: wins + losses,
    }));

    const [overallWins, overallLosses] = _.reduce(
      winsAndLosses,
      ([totalWins, totalLosses], [wins, losses]) => [
        totalWins + wins,
        totalLosses + losses,
      ],
      [0, 0]
    );

    return [
      overallWins / (overallWins + overallLosses),
      _.orderBy(winPcts, "winPct", "desc"),
    ];
  }, [log]);

  return (
    <Box
      direction="column"
      gap="small"
      pad="small"
      style={{ overflowX: "auto" }}
    >
      <Heading level={4} margin="none">
        Win Percentages (Overall {_.round(overallWinPct * 100)}%)
      </Heading>
      <Box pad="small" direction="row" gap="small">
        {stats.map(({ deck, winPct, totalGames }) => (
          <WinPercentBar
            key={deck}
            deck={deck}
            winPct={_.round(winPct, 2)}
            totalGames={totalGames}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DeckStats;
