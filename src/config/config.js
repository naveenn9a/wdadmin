export const API = process.env.REACT_APP_API_URL;

// columns
export const productColumns = ['id', 'name', 'slug', 'shortDescription', 'description']
export const postColumns = ['id', 'title', 'slug', 'description', 'content']

// quill
export const ql_modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
}