import { Button } from "@mui/material";
import axios from "axios";
import ListOfValues from "../components/ListOfValues";
import Page from "../components/Page";
import RequestsService from "../services/requests.service";

function App() {
  return (
    <Page>
      Vous êtes sur un site de malade!
      <ListOfValues />
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          new RequestsService().get("modifier-led.php?open=1");
        }}
      >
        Ouvrir la led
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          new RequestsService().get("modifier-led.php?open=0");
        }}
      >
        Fermer la led
      </Button>
    </Page>
  );
}

export default App;
