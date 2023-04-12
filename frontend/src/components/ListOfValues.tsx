import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { ReactElement, useEffect, useState } from "react";
import Value from "../models/value";
import RequestsService from "../services/requests.service";

const ListOfValues = (): ReactElement => {
  const [values, setValues] = useState(Array<Value>());

  useEffect(() => {
    new RequestsService()
      .get<[Value]>("liste-valeurs.php")
      .then((response) => {
        setValues(response.data);
      })
      .catch((_) => alert("Impossible d'obtenir les données."));
  }, []);

  const columns: GridColDef[] = [
    { field: "value", headerName: "Valeur", width: 75 },
    { field: "description", headerName: "Description", minWidth: 200, flex: 1 },
    { field: "ip", headerName: "Adresse IP", width: 200 },
    { field: "time", headerName: "Temps de capture", width: 200 },
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
