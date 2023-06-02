import * as React from "react";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Button from "@mui/material/Button";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"
import IconButton from "@mui/material/IconButton"
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import CircleIcon from '@mui/icons-material/Circle';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PentagonIcon from '@mui/icons-material/Pentagon';


export const mainMenu = (
  <React.Fragment>
    {/* <Link href="/" passHref>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="ThanksCard" />
      </ListItemButton>
    </Link> */}
    {/* <Link href="/user" passHref> */}
      <ListItemButton >
        <ListItemIcon>
          {/* <PeopleIcon /> */}
          <AccountBoxRoundedIcon color="primary" />
        </ListItemIcon>
        {/* <ListItemText primary="新規ユーザー登録" /> */}
        <ListItemText primary={
            <>
              新規ユーザー登録 <br />
              <Link href="/employee/create" passHref>
              <Button color="primary" 
                    type="submit" 
                    variant="contained"  
                    sx={{pl:5,pr:5,borderRadius: '30px', }}
                  >
                  ユーザー登録
            </Button>
            </Link>
            </>
          } />
      </ListItemButton>
    {/* </Link> */}
    <ListItemButton>
      <ListItemIcon>
        <CircleIcon />
      </ListItemIcon>
      <ListItemText primary="機能一覧" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ChangeHistoryIcon />
      </ListItemIcon>
      <ListItemText primary="Label" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <CheckBoxOutlineBlankIcon />
      </ListItemIcon>
      <ListItemText primary="Label" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <PentagonIcon />
      </ListItemIcon>
      <ListItemText primary="Label" />
    </ListItemButton>
  </React.Fragment>
);

// export const secondaryMenu = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );