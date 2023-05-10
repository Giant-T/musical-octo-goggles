import { Loader, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import Page from "../components/Page";
import SuperGrid from "../components/SuperGrid";
import Temperature from "../models/temperature";
import RequestsService from "../services/requests.service";

function App() {
  const [temperatures, setTemperatures] = useState<Temperature[] | null>(null);
  const [cantAccess, setCantAccess] = useState(false);

  useEffect(() => {
    new RequestsService()
      .get<[Temperature]>("temperature/all")
      .then((response) => setTemperatures(response.data))
      .catch((_) => setCantAccess(true));
  }, []);

  return (
    <Page>
      <Title>Liste des températures</Title>
      <Stack>
        {temperatures &&
          <SuperGrid
            rows={temperatures}
            colDefs={[
              { title: "Température en celsius", field: "value_celsius", type: "float" },
              { title: "Date", field: "date", type: "date" },
            ]}
          />
        }
        {(!temperatures && !cantAccess) &&
          <Loader />
        }
        {cantAccess &&
          <Text>Impossible d'accèder aux données</Text>
        }
      </Stack>
    </Page>
  );
}

export default App;
