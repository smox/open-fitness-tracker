import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const WeightMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.weight.menu')}
    id="weight-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/weights/add">
      <Translate contentKey="global.menu.weight.new" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/weights" disabled>
      <Translate contentKey="global.menu.weight.manage"/>
    </MenuItem>
    <MenuItem icon="asterisk" to="/weights" disabled>
      <Translate contentKey="global.menu.weight.visualize" />
    </MenuItem>
  </NavDropdown>
);
