import { Button, Group, Title } from "@mantine/core";
import { ReactElement } from "react"
import Page from "../components/Page";

const Activation = (): ReactElement => {
  return (
    <Page>
      <Title>Activation du capteur</Title>
      <Group mt="1em">
        <Button variant="gradient" gradient={{ from: "teal", to: "lime" }} onClick={() => { console.log("en développement") }}>
          Activer le capteur
        </Button>
        <Button variant="gradient" gradient={{ from: "red", to: "orange" }} onClick={() => { console.log("en développement") }}>
          Désactiver le capteur
        </Button>
      </Group>
    </Page>
  );
}

export default Activation;
