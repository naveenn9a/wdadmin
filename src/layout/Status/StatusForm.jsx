import React, { useState, useEffect, useRef, useCallback } from "react";
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios, postAxios, patchAxios } from './../../api/api';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormControl } from '@mui/material';
import WDDropdown from "../../components/WDDropdown/WDDropdown";
import WDButton from "../../components/WDButton/WDButton";
import slugify from "slugify";
import { specsUpdate, snackBar } from './../../services/general'
import _ from "lodash"
import './Status.scss'

export default function PostForm() {
  const { statusId } = useParams();
  console.log('asfasf', statusId);
  const [isEditMode, enableEditMode] = React.useState(statusId ? true : false);
  const [isLoading, toggleLoading] = React.useState(false);
  const [newStatus, setStatusData] = React.useState({ text: '', likes: 0, copy: 0, language: '' });

  useEffect(() => {
    if (statusId) {
      getAxios(`/status/${statusId}`).then(response => {
        let { text, likes, copy, language } = response.data;
        console.log('asfas', response.data);
        setStatusData({ text, likes, copy, language });
      }).catch(erro => [
        console.log('err', erro)
      ])
    }
  }, [])

  const handleFormInput = (event) => {
    if (event.target.name === 'title') {
      setStatusData({ ...newStatus, slug: slugify(event.target.value, { strict: true }), title: event.target.value })
    } else {
      setStatusData({ ...newStatus, [event.target.name]: event.target.value })
    }
  }

  const handleSubmitProduct = () => {
    let finalObj = { ...newStatus };

    console.log('casgfas', finalObj);
    setTimeout(() => {
      if (isEditMode) {
        patchAxios(`/status/${statusId}`, finalObj).then(response => {
          snackBar.next({ message: 'Successfully updated.', severity: 'success', open: true });
          toggleLoading(false)
        }).catch(({ response }) => {
          toggleLoading(false)
          // alert(response.data.message)
          snackBar.next({ message: response.data.message, severity: 'error', open: true });
        })
      } else {
        postAxios('/status', finalObj).then(response => {
          snackBar.next({ message: 'Successfully saved. ' + response.data.id, severity: 'success', open: true });
          toggleLoading(false)
        }).catch(({ response }) => {
          toggleLoading(false)
          // alert(response.data.message)
          snackBar.next({ message: response.data.message, severity: 'error', open: true });
        })
      }
    }, 1000);
  }

  return <div className="wd-posts-main wd-layout">
    <LayoutHeader title={"Add a new post"} />
    <div className="wd-layout-main wd-posts-form-main">
      <FormControl fullWidth={true} >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={0} className="wd-paper" >
              <TextField
                id="text"
                name="text"
                label="Text"
                value={newStatus.text}
                variant="outlined"
                style={{ width: '100%' }}
                onChange={handleFormInput}
                margin="normal"
              />
              <TextField
                label="Likes"
                name="likes"
                type={"number"}
                value={newStatus.likes}
                style={{ width: '100%' }}
                margin="normal"
                onChange={handleFormInput}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Copies"
                type={"number"}
                value={newStatus.copy}
                name="copy"
                onChange={handleFormInput}
                style={{ width: '100%' }}
                margin="normal"
              />
              <TextField
                id="language"
                name="language"
                label="Language"
                value={newStatus.language}
                variant="outlined"
                style={{ width: '100%' }}
                onChange={handleFormInput}
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} className="wd-paper">
              {/* <WDDropdown  menuItems={tags} title={"Tags"} /> */}
              {/* <WDDropdowntitle={"Category"} /> */}
            </Paper>
            <Paper elevation={0} style={{ padding: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <WDButton loading={isLoading} style={{ width: '100%', height: '50px' }} title={isEditMode ? "Update" : "Submit"} onClick={handleSubmitProduct} variant="outlined"></WDButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  </div>
}
