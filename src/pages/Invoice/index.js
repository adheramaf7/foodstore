import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, LayoutOne, Table, Text } from 'upkit';
import { getInvoiceByOrderId } from '../../api/order';
import TopBar from '../../components/TopBar';
import StatusLabel from '../../components/StatusLabel';
import BounceLoader from 'react-spinners/BounceLoader';
import { config } from '../../config';
import { formatRupiah } from '../../utils/format-rupiah';
import axios from 'axios';

export default function Invoice() {
  let [invoice, setInvoice] = React.useState(null);
  let [error, setError] = React.useState('');
  let [status, setStatus] = React.useState('process');

  let [initiatingPayment, setInitiating] = React.useState(false);
  let [requestError, setRequestError] = React.useState(false);

  let params = useParams();

  React.useEffect(() => {
    getInvoiceByOrderId(params?.order_id)
      .then(({ data }) => {
        // (1) cek apakah ada error
        if (data?.error) {
          setError(data.message || 'Terjadi kesalahan yang tidak diketahui');
        }

        setInvoice(data);
      })
      .finally(() => setStatus('idle'));
  }, [params?.order_id]);

  React.useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-E4zlYjBZbNpaA4Ax';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  let handlePayment = async function () {
    setInitiating(true);
    let {
      data: { token },
    } = await axios.get(`${config.api_host}/api/invoices/${params?.order_id}/initiate-payment`);

    if (!token) {
      setRequestError(true);
      return;
    }

    setInitiating(false);
    window.snap.pay(token);
  };

  if (error.length) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
        {error}
      </LayoutOne>
    );
  }

  if (status === 'process') {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Invoice </Text>
      <br />
      <Table
        showPagination={false}
        columns={[
          { Header: 'Invoice', accessor: 'label' },
          { Header: '', accessor: 'value' },
        ]}
        items={[
          { label: 'Status', value: <StatusLabel status={invoice?.payment_status} /> },
          { label: 'Order ID', value: '#' + invoice?.order?.order_number },
          { label: 'Total amount', value: formatRupiah(invoice?.total) },
          {
            label: 'Billed to',
            value: (
              <div>
                <b>{invoice?.user?.full_name} </b> <br />
                {invoice?.user?.email} <br /> <br />
                {invoice?.delivery_address?.detail} <br />
                {invoice?.delivery_address?.kelurahan},{invoice?.delivery_address?.kecamatan} <br />
                {invoice?.delivery_address?.kabupaten} <br />
                {invoice?.delivery_address?.provinsi}
              </div>
            ),
          },
          {
            label: 'Payment to',
            value: (
              <div>
                {config.owner} <br />
                {config.contact} <br />
                {config.billing.account_no} <br />
                {config.billing.bank_name}
              </div>
            ),
          },
        ]}></Table>

      <br />
      {invoice.payment_status !== 'paid' ? (
        <Button onClick={handlePayment} disabled={initiatingPayment}>
          {' '}
          {initiatingPayment ? 'Loading ... ' : 'Bayar dengan Midtrans'}
        </Button>
      ) : null}
    </LayoutOne>
  );
}
