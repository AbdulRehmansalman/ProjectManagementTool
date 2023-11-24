import React, { useState } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { Tally3 } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { LogIn } from 'lucide-react';

const navbar = () => {
  const [toggleMenu, SetToggleMenu] = useState(false);
  return (
    <>
      <section className="h-Wrapper">
        <div className="h-container">
          <div className="h-menu">
            <p>
              <NavLink to="/" className="linkRemoved">
                Home
              </NavLink>
            </p>
            <p>
              <NavLink to="/register" className="linkRemoved">
                Register
              </NavLink>
            </p>
          </div>
          <div className="heading">
            <h3>Project Management Tool</h3>
          </div>

          <div className="btnSign">
            <button className="signIn">
              {' '}
              <NavLink to="/login" className="linkRemoved">
                Login
              </NavLink>
              <LogIn color="#6685ff" />
            </button>
          </div>

          <div className="toggle-menu">
            {toggleMenu ? (
              <XCircle
                color="#17d0e8"
                strokeWidth={2.5}
                onClick={() => SetToggleMenu(false)}
              />
            ) : (
              <Tally3
                color="#00f1f5"
                strokeWidth={2.75}
                onClick={() => SetToggleMenu(true)}
              />
            )}
            {toggleMenu && (
              <div className="menu-toggle-container scale-up-center ">
                <div className="toggle-links">
                  <div>
                    <p>
                      <NavLink to="/" className="linkRemoved">
                        Home
                      </NavLink>
                    </p>
                    <p>
                      <NavLink to="/register" className="linkRemoved">
                        Register
                      </NavLink>
                    </p>
                    <button className="signIn">
                      {' '}
                      <LogIn color="#6685ff" />
                      <NavLink to="/login" className="linkRemoved">
                        Login
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default navbar;
