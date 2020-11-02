import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import history from '../../history';

export default class TopNav extends Component {
  render() {
    return (
      <MenuComp />
    )
  }
}

class MenuComp extends React.Component {
  state = {}

  handleItemClick = (e, { name }) => {
    history.push(`/${name}`)
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu>
          <Menu.Item
            name='vancouver'
            active={activeItem === 'vancouver'}
            onClick={this.handleItemClick}
          >
            Vancouver
        </Menu.Item>

          <Menu.Item
            name='toronto'
            active={activeItem === 'toronto'}
            onClick={this.handleItemClick}
          >
            Toronto
        </Menu.Item>

          <Menu.Item
            name='requests'
            active={activeItem === 'requests'}
            onClick={this.handleItemClick}
          >
            Request Something
        </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>

            <Menu.Item
              name='admin'
              active={activeItem === 'admin'}
              onClick={this.handleItemClick}
            >
              Unicorn Portal
        </Menu.Item>

          </Menu.Menu>
        </Menu>
      </div >
    )
  }
}