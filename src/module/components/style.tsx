import { styled, TableRow, TableCell, Pagination, Select } from "@mui/material";

export const StyledCustomTableRowBody = styled(TableRow)(({ theme }) => ({
  "&.MuiTableRow-root:hover": {
    // backgroundColor: theme.palette.primary.light,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.grey[50],
  },
  ".MuiTableCell-root": {
    borderBottom: "none",
    padding: "8px 8px",
    "&:nth-of-type(1)": { padding: "8px 16px" },
  },
  height: "30px",
}));

export const StyledCustomTableRowHead = styled(TableRow)(({ theme }) => ({
  ".MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "16px 8px",
    height: "40px",
    "&:nth-of-type(1)": { padding: "16px 16px " },
    // backgroundColor: theme.palette.white.main,
  },
}));

export const CustomSelect = styled(Select)(({ theme }) => ({
  height: 28,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  width: 110,
  overflow: "hidden",
  borderRadius: 10,
  "& .MuiOutlinedInput-input": {
    padding: "10px 14px",
  },
}));

export const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-rounded": {
    height: 28,
    width: 28,
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
  },
  "& .MuiPaginationItem-page.Mui-disabled": {
    background: theme.palette.action.disabledBackground,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.action.disabled,
  },
  "& .MuiPaginationItem-page.Mui-selected": {
    background: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
}));
