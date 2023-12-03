'use client'
// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Switch,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  Text,

  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'

type Produk = {
  nama_produk: string;
  harga: number;
  kategori_id: number;
  status_id: number;
};

export default function Page(){
  
  const { isOpen: isAddOpen , onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()


  const [produk, setProduk] = useState<Produk[]>([]);
  const [newNamaProduk, setNewNamaProduk] = useState(String);
  const [newHarga, setNewHarga] = useState(Number);
  const [newKategoriId, setNewKategoriId] = useState(Number);
  const [newStatusId, setNewStatusId] = useState(Number);

  const [idProduk, setIdProduk] =  useState(Number);
  const [idStatus, setIdStatus] = useState(Number);
  const [singleData, setSingleData] = useState([]);
  const [data, setData] = useState();



  const [dataKategori, setDataKategori] = useState();

  const addProduk = async (): Promise<void> => {
    const response = await axios.post<Produk>('http://localhost:8000/produk/', {
      nama_produk: newNamaProduk,
      harga: newHarga,
      kategori: newKategoriId,
      status: newStatusId,
      nama_kategori: "holder",
    });

    setProduk([...produk, response.data]);
  };

  const updateProduk = async (): Promise<void> => {
    const response = await axios.put(`http://127.0.0.1:8000/produk/${idProduk}`, {
    nama_produk: newNamaProduk,
    harga: newHarga,
    kategori: newKategoriId,
    status: newStatusId,
    nama_kategori: "holder",
    });

  }

  const deleteProduk = async (id_produk: number): Promise<void> => {
    await axios.delete(`http://127.0.0.1:8000/produk/${id_produk}`)
  };

  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/produk/bisa-jual');

      // console.log(response.data.results);

      const dataMapping = response.data.results.map((dataItem: {
        id_produk: number;
        nama_produk: string;
        nama_kategori: string;
        harga: number;
        kategori: number;
        status: number;
      }) => {
        return {
          id_produk: dataItem.id_produk,
          nama_produk: dataItem.nama_produk,
          nama_kategori: dataItem.nama_kategori,
          harga: dataItem.harga,
          kategori: dataItem.kategori,
          status: dataItem.status
        }
      })

      setData(dataMapping)
      
    } catch (error) {
      console.error(error);
    }
  }

  const fetchDataFilter = async (id_status: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/produk/status/${id_status}`);

      // console.log(response.data.results);

      const dataMapping = response.data.results.map((dataItem: {
        id_produk: number;
        nama_produk: string;
        nama_kategori: string;
        harga: number;
        kategori: number;
        status: number;
      }) => {
        return {
          id_produk: dataItem.id_produk,
          nama_produk: dataItem.nama_produk,
          nama_kategori: dataItem.nama_kategori,
          harga: dataItem.harga,
          kategori: dataItem.kategori,
          status: dataItem.status
        }
      })

      setData(dataMapping)
      
    } catch (error) {
      console.error(error);
    }
  }

  const fetchSingleData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/produk/${idProduk}`);

      console.log(response.data);

      setSingleData(response.data)
      
    } catch (error) {
      console.error(error);
    }
  }


  const fetchDataKategori = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/kategori');

      console.log(response.data.results);

      const dataMapping = response.data.results.map((dataKategori: {
        id_kategori: number;
        nama_kategori: string;
      }) => {
        return {
          id_kategori: dataKategori.id_kategori,
          nama_kategori: dataKategori.nama_kategori,
        }
      })

      setDataKategori(dataMapping)
      
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchData();
    fetchDataKategori();
    // fetchSingleData();
  }, []);

  

    return (
      <div className='bg-white'>
        <Text>Kategori</Text>
        <Select px="12px" py="12px" placeholder='All' height='24px' width='240px'>
          {dataKategori?.map((dataKategori: any) => {
            return (
              <option key={dataKategori.id_kategori} value={dataKategori.id_kategori}>{dataKategori.nama_kategori}</option> 
            )     
          })}
        </Select>
        <Button px="12px" colorScheme='blue' size="md" height="48px" width="120px" variant="outline" onClick={() => {
                            onAddOpen();
                            }}>
                              Tambah Produk
                            </Button>
          <TableContainer px="32px" py="32px">
            <Table variant='simple'>
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Produk</Th>
                  <Th>Kategori</Th>
                  <Th isNumeric>Harga</Th>
                  <Th>Status</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((dataItem: any) => {
                  return (
                    <Tr key={dataItem.id_produk}>
                      <Td>{dataItem.id_produk}</Td>
                      <Td>{dataItem.nama_produk}</Td>
                      <Td>{dataItem.nama_kategori}</Td>
                      <Td isNumeric>{dataItem.harga}</Td>
                      <Td>{dataItem.status === 0 ? 'Tidak Bisa Dijual' : "Bisa Dijual"}</Td>
                      <Td>
                        <ButtonGroup gap='4'>
                          <Button colorScheme='blue' size="md" height="48px" width="120px" variant="outline" px="4px" onClick={() => {
                            setIdProduk(dataItem.id_produk);
                            
                            onEditOpen();
                            fetchSingleData();

                            
                            }}>
                              Edit
                            </Button>
                          <Button colorScheme='red' size="md" height="48px" width="120px" variant="outline" px="4px"  onClick={() => {
                            setIdProduk(dataItem.id_produk);
                            onDeleteOpen();
                            }}>Delete</Button>
                        </ButtonGroup>
                        
                      </Td>
                    </Tr>
                  )
                })}
                {/* <Tr>
                  <Td>1</Td>
                  <Td>Produk 1</Td>
                  <Td>Kategori 1</Td>
                  <Td isNumeric>13000</Td>
                  <Td>bisa dijual</Td>
                  <Td>
                    <ButtonGroup gap='4'>
                      <Button colorScheme='blue' size="md" height="48px" width="120px" variant="outline" px="4px" onClick={onEditOpen} value={value}>Edit</Button>
                      <Button colorScheme='red' size="md" height="48px" width="120px" variant="outline" px="4px">Delete</Button>
                    </ButtonGroup>
                    
                  </Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Produk 2</Td>
                  <Td>Kategori 2</Td>
                  <Td isNumeric>15000</Td>
                  <Td>bisa dijual</Td>
                  <Td>Placeholder</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Produk 3</Td>
                  <Td>Kategori 2</Td>
                  <Td isNumeric>19000</Td>
                  <Td>tidak bisa dijual</Td>
                  <Td>Placeholder</Td>
                </Tr> */}
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th>ID</Th>
                  <Th>Produk</Th>
                  <Th>Kategori</Th>
                  <Th isNumeric>Harga</Th>
                  <Th>Status</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
          <Modal closeOnOverlayClick={true} isOpen={isEditOpen} onClose={onEditClose}>
              <ModalOverlay/>
              <ModalContent>
                <ModalHeader>Edit Produk</ModalHeader>
                <ModalBody>
                  <Stack spacing={3}>
                  <Input 
                    placeholder={singleData.nama_produk} 
                    defaultValue={singleData.nama_produk}
                    value={ newNamaProduk } 
                    onChange={
                    (e) => setNewNamaProduk(e.target.value)
                  }/>
                  <NumberInput step={500} defaultValue={0} min={0} max={2000000}
                     
                  >
                    <NumberInputField value={ newHarga } placeholder={singleData.harga}
                      onChange={
                      (e) => setNewHarga(e.target.value)
                      }/>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Select px="12px" py="12px" placeholder={singleData.nama_kategori} height='36px' width='auto' value={newKategoriId} onChange={(e) => setNewKategoriId(e.target.value)}>
                    {/* {dataKategori?.map((dataKategori: any) => {
                      return (
                        <option key={dataKategori.id_kategori} value={dataKategori.id_kategori}
                        >value={dataKategori.id_kategori} {dataKategori.nama_kategori}</option> 
                      )     
                    })} */}
                    <option value="1">L QUEENLY</option>
                    <option value="2">L MTH AKSESORIS (IM)</option>
                    <option value="3">CI MTH TINTA LAIN (IM)</option>
                    <option value="4">S MTH STEMPEL (IM)</option>
                    <option value="5">L MTH TABUNG (LK)</option>
                    <option value="6">SP MTH SPAREPART (LK)</option>
                    <option value="7">L MTH AKSESORIS (LK)</option>
                  </Select>
                  <Checkbox py={5} onChange={(e) => setNewStatusId(e.target.checked?1:0)}>Bisa Dijual</Checkbox>
                  <Button
                    onClick={() => {
                      
                      onAddClose();
                      updateProduk();
                      console.log(newStatusId);
                      window.location.reload();
                      
                      }}
                  >Edit</Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
          </Modal>

          <Modal size="lg" closeOnOverlayClick={true} isOpen={isAddOpen} onClose={onAddClose}>
              <ModalOverlay/>
              <ModalContent>
                <ModalHeader>Tambah Produk</ModalHeader>
                <ModalBody>
                  <Stack spacing={3}>
                  <Input 
                    placeholder='Nama Produk' 
                    value={ newNamaProduk } 
                    onChange={
                    (e) => setNewNamaProduk(e.target.value)
                  }/>
                  <NumberInput step={500} defaultValue={0} min={0} max={2000000}
                     
                  >
                    <NumberInputField value={ newHarga }
                      onChange={
                      (e) => setNewHarga(e.target.value)
                      }/>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Select px="12px" py="12px" placeholder='All' height='36px' width='auto' value={newKategoriId} onChange={(e) => setNewKategoriId(e.target.value)}>
                    {/* {dataKategori?.map((dataKategori: any) => {
                      return (
                        <option key={dataKategori.id_kategori} value={dataKategori.id_kategori}
                        >value={dataKategori.id_kategori} {dataKategori.nama_kategori}</option> 
                      )     
                    })} */}
                    <option value="1">L QUEENLY</option>
                    <option value="2">L MTH AKSESORIS (IM)</option>
                    <option value="3">CI MTH TINTA LAIN (IM)</option>
                    <option value="4">S MTH STEMPEL (IM)</option>
                    <option value="5">L MTH TABUNG (LK)</option>
                    <option value="6">SP MTH SPAREPART (LK)</option>
                    <option value="7">L MTH AKSESORIS (LK)</option>
                  </Select>
                  <Checkbox py={5} onChange={(e) => setNewStatusId(e.target.checked?1:0)}>Bisa Dijual</Checkbox>
                  <Button
                    onClick={() => {
                      
                      onAddClose();
                      addProduk();
                      console.log(newStatusId);
                      
                      }}
                  >Tambah Produk</Button>
                  </Stack>
                </ModalBody>
              </ModalContent>
          </Modal>

          <Modal size="lg" closeOnOverlayClick={true} isOpen={isDeleteOpen} onClose={onDeleteClose}>
              <ModalOverlay/>
              <ModalContent>
                <ModalHeader>Hapus Produk</ModalHeader>
                <ModalBody>
                  <text>Apakah anda yakin ingin menghapus produk ini?</text>
                  <Stack spacing={4} direction='row' align='center'>
                  <Button colorScheme="red" onClick={()=>{
                    deleteProduk(idProduk);
                    onDeleteClose();
                    }}>
                    Hapus
                  </Button>
                    <Button colorScheme='blue' onClick={()=>{
                    onDeleteClose();
                    }}>
                      Batal
                    </Button>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  
                  
                </ModalFooter>
              </ModalContent>
          </Modal>
        </div>
        
        
      )

}