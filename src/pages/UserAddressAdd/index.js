import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputText, LayoutOne, Textarea } from 'upkit';
import SelectWilayah from '../../components/SelectWilayah';
import TopBar from '../../components/TopBar';
import { rules } from './validation';
import { createAddress } from './../../api/delivery-address';

export default function UserAddressAdd() {
  let navigate = useNavigate();
  let {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm();
  let fields = watch();

  React.useEffect(() => {
    register('provinsi', rules.provinsi);
    register('kabupaten', rules.kabupaten);
    register('kecamatan', rules.kecamatan);
    register('kelurahan', rules.kelurahan);
  }, [register]);

  React.useEffect(() => {
    setValue('kabupaten', null);
    setValue('kecamatan', null);
    setValue('kelurahan', null);
  }, [fields.provinsi, setValue]);

  React.useEffect(() => {
    setValue('kecamatan', null);
    setValue('kelurahan', null);
  }, [fields.kabupaten, setValue]);

  React.useEffect(() => {
    setValue('kelurahan', null);
  }, [fields.kecamatan, setValue]);

  const updateValue = (field, value) => setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (formData) => {
    let payload = {
      nama: formData.nama_alamat,
      detail: formData.detail_alamat,
      provinsi: formData.provinsi.label,
      kabupaten: formData.kabupaten.label,
      kecamatan: formData.kecamatan.label,
      kelurahan: formData.kelurahan.label,
    };

    let { data } = await createAddress(payload);

    if (data.error) return;

    navigate('/delivery-address');
  };

  return (
    <LayoutOne>
      <TopBar />
      <br />

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl label="Nama Alamat" errorMessage={errors.name?.message} color="black">
            <InputText placeholder="Nama Alamat" fitContainer name="name_alamat" {...register('nama_alamat', rules.nama_alamat)} />
          </FormControl>
          <FormControl label="Provinsi" errorMessage={errors.provinsi?.message} color="black">
            <SelectWilayah onChange={(option) => updateValue('provinsi', option)} name="provinsi" value={getValues().provinsi} />
          </FormControl>
          <FormControl label="Kabupaten/kota" errorMessage={errors.kabupaten?.message} color="black">
            <SelectWilayah tingkat="kabupaten" kodeInduk={getValues().provinsi?.value} onChange={(option) => updateValue('kabupaten', option)} value={getValues().kabupaten} />
          </FormControl>
          <FormControl label="Kecamatan" errorMessage={errors.kecamatan?.message} color="black">
            <SelectWilayah tingkat="kecamatan" kodeInduk={getValues().kabupaten?.value} onChange={(option) => updateValue('kecamatan', option)} value={getValues().kecamatan} />
          </FormControl>
          <FormControl label="Kelurahan" errorMessage={errors.kelurahan?.message} color="black">
            <SelectWilayah tingkat="desa" kodeInduk={getValues().kecamatan?.value} onChange={(option) => updateValue('kelurahan', option)} value={getValues().kelurahan} />
          </FormControl>
          <FormControl label="Detail alamat" errorMessage={errors.detail_alamat?.message} color="black">
            <Textarea placeholder="Detail alamat" fitContainer name="detail_alamat" {...register('detail_alamat', rules.detail_alamat)} />
          </FormControl>
          <Button fitContainer>Simpan</Button>
        </form>
      </div>
    </LayoutOne>
  );
}
