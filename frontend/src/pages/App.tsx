import { Title } from "@mantine/core";
import ListOfTemperatures from "../components/ListOfTemperatures";
import Page from "../components/Page";

function App() {
  return (
    <Page>
      <Title>Liste des températures</Title>
      <ListOfTemperatures />
    </Page>
  );
}

export default App;
