import React, { useState, useEffect } from "react";
import { getAxios, postAxios, patchAxios, deleteAxios } from './../../api/api';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import TextField from '@mui/material/TextField';
import WDButton from "../../components/WDButton/WDButton";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { snackBar } from './../../services/general'
import { useNavigate } from 'react-router-dom'; 

export default function Category() {

  const [categorys, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, toggleLoading] = React.useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getAxios(`/category`).then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      setCategories(results);
    }).catch(erro => [
      console.log('err', erro)
    ])
  }, [])

  const handleNewCategory = (e) => {
    setNewCategory(e.target.value)
  };

  const handleDelete = (e) => {
    deleteAxios(`/category/${e.id}`).then(response => {
      setCategories(categorys.filter(lt => lt.id != e.id));
      snackBar.next({ message: 'Deleted - ' + e.name, severity: 'error', open: true });
    }).catch(({ response }) => {
      toggleLoading(false)
      snackBar.next({ message: response.data.message, severity: 'error', open: true });
    })
  };

  const handleNewAdd = (e) => {

    toggleLoading(true)
    let finalObj = { name: newCategory };

    setTimeout(() => {
      postAxios('/category', finalObj).then(response => {
        console.log('=sfs', response.data)
        let { results, page, limit, totalPages, totalResults } = response;
        snackBar.next({ message: 'Successfully saved.', severity: 'success', open: true });
        setCategories([...categorys, response.data])
        toggleLoading(false)
        setNewCategory("")
      }).catch(response => {
        if (response.response.status == 401) {
          localStorage.removeItem('token');
          navigate('/login')
        }

        toggleLoading(false)
        if (response?.data?.message)
          snackBar.next({ message: response?.data?.message || response.message, severity: 'error', open: true });
        else
          snackBar.next({ message: response.message, severity: 'error', open: true });


      })
    }, 1000);

  };

  return <div className="wd-products-main wd-layout">
    <LayoutHeader title={"Categories"} />
    <div className="wd-layout-main wd-categorys-form-main">
      <Stack className="mt-16" sx={{ alignItems: 'center' }} spacing={2} direction={"row"}>
        <TextField
          id="type"
          name="type"
          variant="outlined"
          value={newCategory}
          onChange={handleNewCategory}
          label="New Category"
        />
        <WDButton loading={isLoading} style={{ width: '100%' }} onClick={handleNewAdd} title={"Add"} />
      </Stack>
      <Stack className="mt-16" direction="row" spacing={2}>
        {categorys.map(category => <Chip onDelete={() => { handleDelete(category) }} className="wd-chip" key={category.id} label={category.name}>{category.name}</Chip>)}
      </Stack>
    </div>
  </div>
}
