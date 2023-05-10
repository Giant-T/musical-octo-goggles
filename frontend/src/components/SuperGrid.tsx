import { Group, Pagination, Select, Stack, Table, } from "@mantine/core";
import { ReactElement, useState } from "react";

type GridColDefs = {
  title: string,
  field: string,
  type: "date" | "float",
};

type SuperGridProps = {
  rows: any[],
  colDefs: GridColDefs[],
};

const SuperGrid = (props: SuperGridProps): ReactElement => {
  const [activePage, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const calculateRows = () => {
    const rows: ReactElement[] = props.rows
      .slice((activePage - 1) * pageSize, activePage * pageSize)
      .map((element, index) => {
        return (
          <tr key={index}>
            {
              props.colDefs.map((colDef, index) => {
                if (colDef.type === "date") {
                  const date = new Date(element[colDef.field]);
                  return <td key={index}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</td>;
                }
                return <td key={index}>{element[colDef.field]}</td>;
              })
            }
          </tr>
        );
      });

    return rows;
  }

  return (
    <Stack>
      <Table striped withBorder withColumnBorders>
        <thead>
          <tr>
            {
              props.colDefs.map((colDef, index) => {
                return (<th key={index}>{colDef.title}</th>);
              })
            }
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
          total={Math.ceil(props.rows.length / pageSize)}
          onChange={setPage}
        />
      </Group>
    </Stack>
  );
};

export default SuperGrid;
