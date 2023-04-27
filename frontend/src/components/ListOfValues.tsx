import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid/models";
import { ReactElement, useEffect, useState } from "react";
import Temperature from "../models/temperature";
import RequestsService from "../services/requests.service";

const ListOfValues = (): ReactElement => {
  const [values, setValues] = useState(Array<Temperature>());

  useEffect(() => {
    new RequestsService()
      .get<[Temperature]>("all")
      .then((response) => {
        setValues(response.data);
      })
      .catch((_) => alert("Impossible d'obtenir les données."));
  }, []);

  const columns: GridColDef[] = [
    { field: "value_celsius", headerName: "Température", flex: 1, valueFormatter: (row) => `${row.value} ℃` },
    {
      field: "date", headerName: "Date", flex: 2,
      valueFormatter: (row: GridValueFormatterParams<Date>) => {
        const date = new Date(row.value);

        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }
    },
  ];

  return (
    <DataGrid
      rows={values}
      columns={columns}
      autoHeight
      pageSize={10}
      rowsPerPageOptions={[5, 10, 15, 25]}
    />
  );
};

export default ListOfValues;
