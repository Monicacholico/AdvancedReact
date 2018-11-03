import Link from 'next/link';

const Nav = () => (
    <div>
        <Link href="/index">
            <a>Index</a>
        </Link>

        <Link href="/sell">
            <a>Sell</a>
        </Link>
    </div>

)

export default Nav;