import React, { useState } from "react";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AvatarGroup from "@mui/material/AvatarGroup";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "./Navigation.scss";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import axios from "axios";

type AccountMenuProps = {
  src: string;
  bedgeCount:number;
};

const Navigation: React.FC<AccountMenuProps> = (props: AccountMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeAllDataFromFirebase = async () => {
    try {

      const firebaseDatabaseUrl = "https://e-comm-b9d1a-default-rtdb.firebaseio.com/";
      await axios.delete(`${firebaseDatabaseUrl}/productData.json`);
  
      console.log("All data removed from Firebase successfully.");
    } catch (error) {
      console.error("Error removing data from Firebase:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const bedgeCount = useSelector((state:any) => state.HomePage.bedgeCount);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const src = "/broken-image.jpg";
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    removeAllDataFromFirebase();
    navigate("/");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="MuiBox-root">
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          className="Login"
          style={{
            textDecoration: "none",
            color: "inherit",
            minWidth: "8rem",
            marginLeft: "21px",
            marginTop: "12px",
          }}
        >
          {" "}
          <Typography sx={{ minWidth: 100 }}>Login</Typography>
        </Link>
        <Link
          to="/homepage"
          className="Homepage"
          style={{
            textDecoration: "none",
            color: "inherit",
            minWidth: "13rem",
            marginTop: "12px",
          }}
        >
          {" "}
          <Typography sx={{ minWidth: 100 }} >Homepage</Typography>
        </Link>
        <Link
          to="/about-us"
          className="about"
          style={{
            textDecoration: "none",
            color: "inherit",
            minWidth: "13rem",
            marginTop: "12px",
            marginLeft: "-6rem",
          }}
        >
          {" "}
          <Typography sx={{ minWidth: 100 }} >About us</Typography>
        </Link>
        <div data-after-text={bedgeCount} data-after-type="badge top right" style={{marginTop: "12px"}} >
        <ShoppingCartIcon
          fontSize="large"
          className="shopping_cart"
          onClick={showModal}
        />
        </div>
        <div className="avatar" style={{ marginLeft: "auto" }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AvatarGroup>
                <Avatar
                  style={{ backgroundColor: "#87d068", marginTop: "2px" }}
                  size={47}
                  icon={<UserOutlined />}
                />
              </AvatarGroup>
            </IconButton>
          </Tooltip>
        </div>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon onClick={handleLogout}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Modal
        title="Cart item"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="cart_modal"
      >
        <Cart />
      </Modal>
    </div>
  );
};

export default React.memo(Navigation);
