import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <div className="card text-white bg-primary mb-3">
            <p className="card-text">
              <Translate contentKey="footer" />
            </p>
        </div>
      </Col>
    </Row>
  </div>
);

export default Footer;
