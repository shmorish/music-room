import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "100vh",
					gap: 2,
				}}
			>
				<Typography variant="h4" component="h1">
					Music Room
				</Typography>
				<Button variant="contained" onClick={() => setCount((c) => c + 1)}>
					Count is {count}
				</Button>
			</Box>
		</Container>
	);
}

export default App;
