import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const NutritionMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.nutrition.menu')}
    id="nutrition-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/nutritions" disabled>
      <Translate contentKey="global.menu.nutrition.new" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/nutritions" disabled>
      <Translate contentKey="global.menu.nutrition.manage" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/nutritions" disabled>
      <Translate contentKey="global.menu.nutrition.visualize" />
    </MenuItem>
  </NavDropdown>
);
