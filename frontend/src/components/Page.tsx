import { AppBar, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { PropsWithChildren, ReactElement } from "react";

const Page = (props: PropsWithChildren): ReactElement => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography>Site de domotique</Typography>
                </Toolbar>
            </AppBar>
            <Box m={2}>
                {props.children}
            </Box>
        </>
    );
}

export default Page;