import React, { useContext } from 'react';
import { Button, Form, FormControl, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    return (
        <Navbar className = 'bg-info' expand="md">
            <Navbar.Brand href="/">
                <img style ={{height: '60px'}} src="https://i.imgur.com/3MY6Ogr.png?1" alt="travel guru"/>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav" className = 'd-flex justify-content-between'>
            <Form inline>
                <FormControl type="text" placeholder="Search Your Destination.." className="mr-sm-2" />
            </Form>
                <Nav className="ml-auto align-items-center m-4 text-black">
                <Link to ='/News' className = 'nav-link text-white'>
                    News
                </Link>
                <Link to ='/destination' className = 'nav-link text-white'>
                    Destination
                </Link>
                <Link to ='/bolg' className = 'nav-link text-white'>
                    Blog
                </Link>
                <Link to ='/' className = 'nav-link text-white'>
                    Home
                </Link>
                <Nav.Link href="/login"><Button variant="warning"> {loggedInUser.isLogged ? 'Sign Out' : 'Log In'} </Button> </Nav.Link>
                </Nav>                
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;