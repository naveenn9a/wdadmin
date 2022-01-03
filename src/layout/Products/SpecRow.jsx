import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SpecRow({ spec, idx, handleDelete, onChangeRow }) {

  return <div className="wd-admin-specrow mt-16">
    <Stack className="mt-16" sx={{ width: '100%' }} spacing={2} direction={"row"}>
      <TextField
        id="type"
        label="Type"
        autoFocus
        name="type"
        onChange={(e) => { onChangeRow('type', idx, e.target.value) }}
        value={spec.type}
        style={{ width: '100%' }}
      />
      <TextField
        id="value"
        label="Value"
        name="value"
        onChange={(e) => { onChangeRow('value', idx, e.target.value) }}
        value={spec.value}
        style={{ width: '100%' }}
      />
    </Stack>
    <DeleteIcon className="mt-16" onClick={e => { handleDelete(spec, idx) }}/>
  </div>
}
