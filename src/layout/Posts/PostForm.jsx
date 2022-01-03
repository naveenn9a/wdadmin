import React, { useState, useEffect, useRef, useCallback } from "react";
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios, postAxios, patchAxios } from './../../api/api';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import './Posts.scss'
import { FormControl } from '@mui/material';
import WDDropdown from "../../components/WDDropdown/WDDropdown";
import WDButton from "../../components/WDButton/WDButton";
import slugify from "slugify";
import { specsUpdate, snackBar } from './../../services/general'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import _ from "lodash"
import './Posts.scss'

export default function PostForm() {
  const { postId } = useParams();
  const [isEditMode, enableEditMode] = React.useState(postId ? true : false);
  const [isLoading, toggleLoading] = React.useState(false);
  const [selectedCategories, setSelectedCategory] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [isLoadingProducts, toggleProductsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(null);
  const [newPost, setPostData] = React.useState({ slug: '', title: '', description: '' });


  function useDebounce(cb, delay) {
    const options = {
      leading: false,
      trailing: true
    };

    const inputsRef = useRef({ cb, delay }); // mutable ref like with useThrottle
    useEffect(() => { inputsRef.current = { cb, delay }; }); //also track cur. delay
    return useCallback(
      _.debounce((...args) => {
        // Debounce is an async callback. Cancel it, if in the meanwhile
        // (1) component has been unmounted (see isMounted in snippet)
        // (2) delay has changed
        if (inputsRef.current.delay === delay)
          inputsRef.current.cb(...args);
      }, delay, options
      ),
      [delay, _.debounce]
    );
  }

  useEffect(() => {
    toggleProductsLoading(true);

    if (postId) {
      getAxios(`/post/${postId}`).then(response => {
        let { category, slug, title, tags, description, shortDescription, products, publishedDate } = response.data;
        console.log("PPPOST", response.data)
        setSelectedProducts(products || []);
        setPostData({ title, slug, description });
        getCategoryTags(category, tags);
        setDateValue(publishedDate)
      }).catch(erro => [
        console.log('err', erro)
      ])
    }

    getAxios(`/product`).then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      setProducts(results);
      toggleProductsLoading(false);
    }).catch(erro => {
      console.log('err', erro)
      toggleProductsLoading(false);
    })

    getCategoryTags([], []);
  }, [])

  const handleFormInput = (event) => {
    if (event.target.name === 'title') {
      setPostData({ ...newPost, slug: slugify(event.target.value, { strict: true }), title: event.target.value })
    } else {
      setPostData({ ...newPost, [event.target.name]: event.target.value })
    }
  }

  const getCategoryTags = (catResp, tagResp) => {
    getAxios('/tag').then(response => {
      let tagIds = tagResp.map(c => c.id)
      let { results, page, limit, totalPages, totalResults } = response.data;
      setTags(results);
      setSelectedTags(results.filter(c => tagIds.includes(c.id)));
    }).catch(erro => [
      console.log('err', erro)
    ])

    getAxios('/category').then(response => {
      let categoryIds = catResp.map(c => c.id)
      let { results, page, limit, totalPages, totalResults } = response.data;
      setCategories(results);
      setSelectedCategory(results.filter(c => categoryIds.includes(c.id)));
    }).catch(erro => [
      console.log('err', erro)
    ])
  }

  const handleSubmitProduct = () => {
    toggleLoading(true)
    let finalObj = { ...newPost };

    finalObj.tags = selectedTags;
    finalObj.category = selectedCategories;
    finalObj.products = selectedProducts.map(p => { return {_id: p.id, ...p}});
    finalObj.publishedDate = dateValue;

    console.log(finalObj);
    setTimeout(() => {
      if (isEditMode) {
        patchAxios(`/post/${postId}`, finalObj).then(response => {
          snackBar.next({ message: 'Successfully updated.', severity: 'success', open: true });
          toggleLoading(false)
        }).catch(({ response }) => {
          toggleLoading(false)
          // alert(response.data.message)
          snackBar.next({ message: response.data.message, severity: 'error', open: true });
        })
      } else {
        postAxios('/post', finalObj).then(response => {
          snackBar.next({ message: 'Successfully saved.', severity: 'success', open: true });
          toggleLoading(false)
        }).catch(({ response }) => {
          toggleLoading(false)
          // alert(response.data.message)
          snackBar.next({ message: response.data.message, severity: 'error', open: true });
        })
      }
    }, 1000);
  }

  const handlePreview = () => {
    alert('prev')
  }


  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };


  const handleSearchProducts = (e) => {
    toggleProductsLoading(true);
    getAxios(`/product?name=${e.target.value}`).then(response => {
      let { results, page, limit, totalPages, totalResults } = response.data;
      setProducts(results);
      toggleProductsLoading(false);
    }).catch(erro => {
      console.log('err', erro)
      toggleProductsLoading(false);
    })
  };

  const handleSearchDebouce = useDebounce(handleSearchProducts, 300);

  return <div className="wd-posts-main wd-layout">
    <LayoutHeader title={"Add a new post"} />
    <div className="wd-layout-main wd-posts-form-main">
      <FormControl fullWidth={true} >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={0} className="wd-paper" >
              <TextField
                id="title"
                name="title"
                label="Title"
                value={newPost.title}
                variant="outlined"
                style={{ width: '100%' }}
                onChange={handleFormInput}
                margin="normal"
              />
              <TextField
                label="Slug"
                name="slug"
                value={newPost.slug}
                style={{ width: '100%' }}
                margin="normal"
                onChange={handleFormInput}
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                value={newPost.description}
                name="description"
                onChange={handleFormInput}
                minRows={2}
                style={{ width: '100%' }}
                margin="normal"
              />
              <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                renderOption={(props, option) => (
                  <Box {...props} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography component="p" variant="h6">{option.name}</Typography>
                    <p>{option.description}</p>
                  </Box>
                )}
                style={{ width: '100%' }}
                getOptionLabel={(option) => option.name}
                value={searchValue}
                options={products}
                loading={isLoadingProducts}
                onChange={(a, b) => { setSearchValue(null); if (b) setSelectedProducts([...selectedProducts, b]); }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    style={{ width: '100%' }}
                    label="Products"
                    onChange={handleSearchDebouce}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {isLoadingProducts ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <div className="wd-post-products mt-16">
                <Stack spacing={1}>
                  {selectedProducts.map((product, idx) => {
                    return <div className="wd-product" key={product.slug}>
                      <NavLink key={product.slug} to={`/products/${product.id}`} className={`wd-admin-link`}>
                        <Typography component="p" variant="h6">{product.name}</Typography>
                      </NavLink>
                      <p>{product.description}</p>
                      <div className="wd-product-count">{idx + 1}</div>
                      <div className="wd-product-delete" onClick={() => { setSelectedProducts(selectedProducts.filter(p => p.id != product.id)) }}><DeleteIcon /></div>
                    </div>
                  })}
                </Stack>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} className="wd-paper">
              <WDDropdown selectedItems={selectedTags} handleChange={(e, data) => { setSelectedTags(data) }} menuItems={tags} title={"Tags"} />
              <WDDropdown selectedItems={selectedCategories} handleChange={(e, data) => setSelectedCategory(data)} menuItems={categories} title={"Category"} />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  onChange={handleDateChange}
                  value={dateValue}
                  renderInput={(params) => <TextField margin="normal" style={{ width: '100%' }} {...params} />}
                />
              </LocalizationProvider>
            </Paper>
            <Paper elevation={0} style={{ padding: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <WDButton style={{ width: '100%', height: '50px', backgroundColor: 'white', color: "#333" }} onClick={handlePreview} disableElevation title={"Preview"}></WDButton>
                </Grid>
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
