import { Group, Loader, Pagination, Select, Stack, Table, Text } from "@mantine/core";
import { ReactElement, useEffect, useState } from "react";
import Temperature from "../models/temperature";
import RequestsService from "../services/requests.service";
import SuperGrid from "./SuperGrid";

const ListOfTemperatures = (): ReactElement => {
  const [temperatures, setTemperatures] = useState<Temperature[] | null>(null);
  const [cantAccess, setCantAccess] = useState(false);

  useEffect(() => {
    new RequestsService()
      .get<[Temperature]>("temperature/all")
      .then((response) => setTemperatures(response.data))
      .catch((_) => setCantAccess(true));
  }, []);

  return (
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
  );
};

export default ListOfTemperatures;
