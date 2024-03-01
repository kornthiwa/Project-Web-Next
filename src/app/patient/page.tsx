"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Box, Button, Chip, Typography } from "@mui/material"; // import Button
import DialogPatient from "./patient/DailogPatient";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function Home() {
  const [open, setOpen] = useState(false);

  const {
    data: datatesxt,
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        "https://busy-gray-piglet-suit.cyclic.app/patient"
      );
      return response.data;
    },
  });

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const onClickRowFunction = (data: any) => {
    console.log(data);
  };
  const renderDialog = () => {
    return (
      <DialogPatient
        open={open}
        onClose={() => {
          handleClickOpen();
        }}
      />
    );
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Active",
      width: 100,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return <>{row.name}</>;
      },
    },
    {
      field: "name",
      headerName: "Active",
      width: 100,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return <Button onClick={() => onClickRowFunction(row)}>กด</Button>;
      },
    },
  ];

  return (
    <div>
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          เพิ่มผู้ป่วยเข้ารับการรักษา
        </Button>
        <DataGrid
          rows={(!isLoading && datatesxt) || []}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          // pageSizeOptions={[10, 20, 50]}
          checkboxSelection={false}
          rowSelection
          onPaginationModelChange={(e) => console.log("Page", e)}
          disableColumnMenu
        />
        {renderDialog()}
      </Box>
    </div>
  );
}
