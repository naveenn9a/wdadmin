import React, { useState, useEffect } from "react";
import { getAxios, postAxios, patchAxios, deleteAxios } from './../../api/api';
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import TextField from '@mui/material/TextField';
import WDButton from "../../components/WDButton/WDButton";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { snackBar } from './../../services/general'

export default function Tags() {

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isLoading, toggleLoading] = React.useState(false);

  useEffect(() => {
    getAxios(`/tag`).then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      setTags(results);
    }).catch(erro => [
      console.log('err', erro)
    ])
  }, [])

  const handleNewTag = (e) => {
    setNewTag(e.target.value)
  };
  
  const handleDelete = (e) => {
    deleteAxios(`/tag/${e.id}`).then(response => {
      setTags(tags.filter(lt => lt.id != e.id));
      snackBar.next({ message: 'Deleted - ' + e.name, severity: 'error', open: true });
    }).catch(({ response }) => {
      toggleLoading(false)
      snackBar.next({ message: response.data.message, severity: 'error', open: true });
    })
  };

  const handleNewAdd = (e) => {

    toggleLoading(true)
    let finalObj = { name: newTag };

    setTimeout(() => {
      postAxios('/tag', finalObj).then(response => {
        console.log('=sfs', response.data)
        let { results, page, limit, totalPages, totalResults } = response;
        snackBar.next({ message: 'Successfully saved.', severity: 'success', open: true });
        setTags([...tags, response.data])
        toggleLoading(false)
        setNewTag("")
      }).catch(response => {
        toggleLoading(false)
        if(response?.data?.message)
          snackBar.next({ message: response?.data?.message || response.message, severity: 'error', open: true });
        else
          snackBar.next({ message: response.message, severity: 'error', open: true });
      })
    }, 1000);

  };

  return <div className="wd-products-main wd-layout">
    <LayoutHeader title={"Tags"} />

    <div className="wd-layout-main wd-tags-form-main">
      <Stack className="mt-16" sx={{ alignItems: 'center' }} spacing={2} direction={"row"}>
        <TextField
          id="type"
          name="type"
          variant="outlined"
          value={newTag}
          onChange={handleNewTag}
          label="New Tag"
        />
        <WDButton loading={isLoading} style={{ width: '100%' }} onClick={handleNewAdd} title={"Add"} />
      </Stack>
      <Stack className="mt-16" direction="row" spacing={2}>
        {tags.map(tag => <Chip onDelete={() => { handleDelete(tag) }} className="wd-chip" key={tag.id} label={tag.name}>{tag.name}</Chip>)}
      </Stack>
    </div>
  </div>
}
