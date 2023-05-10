import { Loader, Stack, Text, Title } from "@mantine/core";
import { ReactElement, useEffect, useState } from "react";
import Page from "../components/Page";
import SuperGrid from "../components/SuperGrid";
import Intrusion from "../models/intrusion";
import RequestsService from "../services/requests.service";

const Intrusions = (): ReactElement => {
  const [intrusions, setIntrusions] = useState<Intrusion[] | null>(null);
  const [cantAccess, setCantAccess] = useState(false);

  useEffect(() => {
    new RequestsService()
      .get<Intrusion[]>("intrusion/all")
      .then((res) => setIntrusions(res.data))
      .catch((_) => setCantAccess(true));
  }, []);

  return (
    <Page>
      <Title>Liste des intrusions</Title>
      <Stack>
        {intrusions &&
          <SuperGrid
            rows={intrusions}
            colDefs={[
              { title: "Date", field: "date", type: "date" },
            ]}
          />
        }
        {(!intrusions && !cantAccess) &&
          <Loader />
        }
        {cantAccess &&
          <Text>Impossible d'accèder aux données</Text>
        }
      </Stack>
    </Page>
  );
};

export default Intrusions;
