import Link from 'next/link';

const Home = props => (
    <div>
        <p>Hey!</p>
        <Link href="/self">
            <a>Self</a>
        </Link>
    </div>
);

export default Home;