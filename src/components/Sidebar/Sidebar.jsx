import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Typography, Divider, Button } from "@mui/material";
import { useRoutes, useLocation  } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './Sidebar.scss';

export default function Sidebar({ routes }) {
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route, ui }) => {
    let returnValue;
    if (ui == false)
      return null
    if (type === "collapse") {
      return <NavLink key={key} to={route} className={`wd-admin-link`}>
        <Box className="wd-admin-sidebar-link">{name}</Box>
      </NavLink>
    } else if (type === "title") {
      returnValue = (
        <Typography key={key} variant="h6" component="h6">
          {title}
        </Typography>
      );
    } else if (type === "divider") {
      returnValue = (
        <Divider
          key={key}
        />
      );
    }
    return returnValue;
  });


  return <div className="wd-admin-sidebar">
    <Stack spacing={2} direction="column">
      {renderRoutes}
    </Stack>
  </div>
}
