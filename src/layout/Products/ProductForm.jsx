import React, { useState, useEffect } from "react";
import LayoutHeader from '../../components/LayoutHeader/LayoutHeader';
import { getAxios, postAxios, patchAxios } from './../../api/api';
import { ql_modules } from './../../config/config';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import './Products.scss'
import { FormControl } from '@mui/material';
import 'react-quill/dist/quill.snow.css'; // ES6
import WDDropdown from "../../components/WDDropdown/WDDropdown";
import WDButton from "../../components/WDButton/WDButton";
import Specs from "./Specs";
import slugify from "slugify";
import { specsUpdate, snackBar } from './../../services/general'
import ReactQuill, { Quill } from 'react-quill'; // CommonJS
const names = [
  'Oliver Hansen',
  'Van Henry',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function Products() {
  const { productId } = useParams();
  const [isEditMode, enableEditMode] = React.useState(productId ? true : false);
  const [isLoading, toggleLoading] = React.useState(false);
  const [selectedCategories, setSelectedCategory] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [qlContent, setQLContent] = React.useState("");
  const [productImage, setProductImage] = React.useState("");
  const [allSpecs, setSpecs] = useState([]);
  const [specEnabled, toggleSpecs] = React.useState(false);
  const qlRef = React.useRef();
  const [newProduct, setProductData] = React.useState({ slug: '', name: '', description: '', price: '', shortDescription: '' });


  useEffect(() => {
    specsUpdate.subscribe(specs => {
      setSpecs(specs);
    })

    if (productId) {
      getAxios(`/product/${productId}`).then(response => {
        let { category, slug, name, description, shortDescription, price, image, content, tags, specs, specEnabled } = response.data;
        setProductImage(image || "");
        setProductData({ name, slug, description, shortDescription, price });
        setSpecs(specs || []);
        toggleSpecs(specEnabled || false);
        qlRef.current.editor?.setContents(content)
        setQLContent(qlRef.current.editor?.getContents());

        getCategoryTags(category, tags);
      }).catch(erro => [
        console.log('err', erro)
      ])
    }

    getCategoryTags([], []);

  }, [])

  const handleFormInput = (event) => {
    if (event.target.name === 'name') {
      setProductData({ ...newProduct, slug: slugify(event.target.value, { strict: true }), name: event.target.value })
    } else {
      setProductData({ ...newProduct, [event.target.name]: event.target.value })
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

  const handleImage = ({ target }) => {
    const fileReader = new FileReader();
    const name = target.accept.includes('image') ? 'images' : 'videos';

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      setProductImage(e.target.result)
    };
  };

  const handleSubmitProduct = (isSaveAsNew = false) => {
    toggleLoading(true)
    let finalObj = { ...newProduct };


    finalObj.image = productImage;
    finalObj.tags = selectedTags;
    finalObj.category = selectedCategories;
    finalObj.content = qlRef.current.editor.getContents();
    finalObj.specEnabled = specEnabled;
    finalObj.specs = allSpecs;

    setTimeout(() => {
      if (isEditMode && !isSaveAsNew) {
        patchAxios(`/product/${productId}`, finalObj).then(response => {
          snackBar.next({ message: 'Successfully updated.', severity: 'success', open: true });
          toggleLoading(false)
        }).catch(({ response }) => {
          toggleLoading(false)
          // alert(response.data.message)
          snackBar.next({ message: response.data.message, severity: 'error', open: true });
        })
      } else {
        postAxios('/product', finalObj).then(response => {
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

  const handleQuillContent = (a, b, c, d, e) => {
    setQLContent(a)
  }

  return <div className="wd-products-main wd-layout">
    <LayoutHeader title={"Add a new product"} />
    <div className="wd-layout-main wd-products-form-main">
      <FormControl fullWidth={true} >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={0} className="wd-paper" >
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={newProduct.name}
                style={{ width: '100%' }}
                onChange={handleFormInput}
                margin="normal"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                name="description"
                value={newProduct.description}
                onChange={handleFormInput}
                minRows={2}
                style={{ width: '100%' }}
                margin="normal"
              />
              <div className="wd-product-content">
                <Typography className="wd-text-dim" variant="h6" component="p">Content</Typography>
                <ReactQuill ref={qlRef} value={qlContent} onChange={handleQuillContent} modules={ql_modules} />
              </div>
              <TextField
                label="Slug"
                name="slug"
                style={{ width: '100%' }}
                margin="normal"
                onChange={handleFormInput}
                value={newProduct.slug}
              />
              <div className="wd-product-image mt-16">
                <Typography className="wd-text-dim" variant="h6" component="p">Image</Typography>
                <Paper elevation={0} className="wd-paper">
                  <div className="wd-product-image-container">
                    {productImage && <img className="wd-product-img" src={productImage} alt="" />}
                    {!productImage && <Box sx={{
                      width: '100%',
                      height: 300,
                      backgroundColor: 'primary.dark'
                    }} />}
                  </div>
                  <div className="wd-upload-img mt-16">
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={handleImage}
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="outlined" component="span">
                        Upload an image
                      </Button>
                    </label>
                  </div>
                </Paper>
              </div>
              <div className="wd-specs mt-16">
                <div className="wd-specs-header">
                  <Typography className="wd-text-dim" variant="h6" component="p">Specs</Typography>
                  <Switch
                    checked={specEnabled}
                    onChange={() => { toggleSpecs(!specEnabled) }}
                  />
                </div>
                <div className="wd-specs-container">
                  {specEnabled && <Specs specs={allSpecs} />}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} className="wd-paper">
              <WDDropdown selectedItems={selectedTags} handleChange={(e, data) => { setSelectedTags(data) }} menuItems={tags} title={"Tags"} />
              <WDDropdown selectedItems={selectedCategories} handleChange={(e, data) => setSelectedCategory(data)} menuItems={categories} title={"Category"} />
              <TextField
                label="Short Description"
                style={{ width: '100%' }}
                margin="normal"
                multiline
                value={newProduct.shortDescription}
                minRows={2}
                name="shortDescription"
                onChange={handleFormInput}
              />
              <TextField
                label="Price"
                name="price"
                value={newProduct.price}
                style={{ width: '100%' }}
                onChange={handleFormInput}
                margin="normal"
              />
            </Paper>
            <Paper elevation={0} style={{ padding: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <WDButton style={{ width: '100%', height: '50px', backgroundColor: 'white', color: "#333" }} onClick={handlePreview} disableElevation title={"Preview"}></WDButton>
                </Grid>
                <Grid item xs={6}>
                  <WDButton loading={isLoading} style={{ width: '100%', height: '50px' }} title={isEditMode ? "Update" : "Submit"} onClick={handleSubmitProduct} variant="outlined"></WDButton>
                </Grid>
                {isEditMode && <Grid item xs={6}>
                  <WDButton loading={isLoading} style={{ width: '100%', height: '50px' }} title={"Save as new"} onClick={e => handleSubmitProduct(true)} variant="outlined"></WDButton>
                </Grid>}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  </div>
}
