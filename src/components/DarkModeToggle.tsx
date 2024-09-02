import { Switch, useColorMode } from "@chakra-ui/react";
import React from "react";

export default function DarkModeToggle() {
    const { toggleColorMode } = useColorMode();
    return <Switch onClick={toggleColorMode}>Dark mode</Switch>;
}
