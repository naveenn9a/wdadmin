import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
  import LoadingButton from '@mui/lab/LoadingButton';
  import './WDButton.scss';

export default function WDButton({ title, handleNewClick, ...rest }) {
  return <div className="wd-admin-button">
    <LoadingButton {...rest} variant={rest.variant ? rest.variant : 'contained'}>{title}</LoadingButton>
  </div>
}
