"use client";

import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Box,
  Collapse,
  IconButton,
  TableSortLabel,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { ExpandLess, ExpandMore, MoreVert } from "@mui/icons-material";
import MuiTable from "@mui/material/Table";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { StyledCustomTableRowBody, StyledCustomTableRowHead } from "./style";
import { Typography } from "./Typography";

export function Table(props: any) {
  const {
    rows,
    data,
    caption,
    renderField,
    disabled,
    onRowClick,
    reasonDisabled,
    outerBorder,
    allBorder,
    normalBorder,
    outerBorderOnly,
    loading,
    onSortChange,
    defaultSort,
    isExpandData,
    expandDataWidth,
    RenderExpandData,
    customTextNoData,
    rightButton,
    renderTableHead = true,
    customHeight,
    sx,
    refetchHealthTimelineItemList,
    patientData,
    isExpandDefault,
  } = props;
  const theme = useTheme();
  const [order, setOrder] = useState<any>("asc");
  const [orderBy, setOrderBy] = useState<any>(defaultSort || "");
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [expandAll, setExpandAll] = useState(false);
  const [expandHistory, setExpandHistory] = useState(false);

  useEffect(() => {
    if (isExpandDefault) {
      setOpenRows([0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const sortType: any = {
      asc: `${property}`,
      desc: `-${property}`,
    };
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    if (onSortChange) {
      onSortChange(sortType[isAsc ? "desc" : "asc"]);
    }
  };

  const handleRowClick = (rowIndex: number) => {
    const isOpen = openRows.includes(rowIndex);
    const newOpenRows = isOpen
      ? openRows.filter((index) => index !== rowIndex)
      : [...openRows, rowIndex];
    setOpenRows(newOpenRows);
  };

  return (
    <>
      {data && data?.rows ? (
        <Box
          sx={{
            width: "fit-content",
            border: "1px solid #cccccc",
            borderRadius: "0.3rem",
            padding: "1rem 1rem 0.5rem 1rem",
          }}
        >
          {data?.rows.flatMap((_Item: any) => {
            return <CircularProgress />;
          })}
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 0,
              height: customHeight ? customHeight : "auto",
              border: outerBorder ? `1px solid ${theme.palette.grey[50]}` : "",
              borderRadius: outerBorder ? "10px" : "",
              ...(allBorder && {
                border: "1px solid rgba(224, 224, 224, 1)",
                borderTop: "none",
                "& .MuiTableCell-root": {
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderBottom: "none",
                  borderLeft: "none",
                  "&:last-child": {
                    borderRight: "none",
                  },
                },
              }),
              ...(normalBorder && {
                borderRadius: "10px",
                border: "1px solid rgba(224, 224, 224, 1)",
                "& .MuiTableCell-root": {
                  borderRight: "1px solid rgba(224, 224, 224, 1)",
                },
                "&:last-child": {
                  borderRight: "none",
                },
              }),
              ...(outerBorderOnly && {
                border: "1px solid rgba(224, 224, 224, 1)",
                "& .MuiTableCell-root": {
                  borderLeft: "none",
                  "&:last-child": {
                    borderRight: "none",
                  },
                },
              }),
              ...sx,
            }}
          >
            <MuiTable
              sx={{ minWidth: 500 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <StyledCustomTableRowHead>
                  {isExpandData && (
                    <TableCell width={expandDataWidth}>
                      <Typography></Typography>
                    </TableCell>
                  )}
                  {rows.map((data: any, index: number) => (
                    <TableCell
                      align={
                        (data.align as
                          | "left"
                          | "right"
                          | "inherit"
                          | "center"
                          | "justify"
                          | undefined) || "left"
                      }
                      key={index}
                      style={{ width: data.width }}
                      sx={renderTableHead ? {} : { visibility: "hidden" }}
                    >
                      {data.isCanSort ? (
                        <TableSortLabel
                          active={orderBy === data.sortId}
                          direction={orderBy === data.sortId ? order : "asc"}
                          IconComponent={ArrowDropDownRoundedIcon}
                          onClick={(e) => handleRequestSort(e, data.sortId)}
                        >
                          <Typography
                            altColor={
                              disabled ? "textBlackDisable" : "textBlackMain"
                            }
                            variant={disabled ? "body2" : "button"}
                          >
                            {data.title}
                          </Typography>
                        </TableSortLabel>
                      ) : (
                        <Typography
                          altColor={
                            disabled ? "textBlackDisable" : "textBlackMain"
                          }
                          variant={disabled ? "body2" : "button"}
                        >
                          {data.title}
                        </Typography>
                      )}
                    </TableCell>
                  ))}
                </StyledCustomTableRowHead>
              </TableHead>

              {loading ? (
                <TableBody
                  sx={
                    renderTableHead
                      ? {}
                      : { position: "relative", bottom: "2.4rem" }
                  }
                >
                  <StyledCustomTableRowBody>
                    <TableCell colSpan={rows.length}>
                      {"<LoadingContent />"}
                    </TableCell>
                  </StyledCustomTableRowBody>
                </TableBody>
              ) : (
                <TableBody
                  sx={
                    renderTableHead
                      ? {}
                      : { position: "relative", bottom: "2.4rem" }
                  }
                >
                  {data &&
                    data.map((dataInformation: any, index: number) => (
                      <React.Fragment key={index}>
                        <StyledCustomTableRowBody
                          sx={{
                            ".MuiTableCell-root": {
                              borderBottom: outerBorder
                                ? `1px solid ${theme.palette.divider[100]}`
                                : "none",
                              padding: "8px 8px",
                              "&:nth-of-type(1)": { padding: "8px 16px" },
                            },
                            height: "30px",
                            background: (theme) =>
                              index % 2 === 0
                                ? theme.palette.grey[100]
                                : theme.palette.background.paper,
                          }}
                          hover
                          onClick={
                            onRowClick && !rightButton
                              ? () => onRowClick(dataInformation)
                              : undefined
                          }
                          key={`vendor-${index}`}
                        >
                          {isExpandData && (
                            <TableCell>
                              <IconButton
                                color="default"
                                size="small"
                                onClick={() => handleRowClick(index)}
                              >
                                {openRows.includes(index) ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                )}
                              </IconButton>
                            </TableCell>
                          )}
                          {rows.map((data2: any, index2: number) => (
                            <TableCell
                              key={index2}
                              align={data2.align || "left"}
                            >
                              <div>
                                {data2.render
                                  ? data2.render(dataInformation, index)
                                  : null}
                              </div>
                            </TableCell>
                          ))}
                          {rightButton && (
                            <TableCell>
                              <IconButton
                                onClick={
                                  onRowClick
                                    ? () => onRowClick(dataInformation)
                                    : undefined
                                }
                              >
                                <MoreVert />
                              </IconButton>
                            </TableCell>
                          )}
                        </StyledCustomTableRowBody>
                        <TableRow>
                          <TableCell
                            colSpan={data.length + rows.length}
                            style={{ padding: 0, border: "none" }}
                          >
                            <Collapse
                              in={openRows.includes(index)}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  margin: 0,
                                  borderRadius: "0px 0px 18px 16px",
                                  borderBottom: "1px solid #D4D9DF",
                                }}
                              >
                                {RenderExpandData &&
                                  RenderExpandData(dataInformation, index)}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  {data && data?.length > 0 ? (
                    caption &&
                    caption.map((item: any, index: number) => (
                      <React.Fragment key={index}>
                        <StyledCustomTableRowBody
                          sx={{
                            ".MuiTableCell-root": {
                              borderTop: `1px solid ${theme.palette.divider[100]}`,
                              padding: "8px 8px",
                              "&:nth-of-type(1)": { padding: "8px 16px" },
                            },
                            height: "30px",
                          }}
                          hover
                          onClick={
                            onRowClick && !rightButton
                              ? () => onRowClick(item)
                              : undefined
                          }
                          key={`vendor-${index}`}
                        >
                          {rows.map((data2: any, index2: number) => (
                            <TableCell
                              key={index2}
                              align={data2.align || "left"}
                            >
                              <div>
                                {data2.render
                                  ? data2.render(item, index)
                                  : null}
                              </div>
                            </TableCell>
                          ))}
                        </StyledCustomTableRowBody>
                      </React.Fragment>
                    ))
                  ) : (
                    <TableBody
                      sx={
                        renderTableHead
                          ? {}
                          : { position: "relative", bottom: "2.4rem" }
                      }
                    >
                      <StyledCustomTableRowBody>
                        <TableCell
                          colSpan={rows.length}
                          sx={{
                            height: "500px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress />
                          </Box>
                        </TableCell>
                      </StyledCustomTableRowBody>
                    </TableBody>
                  )}
                </TableBody>
              )}
            </MuiTable>
          </TableContainer>
        </>
      )}
    </>
  );
}
