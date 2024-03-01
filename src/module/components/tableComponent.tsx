import React, { useCallback, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Alert, Box, Button, Chip, Switch, styled } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PersonIcon from "@mui/icons-material/Person";
import MenuListComponent from "./menulistComponents";

// const MyStyledDataGrid = styled(DataGrid)`
//   .MuiDataGrid-columnHeaders,
//   .MuiDataGrid-columnHeaderTitle {
//     background-color: #b3d9ff; /* สีฟ้าอ่อน */
//   }
//   .MuiDataGrid-footerContainer {
//     background-color: #b3d9ff; /* สีฟ้าอ่อน */
//   }
//   .MuiDataGrid-main {
//     background-color: #99ccff; /* สีฟ้าเข้ม */
//   }
// `;

const columns: GridColDef[] = [
  {
    field: "active",
    headerName: "Active",
    width: 100,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;
      return (
        <>
          {row.active ? (
            <PersonIcon color="primary" />
          ) : (
            <PersonIcon color="disabled" />
          )}{" "}
        </>
      );
    },
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
    renderCell: (params) => {
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
    renderCell: (params) => {
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
    renderCell: (params) => {
      const { row } = params;

      return (
        <>
          {/* <MenuListComponent
            createdAt={row.createdAt}
            updatedAt={row.updatedAt}
            _id={row._id}
            active={row.active}
            todo={row.todo}
            priority={row.priority}
            type={row.type}
            image={row.image}
            status={row.status}
            deletestatus={row.deletestatus}
          /> */}
        </>
      );
    },
  },
];
interface DataContext {
  _id?: string;
  address?: string;
  age?: number;
  emergencyContact?: string;
  type?: string;
  name?: string;
  phoneNumber?: string;
  symptoms?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}
interface PropsDataContext {
  data: DataContext[] | undefined;
}

export default function TableComponents(props: PropsDataContext) {
  return (
    <>
      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={props.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          checkboxSelection={false}
          rowSelection
          onPaginationModelChange={(e) => console.log("Page", e)}
        />
      </Box>
    </>
  );
}
