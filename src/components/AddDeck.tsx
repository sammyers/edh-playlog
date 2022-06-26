import React, { useCallback, useState } from "react";
import { Box, Button, Heading, TextInput } from "grommet";

import { usePlayLogContext } from "../context";

const AddDeck = () => {
  const { addDeck } = usePlayLogContext();

  const [name, setName] = useState("");
  const [colors, setColors] = useState("");

  const handleAdd = useCallback(() => {
    addDeck(name, colors);
    setName("");
    setColors("");
  }, [addDeck, name, colors, setName, setColors]);

  return (
    <Box direction="column" pad="small" gap="medium" flex="grow">
      <Heading level={4} margin="none">
        Add New Deck
      </Heading>
      <Box direction="row" gap="small">
        <Box direction="column" gap="small" flex="grow">
          <TextInput
            placeholder="Deck Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            placeholder="Color Identity"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
        </Box>
        <Button
          alignSelf="center"
          size="small"
          disabled={!name || !colors}
          onClick={handleAdd}
          plain={false}
          style={{ whiteSpace: "nowrap" }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddDeck;
