import React from 'react';
import { Link } from 'react-router-dom';
import { Button, LayoutOne, Table, Text } from 'upkit';
import TopBar from '../../components/TopBar';
import { useAddressData } from './../../hooks/delivery-address';

export default function UserAddress() {
  let { data, limit, page, status, count, setPage } = useAddressData();

  const columns = [
    { Header: 'Nama', accessor: 'nama' },
    {
      Header: 'Detail',
      accessor: (alamat) => {
        return (
          <div>
            {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{alamat.kelurahan} <br />
            {alamat.detail}
          </div>
        );
      },
    },
  ];

  return (
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text as="h3">Alamat Pengiriman Saya</Text>
        <br />
        <div>
          <Link to="/delivery-address/create">
            <Button>Tambah baru</Button>
          </Link>
          <br />
          <br />
          <Table items={data} columns={columns} totalItems={count} page={page} isLoading={status === 'process'} perPage={limit} onPageChange={(page) => setPage(page)} />
        </div>

        {status === 'success' && !data.length ? (
          <div className="textcenter p-10">
            Kamu belum menambahkan alamat pengiriman. <br />
            <Link to="/delivery-address/create">
              <Button> Tambah Baru </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </LayoutOne>
  );
}
