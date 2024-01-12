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
import Image from "next/image";

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
      nama: null,
      gender: null,
      alamat: null,
      keluhan: null,
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

  const option = ["Masukkan Gender", "P", "L"];

  return (
    <div className="w-full h-[99.5%] block mx-auto">
      <h1 className="text-center font-bold text-[2rem] mb-[3rem]">
        Monitoring Data Pasien
      </h1>
      <h1 className="font-semibold text-[1.5rem] mb-[.5rem] text-center">
        Data Pasien
      </h1>
      {pasien.length == 0 ? (
        <div className="w-full rounded-lg text-center mb-[2rem] py-[.5rem]">
          <div>
            <a className="font-bold">Warning: </a>Belum ada pasien yang berobat
            saat ini, silahkan input data jika ada pasien. yang datang...
          </div>
        </div>
      ) : (
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
      )}
      <h1 className="font-semibold text-[1.5rem] mb-[.5rem] text-center">
        Input Data Pasien
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
  const wiraaWebsite = "https://wiraananda.netlify.app/";
  return (
    <div className="w-[100%] h-[.5%]">
      <div className="flex justify-between">
        <Image src={logoku} className="w-[5rem] h-[5rem]" alt="logo wiraa" />
        <div className="h-full my-auto">
          <h1>
            created by{" "}
            <a className="font-bold" href={wiraaWebsite}>
              Wiraa
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex h-(100vh) w-(100%) flex-col items-center justify-between p-24">
      <div className="items-center justify-between font-poppins text-sm h-[80vh]">
        <AddPasien />
        <Footer />
      </div>
    </main>
  );
}
