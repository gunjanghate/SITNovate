"use client";

import React from "react";
import { Typography, Box, Divider } from "@mui/material";

const FormattedResponse = ({ result }) => {
  if (!result) return null;

  const formatText = (text) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("**")) {
        // Headings with bold and a divider below
        return (
          <Box key={index} sx={{ marginTop: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1e88e5" }}>
              {line.replace(/\*\*/g, "")}
            </Typography>
            <Divider sx={{ marginY: 1, borderColor: "#1e88e5" }} />
          </Box>
        );
      } else if (line.startsWith("*")) {
        // Bullet points with subtle indent
        return (
          <Typography key={index} variant="body1" sx={{ paddingLeft: 2, color: "#37474f" }}>
            • {line.replace(/\*/g, "").trim()}
          </Typography>
        );
      } else {
        // Regular text
        return (
          <Typography key={index} variant="body2" sx={{ marginTop: 1, color: "#616161" }}>
            {line}
          </Typography>
        );
      }
    });
  };

  return (
    <Box
      sx={{
        marginTop: 3,
        padding: 3,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
      }}
    >
      {formatText(result)}
    </Box>
  );
};

export default FormattedResponse;
