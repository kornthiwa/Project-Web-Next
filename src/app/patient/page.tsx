"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableComponents from "@/module/components/tableComponent";
import { Box, Button, Chip } from "@mui/material"; // import Button
import DialogPatient from "./patient/DailogPatient";
import { DataGrid } from "@mui/x-data-grid";
import LongMenu from "./patient/MenuPatientTransfer";

const TableRowCancel = ({ onClickRowFunction }: any) => {
  return [
    {
      field: "active",
      headerName: "Active",
      width: 100,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "_id",
      headerName: "ID",
      disableColumnMenu: true,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "ชื่อ",
      width: 150,
      disableColumnMenu: true,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "age",
      headerName: "อายุ",
      width: 250,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return <>{row.age + " ปี"}</>;
      },
    },
    {
      field: "symptoms",
      headerName: "อาการ",
      width: 250,
      disableColumnMenu: true,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "phoneNumber",
      headerName: "เบอร์โทร",
      type: "number",
      width: 100,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 200,
      align: "center",
      sortable: false,
      headerAlign: "center",
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <>
            {row.status === 10 && (
              <Chip
                color="info"
                disabled={false}
                size="medium"
                variant="outlined"
                label="ยังไม่กรอกข้อมูล"
              />
            )}
            {row.status === 20 && (
              <Chip
                color="warning"
                disabled={false}
                size="medium"
                variant="outlined"
                label="กำลังกรอกข้อมูล"
              />
            )}
            {row.status === 30 && (
              <Chip
                color="success"
                disabled={false}
                size="medium"
                variant="outlined"
                label="กรอกข้อมูลสำเร็จ"
              />
            )}
          </>
        );
      },
    },
    {
      field: " ",
      headerName: " ",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <>
            <Button variant="contained" onClick={() => onClickRowFunction(row)}>
              ส่งตัว
            </Button>
          </>
        );
      },
    },
  ];
};

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const { data } = useQuery<any>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get(
        "https://busy-gray-piglet-suit.cyclic.app/patient"
      );
      return response.data;
    },
  });
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

  return (
    <div>
      <Box>
        <Button variant="outlined" onClick={handleClickOpen}>
          เพิ่มผู้ป่วยเข้ารับการรักษา
        </Button>
        <DataGrid
          sx={{ overflowX: "scroll", maxHeight: "400px" }}
          rows={data || []}
          columns={TableRowCancel(onClickRowFunction)}
          getRowId={(row: any) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection={false}
          rowSelection
          scrollbarSize={100}
          onPaginationModelChange={(e) => {
            if (e.pageSize && e.pageSize > 10) {
              console.log("Have Scroll");
              // กระทำเพิ่มเติมเมื่อมีการเลื่อนหน้าของตารางที่มี Scroll
            } else {
              console.log("No Scroll");
              // กระทำเพิ่มเติมเมื่อมีการเลื่อนหน้าของตารางที่ไม่มี Scroll
            }
          }}
        />

        {renderDialog()}
      </Box>
    </div>
  );
}
