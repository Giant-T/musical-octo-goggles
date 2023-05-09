import { Button, Group, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconInfoCircleFilled } from "@tabler/icons-react";
import { ReactElement } from "react"
import Page from "../components/Page";
import RequestsService from "../services/requests.service";

const Activation = (): ReactElement => {
  const showError = () => {
    notifications.show({
      title: "Erreur de connection",
      message: "Impossible de rejoindre le serveur",
      color: "red",
      icon: (<IconInfoCircleFilled />),
    });
  };

  const showSuccess = () => {
    notifications.show({
      title: "Opération réussie",
      message: "L'action a été réalisée avec succès.",
      color: "green",
      icon: (<IconCheck />),
    });
  };

  const sendActivation = (activate: "demarrer" | "stop") => {
    new RequestsService().get(activate)
      .then(showSuccess)
      .catch(showError);
  }

  return (
    <Page>
      <Title>Activation du capteur</Title>
      <Group mt="1em">
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime" }}
          onClick={() => sendActivation("demarrer")}
        >
          Activer le capteur
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "red", to: "orange" }}
          onClick={() => sendActivation("stop")}>
          Désactiver le capteur
        </Button>
      </Group>
    </Page>
  );
}

export default Activation;
