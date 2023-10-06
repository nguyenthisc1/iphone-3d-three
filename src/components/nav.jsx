import React from 'react'

export default function Nav() {
    return (
        <nav className='nav-wrapper'>
            <div className='nav-content'>
                <ul className='list-styled'>
                    <li>
                        <img src='./assets/images/logo.svg' alt='logo' />
                    </li>
                    <li>
                        <a className='link-styled'>Store</a>
                    </li>

                    <li>
                        <a className='link-styled'>Mac</a>
                    </li>

                    <li>
                        <a className='link-styled'>Ipad</a>
                    </li>

                    <li>
                        <a className='link-styled'>Iphone</a>
                    </li>

                    <li>
                        <a className='link-styled'>AirPods</a>
                    </li>

                    <li>
                        <a className='link-styled'>Tv & Home</a>
                    </li>

                    <li>
                        <a className='link-styled'>Entertainment</a>
                    </li>

                    <li>
                        <a className='link-styled'>Accessories</a>
                    </li>

                    <li>
                        <img src='./assets/images/search.svg' alt='search' />
                    </li>

                    <li>
                        <img src='./assets/images/store.svg' alt='store' />
                    </li>
                </ul>
            </div>
        </nav>
    )
}
