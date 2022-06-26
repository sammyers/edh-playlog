import React from "react";
import { Image } from "grommet";

const ColorSymbol = ({ color }: { color: string }) => (
  <Image src={`color-icons/${color}.png`} width={16} height={16} />
);

export default ColorSymbol;
