import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const Page404 = (): ReactElement => {
    return (
        <Page>
            <h2>La page que vous cherchez n'existe pas</h2>
            <Link to="/">Retour à l'accueil</Link>
        </Page>
    )
}

export default Page404;