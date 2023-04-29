import { Loader, Pagination, Stack, Table } from "@mantine/core";
import { ReactElement, useEffect, useState } from "react";
import Temperature from "../models/temperature";
import RequestsService from "../services/requests.service";

const ListOfTemperatures = (): ReactElement => {
  const [temperatures, setTemperatures] = useState<Temperature[] | null>(null);
  const [activePage, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    new RequestsService()
      .get<[Temperature]>("all")
      .then((response) => {
        setTemperatures(response.data);
      })
      .catch((_) => alert("Impossible d'obtenir les données."));
  }, []);

  const calculateRows = () => {
    if (!temperatures) return;

    const rows: ReactElement[] = temperatures
      .slice((activePage - 1) * pageSize, activePage * pageSize)
      .map((element) => {
        const date = new Date(element.date);
        return (
          <tr key={element.id}>
            <td>{element.value_celsius}℃</td>
            <td>{date.toLocaleDateString()} {date.toLocaleTimeString()}</td>
          </tr>
        );
      });

    return rows;
  }

  return (
    <Stack>
      {temperatures &&
        <>
          <Table striped withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Température en celsius</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{calculateRows()}</tbody>
          </Table>
          <Pagination
            value={activePage}
            total={Math.floor(temperatures!.length / pageSize)}
            onChange={setPage}
          />
        </>
      }
      {!temperatures &&
        <Loader />
      }
    </Stack>
  );
};

export default ListOfTemperatures;