"use client";

import { Box, MenuItem, Typography } from "@mui/material";
import { CustomSelect, CustomPagination } from "./style";

export interface ITablePaginationActions {
  onChangePage: (event: any, page: number) => void;
  onChangePageSize: (event: any) => void;
  total: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export const Pagination = ({
  pageIndex,
  pageSize,
  total,
  totalPages,
  onChangePage,
  onChangePageSize,
}: ITablePaginationActions) => {
  // const classes = useStyles();

  return (
    <Box
      display="flex"
      width={"100%"}
      alignItems="center"
      justifyContent="flex-end"
      flexDirection={"row"}
    >
      <>
        <Box>
          <Typography variant="body2" style={{ marginRight: 24 }}>
            {`${pageIndex * pageSize + 1 - pageSize} - ${pageSize * pageIndex}`}{" "}
            จาก {totalPages ? total : "0"}
          </Typography>
        </Box>
        <Box flexDirection={"row"} display={"flex"}>
          <CustomPagination
            data-testid={"pagination-onChangePage"}
            onChange={onChangePage}
            page={pageIndex}
            count={totalPages}
            variant="outlined"
            shape="rounded"
          />
        </Box>
        <Box>
          <CustomSelect
            data-testid={"pagination-onChangePageSize"}
            value={pageSize ? pageSize : 10}
            variant="outlined"
            onChange={(event: any) => {
              onChangePageSize(event.target.value);
              onChangePage(undefined, 1);
            }}
          >
            <MenuItem value={10}>{"10/หน้า"}</MenuItem>
            <MenuItem value={20}>{"20/หน้า"}</MenuItem>
            <MenuItem value={50}>{"50/หน้า"}</MenuItem>
            <MenuItem value={100}>{"100/หน้า"}</MenuItem>
          </CustomSelect>
        </Box>
      </>
    </Box>
  );
};
