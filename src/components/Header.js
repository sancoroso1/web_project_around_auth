function Header() {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            src={require("../images/logo.png")}
            alt="Around the U.S."
            className="logo__header-image"
          />
        </div>
        <div className="header__line" />
      </header>
    </>
  );
}

export default Header;