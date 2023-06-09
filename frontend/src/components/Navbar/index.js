import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { Button, Image, useColorMode, IconButton } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Image src="/skidialogo.png" height={12} width={"auto"} />
        <div className={styles.logo}>
          <Link to="/">Skidia</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/men">Men</Link>
          </li>
          <li>
            <Link to="/woman">Women</Link>
          </li>
          <li>
            <Link to="/kids">Kids</Link>
          </li>
          <li>
            <Link to="/contact-me">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="whatsapp">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="facebook">Register</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="pink" variant="ghost">
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          </>
        )}
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          size="md"
          variant="ghost"
          ml={3}
        />
      </div>
    </nav>
  );
}

export default Navbar;
