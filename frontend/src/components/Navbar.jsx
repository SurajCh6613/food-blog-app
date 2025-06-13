import React from "react";

const Navbar = () => {
  return (
    <>
      <header>
        <h2 className="text-2xl font-bold cursor-pointer text-blue-500">Food Blog</h2>
        <ul>
            <li>Home</li>
            <li>My Recipe</li>
            <li>Favourites</li>
            <li>Login</li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
