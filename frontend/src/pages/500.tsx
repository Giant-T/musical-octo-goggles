import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const Page500 = (): ReactElement => {
    return (
        <Page>
            <h2>Un erreur est survenue</h2>
            <Link to="/">Retour à l'accueil</Link>
        </Page>
    );
}

export default Page500;