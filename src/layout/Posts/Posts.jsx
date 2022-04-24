import { useState, useEffect } from "react";
import Table from '../../components/Table/Table';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios } from './../../api/api';
import { createTableData } from './../../utils/common';
import { postColumns } from './../../config/config';
import { useNavigate } from 'react-router-dom';
import './Posts.scss'

function handleNewClick(navigate) {
  navigate('/post/new')
}

function handleTableRowClick(navigate, row) {
  navigate(`/post/${row.id}`)
  console.log('asfas', row)
}

export default function Posts() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAxios('/post').then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      let compiledRows = results.map(result => {
        return createTableData(result, postColumns)
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
    <LayoutHeader title={"Posts"} btnTitle={"Add New"} onClick={handleNewClick.bind(this, navigate)} />
    <div className="wd-layout-main">
      <Table title={'Posts'} rows={rows} columns={postColumns} handleTableRowClick={handleTableRowClick.bind(this, navigate)} />
    </div>
  </div>
}
