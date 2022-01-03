import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import WDButton from '../WDButton/WDButton';

import './LayoutHeader.scss';

export default function Header({ title, btnTitle, handleNewClick, ...rest }) {
  return <div className="wd-admin-layout-header">
    <div className="wd-layout-header-left">
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>
    </div>
    <div className="wd-layout-header-right">
      {btnTitle && <WDButton {...rest} title={btnTitle} handleNewClick={handleNewClick}/>}
    </div>
  </div>
}
