import { Button, Group, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconInfoCircleFilled } from "@tabler/icons-react";
import { ReactElement } from "react"
import Page from "../components/Page";

const Activation = (): ReactElement => {
  const showError = () => {
    notifications.show({
      title: "Erreur de connection",
      message: "Impossible de rejoindre le serveur",
      color: "red",
      icon: (<IconInfoCircleFilled />),
    });
    notifications.show({
      title: "Succès",
      message: "Action effectuée avec succès",
      color: "green",
      icon: (<IconCheck />),
    });
  };

  return (
    <Page>
      <Title>Activation du capteur</Title>
      <Group mt="1em">
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime" }}
          onClick={showError}
        >
          Activer le capteur
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "red", to: "orange" }}
          onClick={showError}>
          Désactiver le capteur
        </Button>
      </Group>
    </Page>
  );
}

export default Activation;
