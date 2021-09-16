import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "#151515",
  },
  color: {
    color: "#fff",
  },
});

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const menus = [
    { name: "home", to: "/" },
    { name: "edit", to: "/edit" },
  ];
  return (
    <header className="main-header">
      <nav className="nav-container">
        <section className="mobile-nav-container">
          <div className="mobile-nav">
            <MenuRoundedIcon
              style={{ color: "#fff" }}
              fontSize="large"
              onClick={() => setOpen(true)}
            />
            <Drawer
              classes={{ paper: classes.paper, color: classes.color }}
              open={open}
              onClose={() => setOpen(false)}
            >
              <CloseRoundedIcon
                style={{ color: "#fff", margin: "1rem" }}
                fontSize="large"
                onClick={() => setOpen(false)}
              />
              <ul className="mobile-nav-list">
                {menus.map((menu, key) => (
                  <li
                    key={key}
                    onClick={() => setOpen(false)}
                    className="mobile-nav-list-item"
                  >
                    <Link className="link" to={menu.to}>
                      {menu.name}
                      <ArrowRightIcon color="secondary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Drawer>
            <Link className="mobile-logo" to="/">
              <svg
                width="80"
                height="65"
                viewBox="0 0 36 52"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#EC1D24" width="100%" height="100%"></rect>
                <path
                  fill="#FEFEFE"
                  d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"
                ></path>
              </svg>
            </Link>
          </div>
        </section>
        <section className="desktop-nav-container">
          <div className="desktop-nav">
            <Link className="desktop-logo" to="/">
              <svg
                height="50"
                viewBox="-215.19000000000005 -86.608 1000 402.473"
                width="130"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M-215.19-86.608h1000v402.473h-1000z" fill="#ed1d24" />
                <path
                  d="M631.063 7.184v-61.603H459.644l-28.191 205.803-27.896-205.802H341.74L348.665.497c-7.14-14.068-32.449-54.915-88.146-54.915-.367-.024-61.901 0-61.901 0l-.237 299.974-45.057-299.974-80.959-.047-46.612 310.814.024-310.769h-77.483l-27.933 174.585-27.208-174.583h-77.508v337.906h61.036v-162.87l27.764 162.866h32.449l27.374-162.866v162.866H81.935l7.14-51.995h47.374l7.116 51.995 115.521.071h.094v-.071h.144V173.799l14.162-2.063 29.319 111.819h59.752l-.024-.071h.178l-38.475-131.057c19.498-14.422 41.513-51.047 35.654-86.084v-.023c.07.474 36.316 217.38 36.316 217.38l71.065-.216L515.83-22.8v306.285h115.236v-60.773h-54.7v-77.496h54.7V83.518h-54.7V7.184zM96.265 177.905l16.758-144.461 17.4 144.461zm177.419-66.704c-4.697 2.278-9.595 3.417-14.363 3.417V5.927c.083 0 .179-.022.297-.022 4.78-.024 40.419 1.446 40.419 53.774 0 27.373-12.121 44.62-26.353 51.522m480.36 111.464v60.772H641.63V-54.465h60.526v277.13z"
                  fill="#fff"
                />
              </svg>
            </Link>
            <ul className="desktop-nav-list">
              {menus.map((menu, key) => (
                <li key={key} className="desktop-nav-list-item">
                  <Link className="link" to={menu.to}>
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;
