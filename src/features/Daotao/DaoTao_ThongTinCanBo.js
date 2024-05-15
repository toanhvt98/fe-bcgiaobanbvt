import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
  Tooltip,
  IconButton,
  Skeleton,
  Button,
} from "@mui/material";

// third-party
import { Formik, Form } from "formik";
import * as Yup from "yup";
import update from "immutability-helper";

import { NumericFormat } from "react-number-format";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

// project-imports
import MainCard from "../../components/MainCard";
// import Avatar from "../../components/@extended/Avatar";
import ScrollX from "../../components/ScrollX";
import LinearWithLabel from "../../components/@extended/progress/LinearWithLabel";

import makeData from "../../data/react-table";
import SyntaxHighlight from "../../utils/SyntaxHighlight";

import {
  DraggableHeader,
  DragPreview,
  HidingSelect,
  HeaderSort,
  IndeterminateCheckbox,
  TablePagination,
  TableRowSelection,
  CSVExport,
  EmptyTable,
} from "../../components/third-party/ReactTable";

import {
  roundedMedian,
  renderFilterTypes,
  filterGreaterThan,
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
} from "../../utils/react-table";
import { ThemeMode } from "../../configAble";

// assets
import {
  ArrowDown2,
  ArrowRight2,
  Edit,
  LayoutMaximize,
  Maximize1,
  Send,
} from "iconsax-react";
import mockData from "../../utils/mock-data";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { fDate, formatDateTime } from "../../utils/formatTime";
import DaoTao_ModalThemCanBo from "./DaoTao_ModalThemCanBo";
// const avatarImage = require.context("assets/images/users", true);

// ==============================|| REACT TABLE ||============================== //

function ReactSubTable({ columns, data, loading, top }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    usePagination
  );

  if (loading) {
    return (
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell key={column} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {[0, 1, 2].map((item) => (
            <TableRow key={item}>
              {[0, 1, 2, 3, 4, 5].map((col) => (
                <TableCell key={col}>
                  <Skeleton animation="wave" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Stack>
      {top && (
        <Box sx={{ p: 2 }}>
          <TablePagination
            gotoPage={gotoPage}
            rows={rows}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
          />
        </Box>
      )}

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: top ? 2 : 1 }}>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  key={column}
                  cell={column}
                  {...column.getHeaderProps([{ className: column.className }])}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow key={row} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell
                    key={cell}
                    {...cell.getCellProps([
                      { className: cell.column.className },
                    ])}
                  >
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          {!top && (
            <TableRow>
              <TableCell sx={{ p: 2 }} colSpan={7}>
                <TablePagination
                  gotoPage={gotoPage}
                  rows={rows}
                  setPageSize={setPageSize}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
}

ReactSubTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

// ==============================|| SUB ROW - ASYNC DATA ||============================== //

function SubRowAsync({ title, dataCanBo }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const numRows = mockData(1);

  const columns = useMemo(
    () => [
      // {
      //   Header: 'Avatar',
      //   accessor: 'avatar',
      //   className: 'cell-center',
      //   Cell: ({ value }) => <Avatar alt="Avatar 1" size="sm" src={avatarImage(`./avatar-${value}.png`)} />
      // },
      {
        Header: "ID",
        accessor: "_id",
      },
      // {
      //   Header: "Email",
      //   accessor: "email",
      // },
      // {
      //   Header: "Role",
      //   accessor: "role",
      // },
      // {
      //   Header: "Contact",
      //   accessor: "contact",
      //   className: "cell-right",
      // },
      // {
      //   Header: "Country",
      //   accessor: "country",
      // },
    ],
    []
  );
  useEffect(() => {
    setData(dataCanBo);
    setLoading(false);
  });
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setData(makeData(numRows.number.status(21, 2000)));

  //     setLoading(false);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   // eslint-disable-next-line
  // }, []);

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  return (
    <TableRow
      sx={{
        bgcolor: backColor,
        "&:hover": { bgcolor: `${backColor} !important` },
      }}
    >
      <TableCell colSpan={8} sx={{ p: 2.5 }}>
        <MainCard
          title={title}
          secondary={
            <CSVExport data={data} filename={"expanded-sub-table-data.csv"} />
          }
          content={false}
          sx={{ ml: { xs: 2.5, sm: 5, md: 6, lg: 10, xl: 12 } }}
        >
          <ReactSubTable columns={columns} data={data} loading={loading} />
        </MainCard>
      </TableCell>
    </TableRow>
  );
}

SubRowAsync.propTypes = {
  value: PropTypes.string,
};

const EditableRow = ({
  value: initialValue,
  row: { index },
  column: { id, dataType },
  editableRowIndex,
}) => {
  const [value, setValue] = useState(initialValue);
  const theme = useTheme();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const ShowStatus = (value) => {
    switch (value) {
      case "Complicated":
        return (
          <Chip
            color="error"
            label="Complicated"
            size="small"
            variant="light"
          />
        );
      case "Relationship":
        return (
          <Chip
            color="success"
            label="Relationship"
            size="small"
            variant="light"
          />
        );
      case "Single":
        return (
          <Chip color="info" label="Single" size="small" variant="light" />
        );
      default:
        return;
    }
  };

  let element;
  let userInfoSchema;

  switch (id) {
    case "email":
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string()
          .email("Enter valid email ")
          .required("Email is a required field"),
      });
      break;
    case "age":
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number()
          .required("Age is required")
          .typeError("Age must be number")
          .min(18, "You must be at least 18 years")
          .max(100, "You must be at most 60 years"),
      });
      break;
    case "visits":
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number()
          .typeError("Visits must be number")
          .required("Required"),
      });
      break;
    default:
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Name is Required"),
      });
      break;
  }

  let IsEditAble = index === editableRowIndex;

  switch (dataType) {
    case "text":
      element = (
        <>
          {IsEditAble ? (
            <>
              <Formik
                initialValues={{
                  userInfo: value,
                }}
                enableReinitialize
                validationSchema={userInfoSchema}
                onSubmit={() => {}}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <TextField
                      value={values.userInfo}
                      id={`${index}-${id}`}
                      name="userInfo"
                      onChange={(e) => {
                        handleChange(e);
                        onChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.userInfo && Boolean(errors.userInfo)}
                      helperText={
                        touched.userInfo && errors.userInfo && errors.userInfo
                      }
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          py: 0.75,
                          px: 1,
                          backgroundColor:
                            theme.palette.mode === ThemeMode.DARK
                              ? "inherit"
                              : "common.white",
                        },
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            value
          )}
        </>
      );
      break;
    case "select":
      element = (
        <>
          {IsEditAble ? (
            <Select
              labelId="demo-simple-select-label"
              sx={{
                "& .MuiOutlinedInput-input": {
                  py: 0.75,
                  px: 1,
                  backgroundColor:
                    theme.palette.mode === ThemeMode.DARK
                      ? "inherit"
                      : "common.white",
                },
              }}
              id="demo-simple-select"
              value={value}
              onChange={onChange}
            >
              <MenuItem value={"Complicated"}>
                <Chip
                  color="error"
                  label="Complicated"
                  size="small"
                  variant="light"
                />
              </MenuItem>
              <MenuItem value={"Relationship"}>
                <Chip
                  color="success"
                  label="Relationship"
                  size="small"
                  variant="light"
                />
              </MenuItem>
              <MenuItem value={"Single"}>
                <Chip
                  color="info"
                  label="Single"
                  size="small"
                  variant="light"
                />
              </MenuItem>
            </Select>
          ) : (
            ShowStatus(value)
          )}
        </>
      );
      break;
    case "progress":
      element = (
        <>
          {IsEditAble ? (
            <>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ pl: 1, minWidth: 120 }}
              >
                <Slider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
              </Stack>
            </>
          ) : (
            <div>
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            </div>
          )}
        </>
      );
      break;
    default:
      element = <span>{value}</span>;
      break;
  }
  return element;
};

function ReactTable({ columns, data, renderRowSubComponent }) {
  const khoa = useSelector((state) => state.daotao.danhsachkhoa);
  const [isOpenModal_ThemCanBo, setisOpenModal_ThemCanBo] = useState(false);
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const [editableRowIndex, setEditableRowIndex] = useState(null);

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: EditableRow,
    }),
    []
  );

  const initialState = useMemo(
    () => ({
      filters: [{ id: "status", value: "" }],
      hiddenColumns: ["_id", "TinChiMacDinh"],
      // columnOrder: [
      //   "expandingTable",
      //   "selection",
      //   "avatar",
      //   "lastName",
      //   "firstName",
      //   "email",
      //   "age",
      //   "visits",
      //   "status",
      //   "progress",
      // ],
      pageIndex: 0,
      pageSize: 10,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page,
    prepareRow,
    setColumnOrder,
    gotoPage,
    setPageSize,
    setHiddenColumns,
    allColumns,
    state: {
      globalFilter,
      hiddenColumns,
      pageIndex,
      pageSize,
      columnOrder,
      selectedRowIds,
    },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      filterTypes,
      editableRowIndex,
      setEditableRowIndex,
    },
    useGlobalFilter,
    useFilters,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        {
          accessor: "edit",
          id: "edit",
          Footer: "Edit",
          Header: "Edit",
          disableFilters: true,
          disableSortBy: true,
          disableGroupBy: true,
          groupByBoundary: true,
          Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
            <>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={0}
              >
                <Tooltip
                  title={editableRowIndex !== row.index ? "Edit" : "Save"}
                >
                  <IconButton
                    color={
                      editableRowIndex !== row.index ? "primary" : "success"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = row.index;
                      if (editableRowIndex !== currentIndex) {
                        console.log(row.values);
                        setEditableRowIndex(currentIndex);
                      } else {
                        // request for saving the updated row
                        setEditableRowIndex(null);
                      }
                    }}
                  >
                    {editableRowIndex !== row.index ? <Edit /> : <Send />}
                  </IconButton>
                </Tooltip>
              </Stack>
            </>
          ),
        },
      ]);
    }
  );

  const reorder = (item, newIndex) => {
    const { index: currentIndex } = item;

    let dragRecord = columnOrder[currentIndex];
    if (!columnOrder.includes(item.id)) {
      dragRecord = item.id;
    }

    setColumnOrder(
      update(columnOrder, {
        $splice: [
          [currentIndex, 1],
          [newIndex, 0, dragRecord],
        ],
      })
    );
  };

  let headers = [];
  allColumns.map((item) => {
    if (
      !hiddenColumns?.includes(item.id) &&
      item.id !== "selection" &&
      item.id !== "edit"
    ) {
      headers.push({
        label: typeof item.Header === "string" ? item.Header : "#",
        key: item.id,
      });
    }
    return item;
  });

  return (
    <>
      {/* <TableRowSelection selected={Object.keys(selectedRowIds).length} /> */}
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ p: 2, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" spacing={2}>
            <HidingSelect
              hiddenColumns={hiddenColumns}
              setHiddenColumns={setHiddenColumns}
              allColumns={allColumns}
            />
            <CSVExport
              data={
                selectedFlatRows.length > 0
                  ? selectedFlatRows.map((d) => d.original)
                  : data
              }
              filename={"umbrella-table.csv"}
              headers={headers}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setisOpenModal_ThemCanBo(true);
              }}
            >
              Thêm cán bộ
            </Button>
          </Stack>
        </Stack>

        <Box sx={{ width: "100%", overflowX: "auto", display: "block" }}>
          <Table {...getTableProps()}>
            <TableHead sx={{ borderTopWidth: 2 }}>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  key={headerGroup}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column, index) => {
                    const groupIcon = column.isGrouped ? (
                      <Maximize1 size={18} />
                    ) : (
                      <LayoutMaximize size={18} />
                    );
                    return (
                      <TableCell
                        key={column}
                        {...column.getHeaderProps([
                          { className: column.className },
                        ])}
                      >
                        <DraggableHeader
                          reorder={reorder}
                          key={column.id}
                          column={column}
                          index={index}
                        >
                          <Stack
                            direction="row"
                            spacing={1.15}
                            alignItems="center"
                            sx={{ display: "inline-flex" }}
                          >
                            {column.canGroupBy ? (
                              <Box
                                sx={{
                                  color: column.isGrouped
                                    ? "error.main"
                                    : "primary.main",
                                  fontSize: "1rem",
                                }}
                                {...column.getGroupByToggleProps()}
                              >
                                {groupIcon}
                              </Box>
                            ) : null}
                            <HeaderSort column={column} sort />
                          </Stack>
                        </DraggableHeader>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            {/* striped table -> add class 'striped' */}
            <TableBody {...getTableBodyProps()} className="striped">
              {headerGroups.map((group) => (
                <TableRow key={group} {...group.getHeaderGroupProps()}>
                  {group.headers.map((column) => (
                    <TableCell
                      key={column}
                      {...column.getHeaderProps([
                        { className: column.className },
                      ])}
                    >
                      {column.canFilter ? column.render("Filter") : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {page.length > 0 ? (
                page.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  return (
                    <Fragment key={i}>
                      <TableRow
                        key={row}
                        {...row.getRowProps()}
                        {...(editableRowIndex !== row.index && {
                          onClick: () => {
                            // row.toggleRowSelected();
                          },
                        })}
                        sx={{
                          cursor: "pointer",
                          bgcolor: row.isSelected
                            ? alpha(theme.palette.primary.lighter, 0.35)
                            : "inherit",
                        }}
                      >
                        {row.cells.map((cell) => {
                          let bgcolor = "inherit";
                          if (cell.isGrouped) bgcolor = "success.lighter";
                          if (cell.isAggregated) bgcolor = "warning.lighter";
                          if (cell.isPlaceholder) bgcolor = "error.lighter";
                          if (cell.isPlaceholder) bgcolor = "error.lighter";
                          if (row.isSelected)
                            bgcolor = alpha(
                              theme.palette.primary.lighter,
                              0.35
                            );
                          const collapseIcon = row.isExpanded ? (
                            <ArrowDown2 />
                          ) : (
                            <ArrowRight2 />
                          );

                          return (
                            <TableCell
                              key={cell}
                              {...cell.getCellProps([
                                { className: cell.column.className },
                              ])}
                              sx={{ bgcolor }}
                            >
                              {cell.isGrouped ? (
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                  sx={{ display: "inline-flex" }}
                                >
                                  <Box
                                    sx={{
                                      pr: 1.25,
                                      fontSize: "0.75rem",
                                      color: "text.secondary",
                                    }}
                                    onClick={(e) => {
                                      row.toggleRowExpanded();
                                      e.stopPropagation();
                                    }}
                                  >
                                    {collapseIcon}
                                  </Box>
                                  {cell.render("Cell")} ({row.subRows.length})
                                </Stack>
                              ) : cell.isAggregated ? (
                                cell.render("Aggregated")
                              ) : cell.isPlaceholder ? null : (
                                cell.render("Cell")
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {/* {row.isExpanded &&
                        renderRowSubComponent({ row, rowProps })} */}
                    </Fragment>
                  );
                })
              ) : (
                <EmptyTable msg="No Data" colSpan={9} />
              )}
            </TableBody>
            {/* footer table */}
            {/* <TableFooter sx={{ borderBottomWidth: 2 }}>
              {footerGroups.map((group) => (
                <TableRow key={group} {...group.getFooterGroupProps()}>
                  {group.headers.map((column) => (
                    <TableCell
                      key={column}
                      {...column.getFooterProps([
                        { className: column.className },
                      ])}
                    >
                      {column.render("Footer")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter> */}
          </Table>
        </Box>
        <Box sx={{ p: 2, py: 0 }}>
          <TablePagination
            gotoPage={gotoPage}
            rows={rows}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
          />
        </Box>

        {/* <SyntaxHighlight>
          {JSON.stringify(
            {
              selectedRowIndices: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </SyntaxHighlight> */}
      </Stack>
      <DaoTao_ModalThemCanBo
        isOpen={isOpenModal_ThemCanBo}
        isClose={() => setisOpenModal_ThemCanBo(false)}
      />
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  row: PropTypes.object,
  index: PropTypes.string,
  getRowProps: PropTypes.func,
  setEditableRowIndex: PropTypes.func,
  editableRowIndex: PropTypes.func,
  toggleRowSelected: PropTypes.func,
  isSelected: PropTypes.bool,
  isExpanded: PropTypes.bool,
  toggleRowExpanded: PropTypes.func,
  subRows: PropTypes.object,
  length: PropTypes.string,
};

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

const UmbrellaTable = () => {
  const danhsachcanbo = useSelector((state) => state.daotao.danhsachcanbo);
  const columns = useMemo(
    () => [
      // {
      //   title: "Row Selection",
      //   id: "selection",
      //   Header: ({ getToggleAllPageRowsSelectedProps }) => (
      //     <IndeterminateCheckbox
      //       indeterminate
      //       {...getToggleAllPageRowsSelectedProps()}
      //     />
      //   ),
      //   Footer: "#",
      //   accessor: "selection",
      //   groupByBoundary: true,
      //   Cell: ({ row }) => (
      //     <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
      //   ),
      //   disableSortBy: true,
      //   disableFilters: true,
      //   disableGroupBy: true,
      //   Aggregated: () => null,
      // },
      {
        Header: "_id",
        Footer: "_id",
        accessor: "_id",
        className: "cell-center",
        disableFilters: true,
        disableGroupBy: true,
      },
      // {
      //   Header: "Avatar",
      //   Footer: "Avatar",
      //   accessor: "avatar",
      //   className: "cell-center",
      //   disableSortBy: true,
      //   disableFilters: true,
      //   disableGroupBy: true,
      //   Cell: ({ value }) => (
      //     <Avatar
      //       alt="Avatar 1"
      //       size="sm"
      //       src={avatarImage(`./avatar-${!value ? 1 : value}.png`)}
      //     />
      //   ),
      // },
      {
        Header: () => null,
        id: "expandingTable",
        Header: "Chi tiết",
        className: "cell-center",
        disableGroupBy: true,
        disableSortBy: true,
        Cell: ({ row }) => {
          const collapseIcon = row.isExpanded ? (
            <ArrowDown2 size={14} />
          ) : (
            <ArrowRight2 size={14} />
          );
          return (
            <Box
              sx={{ fontSize: "0.75rem", color: "text.secondary" }}
              {...row.getToggleRowExpandedProps()}
            >
              {collapseIcon}
            </Box>
          );
        },
        SubCell: () => null,
        disableFilters: true,
        disableGroupBy: true,
      },
      {
        Header: "Mã cán bộ",
        Footer: "Mã cán bộ",
        accessor: "MaCanBo",
        dataType: "text",
        disableGroupBy: true,
        disableSortBy: true,
        aggregate: "count",
        Aggregated: ({ value }) => `${value} Cán bộ`,
      },
      {
        Header: "Tên cán bộ",
        Footer: "TenCanbo",
        accessor: "TenCanbo",
        dataType: "text",
        filter: "fuzzyText",
        disableGroupBy: true,
      },
      {
        Header: "Khoa",
        Footer: "Khoa",
        accessor: "KhoaID.TenKhoa",
        dataType: "text",
        disableGroupBy: false,
        // Cell: ({ value, row }) => (
        //   <Typography variant="subtitle1">{value.TenKhoa}</Typography>
        // ),
      },
      {
        Header: "Giới Tính",
        Footer: "GioiTinh",
        accessor: "GioiTinh",
        dataType: "text",
        disableGroupBy: false,
      },
      {
        Header: "Dân tộc",
        Footer: "DanToc",
        accessor: "DanToc",
        dataType: "text",
        disableGroupBy: false,
        // className: "cell-right",
        // Filter: SliderColumnFilter,
        // filter: "equals",
        // aggregate: "average",
        // Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
      },
      {
        Header: "Trình độ chuyên môn",
        Footer: "TrinhDoChuyenMon",
        dataType: "text",
        accessor: "TrinhDoChuyenMon",
        disableGroupBy: false,
      },
      {
        Header: "Ngày sinh",
        dataType: "text",
        Footer: "NgaySinh",
        accessor: "NgaySinh",
        disableGroupBy: true,
        disableFilters: true,
        Cell: ({ value, row }) => (
          <Typography variant="subtitle1">{fDate(value)}</Typography>
        ),
      },
      {
        Header: "Tín chỉ mặc định",
        Footer: "TinChiMacDinh",
        accessor: "TinChiMacDinh",
        dataType: "text",
        disableGroupBy: true,
      },
      // {
      //   Header: "Visits",
      //   accessor: "visits",
      //   dataType: "text",
      //   className: "cell-right",
      //   Filter: NumberRangeColumnFilter,
      //   filter: "between",
      //   disableGroupBy: true,
      //   aggregate: "sum",
      //   Aggregated: ({ value }) => `${value} (total)`,
      //   Footer: (info) => {
      //     const { rows } = info;
      //     // only calculate total visits if rows change
      //     const total = useMemo(
      //       () => rows.reduce((sum, row) => row.values.visits + sum, 0),
      //       [rows]
      //     );

      //     return (
      //       <Typography variant="subtitle1">
      //         <NumericFormat
      //           value={total}
      //           displayType="text"
      //           thousandSeparator
      //         />
      //       </Typography>
      //     );
      //   },
      // },
      //
      // {
      //   Header: "Tổng số tín chỉ",
      //   Footer: "TongHopTinChi",
      //   accessor: "TongHopTinChi",
      //   dataType: "text",
      //   Filter: SelectColumnFilter,
      //   filter: "includes",
      // },
      //
      // {
      //   Header: "Profile Progress",
      //   Footer: "Profile Progress",
      //   accessor: "progress",
      //   Filter: SliderColumnFilter,
      //   dataType: "progress",
      //   filter: filterGreaterThan,
      //   disableGroupBy: true,
      //   aggregate: roundedMedian,
      //   Aggregated: ({ value }) => `${value} (med)`,
      // },
    ],
    []
  );
  const str = [
    "Tham gia các khóa đào tạo, bồi dưỡng ngắn hạn, hội nghị, hội thảo về y khoa phù hợp với phạm vi hành nghề",
    "Tham gia soạn thảo quy trình chuyên môn",
    "Thực hiện các nghiên cứu khoa học, giảng dạy về y khoa thuộc phạm vi hành nghề",
    "Tự cập nhật kiến thức y khoa và các hình thức khác",
  ];
  // const renderRowSubComponent = useCallback(
  //   () => {
  //     // Sử dụng flatMap để tạo ra một mảng phần tử React
  //     const subRowComponents = danhsachcanbo.flatMap((item) =>
  //       item.TongHopTinChi.map((tinchi, j) => (
  //         <Fragment key={j}>
  //           <SubRowAsync
  //             title={tinchi.TenHinhThuc}
  //             dataCanBo={tinchi.DanhSachTinChi}
  //           />
  //         </Fragment>
  //       ))
  //     );

  //     // Trả về mảng phần tử React đã tạo
  //     return subRowComponents;
  //   },
  //   [danhsachcanbo] // Bạn có thể muốn sử dụng danh sách này như một phần của dependencies của useCallback
  // );
  return (
    <MainCard
      title="Danh sách cán bộ"
      // subheader="This page consist combination of most possible features of react-table in to one table. Sorting, grouping, row selection, hidden row, filter, search, pagination, footer row available in below table."
      content={false}
    >
      <ScrollX>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <ReactTable
            columns={columns}
            data={danhsachcanbo}
            // renderRowSubComponent={renderRowSubComponent}
          />

          <DragPreview />
        </DndProvider>
      </ScrollX>
    </MainCard>
  );
};

UmbrellaTable.propTypes = {
  row: PropTypes.object,
  setEditableRowIndex: PropTypes.func,
  editableRowIndex: PropTypes.string,
  index: PropTypes.string,
  getRowProps: PropTypes.func,
  toggleRowSelected: PropTypes.func,
  isSelected: PropTypes.bool,
  isExpanded: PropTypes.bool,
  toggleRowExpanded: PropTypes.func,
  subRows: PropTypes.object,
  length: PropTypes.string,
  getToggleAllPageRowsSelectedProps: PropTypes.func,
  getToggleRowSelectedProps: PropTypes.func,
  value: PropTypes.string,
};

export default UmbrellaTable;
