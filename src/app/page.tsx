"use client";

import { Button, Chip, Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        "https://busy-gray-piglet-suit.cyclic.app/patient"
      );
      return response.data;
    },
  });
  return <div></div>;
}
