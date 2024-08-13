"use client";
import { useCallback, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  Pagination,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
  Spinner,
} from "@nextui-org/react";
import { capitalize } from "@/helpers/cx";
import { columns } from "@/dummy/columns-pppk";
import { Icon } from "../icons/bootstrap-icon";
import {
  DocumentCurrencyDollarIcon,
  EllipsisHorizontalCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next-nprogress-bar";
import { encrypt } from "@/helpers/encrypt";

const INITIAL_VISIBLE_COLUMNS = ["nipppk", "nama", "jabatan", "aksi"];

export const TablePppk = ({ silka, unorlist, pegawais }) => {
  const router = useRouter();
  const { data: datapegawai } = pegawais;
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [selectedKeyUnor, setSelectedKeyUnor] = useState(1120);
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "nip",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (!visibleColumns) return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...datapegawai];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((pegawai) =>
        pegawai.nama.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length) {
      filteredUsers = filteredUsers.filter((pegawai) =>
        Array.from(statusFilter).includes(pegawai.nip_baru)
      );
    }

    return filteredUsers;
  }, [datapegawai, filterValue, hasSearchFilter, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // sorting items
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // render cell
  const renderCell = useCallback(
    (datapegawai, columnKey) => {
      const cellValue = datapegawai[columnKey];

      switch (columnKey) {
        case "nip":
          return <p>{datapegawai.nipppk} </p>;
        case "nama":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {datapegawai.nama_lengkap}
              </p>
              {/* <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p> */}
            </div>
          );
        case "jabatan":
          return <p>{datapegawai.jabatan} </p>;
        case "aksi":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button
                    className="group"
                    size="md"
                    radius="full"
                    color="primary"
                    variant="flat"
                    endContent={
                      <EllipsisHorizontalCircleIcon className="size-6 text-blue-400 transition-all duration-100 ease-in group-hover:translate-x-3" />
                    }>
                    Layanan
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="peremajaan"
                    onPress={() =>
                      router.push(
                        `/app-module/pppk/peremajaan/${encrypt(
                          datapegawai.nipppk,
                          "bkpsdm"
                        )}`
                      )
                    }
                    description="Peremajaan Data"
                    startContent={
                      <UserPlusIcon className="size-6 text-blue-600" />
                    }>
                    Peremajaan
                  </DropdownItem>
                  <DropdownItem
                    key="kgb"
                    onPress={() =>
                      router.push(
                        `/app-module/pppk/kgb/${encrypt(
                          datapegawai.nipppk,
                          "bkpsdm"
                        )}`
                      )
                    }
                    description="Verifikasi dan Kirim"
                    startContent={
                      <DocumentCurrencyDollarIcon className="size-6 text-green-600" />
                    }>
                    Proses KGB
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [router]
  );

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onSelectionChange = useCallback(
    (id) => {
      setSelectedKeyUnor(id);
      if (id === null) {
        return false;
      }
      setFilterValue("");
      setPage(1);
      router.replace(`?unor_id=${encrypt(id, "bkpsdm@6811")}`);
    },
    [router]
  );

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // top content
  const topContent = useMemo(() => {
    return (
      <>
        <div className="flex justify-between gap-3 items-start">
          <Autocomplete
            fullWidth
            disableAnimation={false}
            size="md"
            variant="bordered"
            placeholder={`Pilih Unit Kerja`}
            defaultItems={unorlist}
            selectedKey={`${selectedKeyUnor}`}
            classNames={{
              selectorButton: "text-default-800",
            }}
            allowsCustomValue={true}
            onSelectionChange={onSelectionChange}
            label={
              <Icon
                iconName="Buildings"
                size="20"
                color="gray"
                className="my-2"
              />
            }
            labelPlacement="outside-left">
            {unorlist.map((unor) => (
              <AutocompleteItem
                key={unor.id_unit_kerja}
                value={unor.id_unit_kerja}>
                {unor.nama_unit_kerja}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <div className="flex items-start justify-start gap-3">
            <Input
              isClearable
              className="w-full sm:max-w-[80%]"
              placeholder="Search by nama pegawai..."
              startContent={<Icon iconName="Search" />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <Dropdown backdrop="blur">
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icon iconName="ChevronDown" size="20" />}
                  variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                // @ts-ignore
                onSelectionChange={setVisibleColumns}>
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </>
    );
  }, [
    filterValue,
    onClear,
    onSearchChange,
    onSelectionChange,
    selectedKeyUnor,
    unorlist,
    visibleColumns,
  ]);

  // bottom content
  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="flex justify-between items-center">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
        <span className="text-default-400 text-small">
          Total {datapegawai.length} users of {pages} pages
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          initialPage={1}
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [datapegawai.length, onRowsPerPageChange, page, pages]);

  return (
    <Table
      isStriped
      isHeaderSticky
      className="relative"
      aria-label="Example static collection table"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="inside"
      // @ts-ignore
      sortDescriptor={sortDescriptor}
      // @ts-ignore
      onSortChange={setSortDescriptor}>
      <TableHeader columns={headerColumns} className="sticky top-20">
        {(column) => (
          <TableColumn
            allowsSorting={column.sortable}
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        emptyContent={"No rows to display."}
        loadingContent={<Spinner label="Loading..." />}
        items={sortedItems}>
        {(item) => (
          <TableRow key={item.nipppk}>
            {(colKey) => <TableCell>{renderCell(item, colKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};