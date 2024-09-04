'use client';

import { useProfile } from "@/lib/FetchQuery";
import { polaNIP } from "./polanip";
import { Skeleton } from "@nextui-org/react";

const ShowProfile = ({ jenis, nipnama }) => {
    const { data, isPending, isFetching, isError, error } = useProfile({ jenis, nipnama })
    
    if(isPending || isFetching) return (
        <Skeleton className="w-full rounded-lg">
            <div className="h-6 w-full rounded-lg bg-default-200"></div>
        </Skeleton>
    )
    
    if(isError) return error.message

    if(data?.status === false) return "";

    const { nip, nama_asn, photo, nama_unit_kerja, jabatan } = data?.data[0]
    return (
        <>
            <div className="text-medium">{ nama_asn } - {polaNIP(nip)}</div>
        </>
    )
}

export { ShowProfile }