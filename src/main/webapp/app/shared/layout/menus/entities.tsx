import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/application-settings">
      <Translate contentKey="global.menu.entities.applicationSettings" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-settings">
      <Translate contentKey="global.menu.entities.userSettings" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/training-schedule">
      <Translate contentKey="global.menu.entities.trainingSchedule" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/training-unit">
      <Translate contentKey="global.menu.entities.trainingUnit" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/workout">
      <Translate contentKey="global.menu.entities.workout" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/completed-training">
      <Translate contentKey="global.menu.entities.completedTraining" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/completed-set">
      <Translate contentKey="global.menu.entities.completedSet" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/nutrition">
      <Translate contentKey="global.menu.entities.nutrition" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/target-weight">
      <Translate contentKey="global.menu.entities.targetWeight" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/protocolled-weight">
      <Translate contentKey="global.menu.entities.protocolledWeight" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/weight">
      <Translate contentKey="global.menu.entities.weight" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/unit">
      <Translate contentKey="global.menu.entities.unit" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/media">
      <Translate contentKey="global.menu.entities.media" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/language">
      <Translate contentKey="global.menu.entities.language" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
