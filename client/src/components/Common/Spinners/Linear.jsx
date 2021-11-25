import * as React from "react"
import LinearProgress from "@mui/material/LinearProgress"
import Box from "@mui/material/Box"

const Spinner = () => (
  <Box sx={{ width: "100%", marginTop: "15px" }}>
    <LinearProgress color="inherit" />
  </Box>
)

export default Spinner
