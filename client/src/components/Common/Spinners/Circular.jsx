import * as React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const Circular = () => (
  <Box
    sx={{
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translateX(-50%)",
    }}
  >
    <CircularProgress />
  </Box>
)

export default Circular
