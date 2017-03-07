import React from 'react'
import { Link, IndexLink } from 'react-router'
import MdAccount from 'react-icons/lib/md/account-circle'
import MdSearch from 'react-icons/lib/md/search'

export default class NavBar extends React.Component {
  render () {
    return (
      <div class='navbar-component'>
        <div class='navbar area'>
          <IndexLink to='/' class='brand'>LEX</IndexLink>
          <nav role='navigation' class='list'>
            <Link to='/' class='navbar-item -link'>
              <MdSearch />
            </Link>
            <Link to='/account' class='navbar-item -link'>
              <MdAccount />
            </Link>
          </nav>
        </div>
      </div>
    )
  }
}

