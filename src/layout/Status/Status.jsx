import { useState, useEffect } from "react";
import Table from '../../components/Table/Table';
import TablePagination from '@mui/material/TablePagination';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios } from '../../api/api';
import { createTableData } from '../../utils/common';
import { statusColumns } from '../../config/config';
import { useNavigate } from 'react-router-dom';
import './Status.scss'

function handleNewClick(navigate) {
  navigate('/status/new')
}

function handleTableRowClick(navigate, row) {
  navigate(`/status/${row.id}`)
}

export default function Status() {
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ rowsPerPage: 100 });
  const navigate = useNavigate()

  const fetchData = (iPage = undefined) => {
    getAxios(`/status?limit=100&page=${iPage}`).then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;

      setPagination({ rowsPerPage: 100, page: page - 1, limit, totalPages, totalResults  })
      let compiledRows = results.map(result => {
        return createTableData(result, statusColumns)
      });

      setRows(compiledRows);
    }).catch(erro => {
      if (erro.response.status == 401) {
        localStorage.removeItem('token');
        navigate('/login')
      }
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleChangePage = (event, newPage) => {
    fetchData(newPage + 1);
    setPagination(prev => {
      return { ...prev, page: newPage }
    })
  };


  return <div className="wd-products-main wd-layout">
    <LayoutHeader title={"Status"} btnTitle={"Add New"} onClick={handleNewClick.bind(this, navigate)} />
    <div className="wd-layout-main">
      <Table title={'Status'} rows={rows} columns={statusColumns} handleTableRowClick={handleTableRowClick.bind(this, navigate)} />
      <TablePagination
          rowsPerPageOptions={false}
          component="div"
          count={pagination.totalResults}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={handleChangePage}
        />
    </div>
  </div>
}
