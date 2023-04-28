import { Title } from "@mantine/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const Page500 = (): ReactElement => {
  return (
    <Page>
      <Title>Un erreur est survenue</Title>
      <Link to="/">Retour à l'accueil</Link>
    </Page>
  );
}

export default Page500;
