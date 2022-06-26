import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  DateInput,
  Heading,
  RadioButtonGroup,
  Select,
} from "grommet";
import _ from "lodash";

import { usePlayLogContext } from "../context";

const AddLogEntry = () => {
  const { decks, addLogEntry } = usePlayLogContext();

  const [deckName, setDeckName] = useState<string>();
  const [date, setDate] = useState<string>();
  const [numPlayers, setNumPlayers] = useState(4);
  const [wonGame, setWonGame] = useState(false);

  const handleAdd = useCallback(() => {
    addLogEntry(deckName!, date!, numPlayers, wonGame);
    setDeckName(undefined);
    setNumPlayers(4);
    setWonGame(false);
  }, [addLogEntry, deckName, date, numPlayers, wonGame]);

  return (
    <Box direction="column" pad="small" gap="medium" flex="grow">
      <Heading level={4} margin="none">
        Add Log Entry
      </Heading>
      <Box direction="row" gap="small">
        <Box direction="column" gap="small" flex="grow">
          <Select
            placeholder="Deck"
            options={_.keys(decks)}
            onChange={(e) => setDeckName(e.target.value)}
          />
          <DateInput
            format="mm/dd/yy"
            onChange={(e) => setDate(e.value as string)}
          />
        </Box>
        <Box direction="column" gap="small" basis="small" flex={{ grow: 0 }}>
          <Select
            options={[3, 4, 5, 6].map((val) => ({
              value: String(val),
              label: `${val} players`,
            }))}
            value={String(numPlayers)}
            valueKey={{ key: "value", reduce: true }}
            labelKey="label"
            onChange={({ option }) => setNumPlayers(Number(option.value))}
          />
          <RadioButtonGroup
            name="Won Game"
            direction="row"
            gap="small"
            options={[
              { label: "Lost", value: false },
              { label: "Won", value: true },
            ]}
            value={wonGame}
            onChange={(e) => setWonGame(e.target.value === "true")}
            margin={{ vertical: "xsmall" }}
          />
        </Box>
        <Button
          alignSelf="center"
          size="small"
          disabled={!deckName || !date}
          plain={false}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddLogEntry;
