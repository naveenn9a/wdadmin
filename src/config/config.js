export const API = "http://api.webdecrypted.com/v1";
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWM4YmExYzcyYzc5MzJmNDA2NjJjYzQiLCJpYXQiOjE2NTA3MjQ4MTEsImV4cCI6MTY1MDcyNjYxMSwidHlwZSI6ImFjY2VzcyJ9.u3eS-Wv077nFkh02ddMBKT1VwaeRcdnHJlp7LM1o2QM";


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