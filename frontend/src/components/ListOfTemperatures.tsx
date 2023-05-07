import { Group, Loader, Pagination, Select, Stack, Table, Text } from "@mantine/core";
import { ReactElement, useEffect, useState } from "react";
import Temperature from "../models/temperature";
import RequestsService from "../services/requests.service";

const ListOfTemperatures = (): ReactElement => {
  const [temperatures, setTemperatures] = useState<Temperature[] | null>(null);
  const [activePage, setPage] = useState(1);
  const [cantAccess, setCantAccess] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    new RequestsService()
      .get<[Temperature]>("temperature/all")
      .then((response) => {
        setTemperatures(response.data);
      })
      .catch((_) => {
        setCantAccess(true);
      });
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
          <Group>
            <Select
              value={pageSize.toString()}
              width={10}
              defaultValue="5"
              data={["5", "10", "15", "20"]}
              onChange={(value) => setPageSize(Number(value ?? 5))}
            />
            <Pagination
              value={activePage}
              total={Math.ceil(temperatures!.length / pageSize)}
              onChange={setPage}
            />
          </Group>
        </>
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
