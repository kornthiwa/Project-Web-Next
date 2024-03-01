"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Table } from "@/module/components/Table";
import { Box, Button, Chip, Typography } from "@mui/material"; // import Button
import DialogPatient from "./patient/DailogPatient";
import { Pagination } from "@/module/components/Pagination";

const TableRowCancel = ({ onClickRowFunction }: any) => {
  return [
    {
      render: (data: any) => {
        return (
          <>
            <Typography>{data.active}</Typography>
          </>
        );
      },
      title: (
        <>
          <Typography>Active</Typography>
        </>
      ),
      width: 100,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
    },
    {
      render: (data: any) => {
        return (
          <>
            <Typography>{data._id}</Typography>
          </>
        );
      },
      title: (
        <>
          <Typography>ID</Typography>
        </>
      ),
      disableColumnMenu: true,
      align: "left",
      headerAlign: "center",
    },
    {
      render: (data: any) => {
        return (
          <>
            <Typography>{data.name}</Typography>
          </>
        );
      },
      title: (
        <>
          <Typography>ชื่อ</Typography>
        </>
      ),
      width: 150,
      disableColumnMenu: true,
      align: "left",
      headerAlign: "center",
    },
    {
      render: (data: any) => {
        return (
          <>
            <Typography>{data.age} ปี</Typography>
          </>
        );
      },
      title: (
        <>
          <Typography>อายุ</Typography>
        </>
      ),
      width: 250,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
    },
    {
      render: (data: any) => {
        return (
          <>
            <Typography>{data.symptoms}</Typography>
          </>
        );
      },
      title: (
        <>
          <Typography>อาการ</Typography>
        </>
      ),
      width: 250,
      disableColumnMenu: true,
      align: "left",
      headerAlign: "center",
    },
    {
      render: (data: any) => {
        return (
          <>
            <Typography>{data.phoneNumber}</Typography>
          </>
        );
      },
      title: (
        <>
          <Typography>เบอร์โทร</Typography>
        </>
      ),
      type: "number",
      width: 100,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
    },
    {
      render: (data: any) => {
        let chipLabel = "";
        let chipColor = "default";
        switch (data.status) {
          case 10:
            chipLabel = "ยังไม่กรอกข้อมูล";
            chipColor = "info";
            break;
          case 20:
            chipLabel = "กำลังกรอกข้อมูล";
            chipColor = "warning";
            break;
          case 30:
            chipLabel = "กรอกข้อมูลสำเร็จ";
            chipColor = "success";
            break;
          default:
            chipLabel = "";
        }
        return <>das</>;
      },
      title: (
        <>
          <Typography>สถานะ</Typography>
        </>
      ),
      width: 200,
      align: "center",
      sortable: false,
      headerAlign: "center",
      disableColumnMenu: true,
    },
    {
      render: (data: any) => {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => onClickRowFunction(data)}
            >
              ส่งตัว
            </Button>
          </>
        );
      },
      title: "",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
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
        <Table rows={TableRowCancel(onClickRowFunction)} data={data} />

        {renderDialog()}
      </Box>

      <Box sx={{ height: "100%", padding: "21px 24px" }}>
        <Pagination
          data-testid={"action-permission-pagination"}
          onChangePage={(_, pageNumber) => null}
          onChangePageSize={(size) => null}
          total={0}
          pageIndex={0 - 1}
          pageSize={10}
          totalPages={1}
        />
      </Box>
    </div>
  );
}
