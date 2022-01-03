export const API = "http://localhost:9000/v1";
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWM4YmExYzcyYzc5MzJmNDA2NjJjYzQiLCJpYXQiOjE2NDA3MTIyMDYsImV4cCI6MTY3MjI2OTgwNiwidHlwZSI6ImFjY2VzcyJ9.iqTyQC3125J5w3awzTRPr6ZAlFnm49k4WdJTukJrZ0I";




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