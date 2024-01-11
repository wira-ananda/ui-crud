"use client";
import { usePasien } from "@/hooks/pasien/useFetchPasien";
import { axiosInstance } from "@/lib/axios";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import logoku from "@/img/LogoWiraHitam.svg";

function AddPasien() {
  const [submitter, setSubmitter] = useState(false);
  const { pasien } = usePasien();

  const renderData = () => {
    return pasien?.map((item) => (
      <tr key={item.noPasien}>
        <td>{item.noPasien}</td>
        <td>{item.nama}</td>
        <td>{item.gender}</td>
        <td>{item.alamat}</td>
        <td>{item.keluhan}</td>
        <td>{item.kunjungan}</td>
        <td>
          <Button
            colorScheme="red"
            onClick={async () => {
              try {
                await axiosInstance.delete(`/pasien/${item.noPasien}`);
                window.location.reload();
              } catch (error) {
                console.error("Submit Gagal: ", error);
              }
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
  };

  const formik = useFormik({
    initialValues: {
      nama: "",
      gender: "",
      alamat: "",
      keluhan: "",
    },
    onSubmit: async () => {
      const { nama, gender, alamat, keluhan } = formik.values;
      setSubmitter(true);

      try {
        await axiosInstance.post("/pasien", {
          nama,
          gender,
          alamat,
          keluhan,
        });
        formik.resetForm();
        window.location.reload();
      } catch (error) {
        console.error("Submit Gagal: ", error);
      } finally {
        setSubmitter(false);
      }
    },
  });

  useEffect(() => {
    console.log("Submit Berhasil");
  }, [submitter]);

  const handleFormValue = (event) => {
    const { name, value } = event.target;

    formik.setFieldValue(name, value);
  };

  const option = ["P", "L"];

  return (
    <div className="w-full mx-[5rem] block">
      <h1 className="font-bold text-[1.5rem] mb-[.5rem] text-center">
        DATA PASIEN
      </h1>
      <table className="w-full rounded-lg text-center mb-[2rem] py-[.5rem]">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Gender</th>
            <th>Alamat</th>
            <th>Keluhan</th>
            <th>Kunjungan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
      <h1 className="font-bold text-[1.5rem] mb-[.5rem] text-center">
        SUBMIT DATA PASIEN
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={3}>
          <FormControl>
            <FormLabel>Nama</FormLabel>
            <Input onChange={handleFormValue} name="nama" />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              {option.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Alamat</FormLabel>
            <Input onChange={handleFormValue} name="alamat" />
          </FormControl>
          <FormControl>
            <FormLabel>Keluhan</FormLabel>
            <Input onChange={handleFormValue} name="keluhan" />
          </FormControl>
          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <div className="w-[100vw] h-[10vh]">
      <div></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-center font-bold text-[2rem] mb-[3rem]">
          MONITORING DATA PASIEN RUMAH SAKIT WIRAA CORPORATION
        </h1>
        <AddPasien />
        <Footer />
      </div>
    </main>
  );
}
