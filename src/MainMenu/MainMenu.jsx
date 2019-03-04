import React from 'react';
import { Row, Col } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MainMenu.scss';

// A menu is a title plus a list of entries.
const MainMenu = ({ title, entries }) => (
  <div className="main-menu">
    <Title>{title}</Title>
    <hr />
    {entries.map(({ name, description }) => (
      <div className="entry-with-hr" key={name}>
        <Entry
          name={name}
          description={description}
        />
        <hr />
      </div>
    ))}
    <NavLink to="/">Back to main menu</NavLink>
  </div>
);
MainMenu.propTypes = {
  title: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

const Title = ({ children }) => (
  <div className="main-title">
    <Row>
      <Col s={12}>{children}</Col>
    </Row>
  </div>
);
Title.propTypes = {
  children: PropTypes.string.isRequired,
};


// An entry consists of the name and the description.
const Entry = ({ name, description }) => (
  <div className="entry">
    <NavLink to={`${name.toLowerCase()}`}>
      <EntryName>{name}</EntryName>
      <EntryDescription>{description}</EntryDescription>
    </NavLink>
  </div>
);
Entry.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};


const EntryName = ({ children }) => (
  <div className="entry-name">
    <Row>
      <Col s={12} className="entry-name">{children}</Col>
    </Row>
  </div>
);
EntryName.propTypes = {
  children: PropTypes.string.isRequired,
};


const EntryDescription = ({ children }) => (
  <div className="entry-description">
    <Row>
      <Col s={12} className="entry-description">{children}</Col>
    </Row>
  </div>
);
EntryDescription.propTypes = {
  children: PropTypes.string.isRequired,
};


export default MainMenu;
