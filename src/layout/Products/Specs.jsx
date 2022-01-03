import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import WDButton from './../../components/WDButton/WDButton'
import SpecRow from './SpecRow';
import { specsUpdate } from './../../services/general'

export default function Specs({ title, specs, ...rest }) {
  let [newSpec, setNewSpec] = useState({ type: '', value: '' });

  const handleNewAdd = () => {
    let newSpecs = [...specs];
    newSpecs.push(newSpec)
    setNewSpec({ type: '', value: '' })
    specsUpdate.next(newSpecs)
  };

  const handleNewSpecChange = (e) => {
    setNewSpec({
      ...newSpec,
      [e.target.name]: e.target.value
    })
  };
  
  const handleDelete = (spec, idx) => {
    console.log('idx', idx)
    let newSpecs = [...specs].filter((spec, idnx) => idnx != idx)
    specsUpdate.next(newSpecs)
  };

  const onChangeRow = (spec, idx, value) => {
    let newSpecs = [...specs]

    if(spec == 'type') {
      newSpecs[idx]['type'] = value
    }

    if(spec == 'value') {
      newSpecs[idx]['value'] = value
    }
    
    specsUpdate.next(newSpecs)
    console.log('spec update',newSpecs, spec, idx, value)
  };

  return <div>
    <div className="wd-specs-form">
      <Stack className="mt-16" sx={{ alignItems: 'center' }} spacing={2} direction={"row"}>
        <TextField
          id="type"
          name="type"
          variant="outlined"
          value={newSpec.type}
          onChange={handleNewSpecChange}
          label="Type"
          style={{ width: '100%' }}
        />
        <TextField
          label="Value"
          name="value"
          value={newSpec.value}
          onChange={handleNewSpecChange}
          style={{ width: '100%' }}
        />
        <WDButton style={{ width: '100%' }} onClick={handleNewAdd} title={"Add"} />
      </Stack>
    </div>
    {specs.length > 0 && <Stack sx={{ flexWrap: 'wrap' }} direction="row">
      {specs.map((spec, idx) => {
        return <SpecRow spec={spec} idx={idx} key={idx} handleDelete={handleDelete} onChangeRow={onChangeRow} />
      })}
    </Stack>
    }
  </div>
}
