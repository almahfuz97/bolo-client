import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/authProvider/AuthProvider'

export default function Header() {
    const { user, logOut } = useContext(AuthContext);
    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand >

                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Quesk
                </span>
            </Navbar.Brand>
            <div className={`${user ? 'flex' : 'hidden'}  md:order-2`}>
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img={user?.photoURL} rounded={true} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm font-bold">
                            {user?.displayName}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {user?.email}
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <NavLink
                    to="/"
                >
                    Home
                </NavLink>

                {
                    !user?.email ?
                        <NavLink to="/login">
                            Login
                        </NavLink>
                        :
                        <NavLink onClick={() => logOut()}>
                            Logout
                        </NavLink>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}
