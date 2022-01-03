import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Table from '../../components/Table/Table';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios } from './../../api/api'
const columns = ['name', 'email', 'role']

function createData(result) {
  return columns.reduce((a, c) => { return { ...a, [c]: result[c] } }, {});
}

export default function Users() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAxios('/users').then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      console.log('safas', results)
      let compiledRows = results.map(result => {
        return createData(result)
      });

      setRows(compiledRows);

    }).catch(erro => [
      console.log('err', erro)
    ])
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
