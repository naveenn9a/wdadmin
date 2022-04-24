import { useState, useEffect } from "react";
import Table from '../../components/Table/Table';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios } from './../../api/api'
import { useNavigate } from 'react-router-dom'; 
const columns = ['name', 'email', 'role']

function createData(result) {
  return columns.reduce((a, c) => { return { ...a, [c]: result[c] } }, {});
}

export default function Users() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAxios('/users').then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      console.log('safas', results)
      let compiledRows = results.map(result => {
        return createData(result)
      });

      setRows(compiledRows);

    }).catch(erro => {
      if (erro.response.status == 401) {
        localStorage.removeItem('token');
        navigate('/login')
      }
    })
  }, [])

  function handleNew () {
    alert()
  }

  return <div className="wd-users-main wd-layout">
    <LayoutHeader title={"Users"} btnTitle={"Add New"} handleNew={handleNew}/>
    <div className="wd-layout-main">
      <Table title={'Users'} rows={rows} columns={columns} />
    </div>
  </div>
}
