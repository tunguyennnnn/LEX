import '../styles/navbar.css'
import '../styles/lockauth.css'
import React from 'react'
import { Link, IndexLink } from 'react-router'
import Avatar from 'material-ui/Avatar'
import MdAccount from 'react-icons/lib/md/account-circle'
import MdSearch from 'react-icons/lib/md/search'

export default class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.props.authenticate()
  }

  render () {
    const { profile, isAuthenticated, login } = this.props
    return (
      <div class='navbar-component'>
        <div class='navbar area'>
          <IndexLink to='/' class='brand'>LEX</IndexLink>
          <nav role='navigation' class='list'>
            <Link to='/' class='navbar-item -link'>
              <MdSearch />
            </Link>
            { !isAuthenticated ? (
              <span onTouchTap={login} class='navbar-item -link'>
                <MdAccount />
              </span>
              ) : (
                <Link to='/account' class='navbar-item -link'>
                  <Avatar src={profile.picture} size={30} class='navbar-avatar' />
                </Link>
              )}
          </nav>
        </div>
      </div>
    )
  }
}

