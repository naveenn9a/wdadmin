import { useState, useEffect } from "react";
import Table from '../../components/Table/Table';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios } from './../../api/api';
import { createTableData } from './../../utils/common';
import { productColumns } from './../../config/config';
import { useNavigate } from 'react-router-dom'; 

function handleNewClick(navigate) {
  navigate('/products/new')
}

function handleTableRowClick(navigate, row) {
  navigate(`/products/${row.id}`)
  console.log('asfas', row)
}

export default function Products() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAxios('/product?limit=50').then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      let compiledRows = results.map(result => {
        return createTableData(result, productColumns)
      });

      setRows(compiledRows);

    }).catch(erro => {
      if (erro.response.status == 401) {
        localStorage.removeItem('token');
        navigate('/login')
      }
    })
  }, [])

  return <div className="wd-products-main wd-layout">
    <LayoutHeader title={"Products"} btnTitle={"Add New"} onClick={handleNewClick.bind(this, navigate)} />
    <div className="wd-layout-main">
      <Table title={'Products'} rows={rows} columns={productColumns} handleTableRowClick={handleTableRowClick.bind(this, navigate)}/>
    </div>
  </div>
}
