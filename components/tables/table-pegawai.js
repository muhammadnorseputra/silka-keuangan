"use client";

import { useCallback, useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Autocomplete,
  AutocompleteItem,
  Spinner,
  DropdownSection,
  Chip,
  Snippet,
} from "@nextui-org/react";
import { capitalize } from "@/helpers/cx";
import { columns } from "@/dummy/columns-pegawai";
import { Icon } from "../icons/bootstrap-icon";
import {
  CheckBadgeIcon,
  CheckIcon,
  DocumentCheckIcon,
  DocumentCurrencyDollarIcon,
  EllipsisHorizontalCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next-nprogress-bar";
import { encrypt } from "@/helpers/encrypt";
import { useModalDaftarLayananContext } from "@/lib/context/modal-daftar-layanan-context";
import { polaNIP } from "@/helpers/polanip";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
// import { dataUnorByRole } from "@/dummy/data-unor-by-role";

const INITIAL_VISIBLE_COLUMNS = ["nip", "nama", "jabatan", "aksi"];

const SampleModal = dynamic(() => import("../modal/modal-daftar-layanan"), {
  ssr: false,
});

export const TablePegawai = ({ unors, pegawais }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isOpen, setIsOpen, setData, setJenis } =
    useModalDaftarLayananContext();
  const { data: datapegawai } = pegawais;
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  // const [dataUnor, setDataUnor] = useState([]);
  const [selectedKeyUnor, setSelectedKeyUnor] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "nip",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  // const { nip, level } = silka?.data;
  // useEffect(() => {
  //   setIsLoadingTable(true);
  //   const getUnorByRole = async () => {
  //     const getUnorByRole = await dataUnorByRole(nip, level);
  //     setDataUnor(getUnorByRole?.data);
  //     setIsLoadingTable(false);
  //   };
  //   getUnorByRole();
  // }, [level, nip, silka.data]);

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
          return (
            <Snippet
              symbol=""
              size="sm"
              color="primary"
              variant="bordered"
              codeString={datapegawai.nip_baru}>
              {polaNIP(datapegawai.nip_baru)}
            </Snippet>
          );
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
          let peremajaan_is_sync =
            datapegawai.status_data === "APPROVE" ? (
              <Chip
                startContent={
                  <CheckBadgeIcon className="size-4 text-blue-700" />
                }
                variant="flat"
                color="primary"
                size="sm">
                PEREMAJAAN
              </Chip>
            ) : (
              ""
            );
          let tpp_is_sync =
            datapegawai.tpp_sync === "1" ? (
              <Chip
                startContent={
                  <CheckBadgeIcon className="size-4 text-green-700" />
                }
                variant="flat"
                color="success"
                size="sm">
                TPP
              </Chip>
            ) : (
              ""
            );
          let kgb_is_sync =
            datapegawai.kgb_sync === "1" ? (
              <Chip
                startContent={
                  <CheckBadgeIcon className="size-4 text-amber-700" />
                }
                variant="flat"
                color="warning"
                size="sm">
                KGB
              </Chip>
            ) : (
              ""
            );
          let pangkat_is_sync =
            datapegawai.pangkat_sync === "1" ? (
              <Chip
                startContent={
                  <CheckBadgeIcon className="size-4 text-purple-700" />
                }
                variant="flat"
                color="secondary"
                size="sm">
                PANGKAT
              </Chip>
            ) : (
              ""
            );
          return (
            <>
              <p>{datapegawai.jabatan} </p>
              {peremajaan_is_sync} {tpp_is_sync} {kgb_is_sync} {pangkat_is_sync}
            </>
          );
        case "aksi":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Button
                onPress={() => {
                  setIsOpen(true);
                  setData({ nip: datapegawai.nip_baru });
                  setJenis("PNS");
                }}
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
            </div>
          );
        default:
          return cellValue;
      }
    },
    [setData, setIsOpen, setJenis]
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
      router.replace(`?unor_id=${id}`);
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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-start">
          <Autocomplete
            size="md"
            isLoading={isLoadingTable}
            isDisabled={isLoadingTable}
            placeholder={`Pilih Unit Kerja`}
            selectedKey={`${selectedKeyUnor}`}
            variant="bordered"
            classNames={{
              base: "max-w-xl",
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500",
            }}
            style={{ width: "500px" }}
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
            {unors?.map((unor) => (
              <AutocompleteItem
                key={encrypt(unor.id_unit_kerja, "bkpsdm@6811")}
                value={encrypt(unor.id_unit_kerja, "bkpsdm@6811")}
                textValue={unor.nama_unit_kerja}>
                {unor.nama_unit_kerja}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <div className="flex align-items-end justify-content-end gap-3">
            <Input
              isClearable
              className="hidden sm:flex w-full sm:max-w-[70%]"
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
      </div>
    );
  }, [
    filterValue,
    isLoadingTable,
    onClear,
    onSearchChange,
    onSelectionChange,
    selectedKeyUnor,
    unors,
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
    <>
      <SampleModal isOpenModal={isOpen} onClose={() => setIsOpen(false)} />
      <Table
        // isStriped
        // isCompact
        // isHeaderSticky
        removeWrapper
        selectionMode="single"
        className="relative"
        aria-label="Example static collection table"
        topContent={topContent}
        topContentPlacement="inside"
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        // @ts-ignore
        sortDescriptor={sortDescriptor}
        // @ts-ignore
        onSortChange={setSortDescriptor}>
        <TableHeader columns={headerColumns}>
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
          isLoading={isLoadingTable}
          emptyContent={"No rows to display."}
          loadingContent={
            <div className="w-full h-full flex items-center justify-center bg-white/80 dark:bg-black/80 z-10">
              <Spinner label="Loading..." color="danger" />
            </div>
          }
          items={sortedItems}>
          {(item) => (
            <TableRow key={item.nip_baru}>
              {(colKey) => <TableCell>{renderCell(item, colKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
