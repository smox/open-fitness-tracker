import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const WorkoutMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.workout.menu')}
    id="workout-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/workouts" disabled >
      <Translate contentKey="global.menu.workout.new" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/workouts" disabled>
      <Translate contentKey="global.menu.workout.visualize" />
    </MenuItem>
  </NavDropdown>
);
