"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePasien } from "@/hooks/pasien/useFetchPasien";
import {
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <AddPasien />
      </div>
    </main>
  );
}

function AddPasien() {
  const { pasien } = usePasien();
  const renderData = () => {
    return pasien?.map((item) => (
      <tr key={item.noPasien}>
        <td>{item.noPasien}</td>
        <td>{item.nama}</td>
        <td>{item.keluhan}</td>
        <td>{item.gender}</td>
        <td>{item.alamat}</td>
        <td>{item.kunjungan}</td>
      </tr>
    ));
  };

  return (
    <div className="w-full mx-[5rem] block">
      <h1 className="font-bold text-[1rem] mb-[.5rem]">DATA PASIEN</h1>
      <table className="w-full rounded-lg text-center mb-[1rem] py-[.5rem]">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Keluhan</th>
            <th>Gender</th>
            <th>Alamat</th>
            <th>Kunjungan</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
        <form action="">
          <VStack>
            <FormControl>
              <FormLabel></FormLabel>
              <Input />
            </FormControl>
          </VStack>
          <VStack>
            <FormControl>
              <FormLabel></FormLabel>
              <Input />
            </FormControl>
          </VStack>
        </form>
      </table>
    </div>
  );
}
