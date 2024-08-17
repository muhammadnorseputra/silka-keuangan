"use client";

import { useCallback, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell, Pagination,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Autocomplete, AutocompleteItem,
  Spinner, DropdownSection
} from "@nextui-org/react";
import { capitalize } from "@/helpers/cx";
import { columns } from "@/dummy/columns-pegawai";
import { Icon } from "../icons/bootstrap-icon";
import {
  DocumentCheckIcon,
  DocumentCurrencyDollarIcon,
  EllipsisHorizontalCircleIcon,
  UserPlusIcon
} from "@heroicons/react/24/solid";
import { useRouter } from "next-nprogress-bar";
import { encrypt } from "@/helpers/encrypt";
// import { dataUnorByRole } from "@/dummy/data-unor-by-role";

const INITIAL_VISIBLE_COLUMNS = ["nip", "nama", "jabatan", "aksi"];

export const TablePegawai = ({ unors, pegawais }) => {
  const router = useRouter();
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
          return <p>{datapegawai.nip_baru} </p>;
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
              <Dropdown backdrop="opaque">
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
                <DropdownMenu color="primary" variant="faded">
                  <DropdownSection title="Peremajaan" showDivider>
                    <DropdownItem
                      key="peremajaan"
                      onPress={() => {
                        router.push(
                          `/app-module/pegawai/peremajaan/${encrypt(
                            datapegawai.nip_baru,
                            "bkpsdm"
                          )}`
                        );
                        setIsLoadingTable(true);
                      }}
                      description="Peremajaan Data"
                      startContent={
                        <UserPlusIcon className="size-6 text-blue-600" />
                      }>
                      Peremajaan
                    </DropdownItem>
                    <DropdownItem
                      key="verval"
                      onPress={() => {
                        router.push(
                          `/app-module/pegawai/verval/${encrypt(
                            datapegawai.nip_baru,
                            "bkpsdm"
                          )}`
                        );
                        setIsLoadingTable(true);
                      }}
                      description="Verifikasi dan Validasi"
                      startContent={
                        <DocumentCheckIcon className="size-6 text-green-500" />
                      }>
                      Verval Data
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection title="Layanan Integrasi">
                    <DropdownItem
                      key="kgb"
                      onPress={() => {
                        router.push(
                          `/app-module/pegawai/kgb/${encrypt(
                            datapegawai.nip_baru,
                            "bkpsdm"
                          )}`
                        );
                        setIsLoadingTable(true);
                      }}
                      description="Verifikasi dan Kirim"
                      startContent={
                        <DocumentCurrencyDollarIcon className="size-6 text-red-400" />
                      }>
                      Proses KGB
                    </DropdownItem>
                    <DropdownItem
                      key="tpp"
                      onPress={() => {
                        router.push(
                          `/app-module/pegawai/tpp/${encrypt(
                            datapegawai.nip_baru,
                            "bkpsdm"
                          )}`
                        );
                        setIsLoadingTable(true);
                      }}
                      description="Proses Tambahan Penghasilan Pegawai"
                      startContent={
                        <DocumentCurrencyDollarIcon className="size-6 text-amber-600" />
                      }>
                      Proses TPP
                    </DropdownItem>
                  </DropdownSection>
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
            classNames={{
              base: "max-w-xl",
              listboxWrapper: "max-h-[320px]",
              selectorButton: "text-default-500",
            }}
            // style={{ width: "500px" }}
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
              className="w-full sm:max-w-[70%]"
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
    <Table
      isStriped
      isHeaderSticky
      className="relative"
      aria-label="Example static collection table"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
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
        isLoading={isLoadingTable}
        emptyContent={"No rows to display."}
        loadingContent={
          <div className="w-full h-full flex items-center justify-center bg-white/80 dark:bg-black/80 z-10">
            <Spinner label="Loading..." />
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
  );
};
