import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const Nav = () => (
    <NavStyles>
        <User>
            {({data: {me}}) => {
               if(me) return <p>{me.name}</p>;
               return null;
            }}
        </User>
        <Link href="/index">
            <a>Home</a>
        </Link>
        <Link href="/sell">
            <a>Sell</a>
        </Link>
        <Link href ="/items">
            <a>Shop</a>
        </Link>
        <Link href ="/signup">
            <a>SignUp</a>
        </Link>
        <Link href ="/orders">
            <a>Orders</a>
        </Link>
        <Link href ="/me">
            <a>Account</a>
        </Link>
        <Signout/>
    </NavStyles>


);

export default Nav;