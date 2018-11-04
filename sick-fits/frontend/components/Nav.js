import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
    <NavStyles>
        <Link href="/index">
            <a>Index</a>
        </Link>

        <Link href="/sell">
            <a>Sell</a>
        </Link>
    </NavStyles>

);

export default Nav;