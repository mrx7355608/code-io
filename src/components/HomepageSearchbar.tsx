"use client";

import { Input, useColorModeValue } from "@chakra-ui/react";

export default function HomepageSearchbar() {
    return (
        <Input
            placeholder="Search projects..."
            size="lg"
            mb={8}
            bg={useColorModeValue("white", "gray.700")}
        />
    );
}
