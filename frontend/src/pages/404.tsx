import { Title } from "@mantine/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const Page404 = (): ReactElement => {
  return (
    <Page>
      <Title>La page que vous cherchez n'existe pas</Title>
      <Link to="/">Retour à l'accueil</Link>
    </Page>
  )
}

export default Page404;
