import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-materialize';
import { entries } from '../App/App';
import './SalesMenu.scss';

// metadata
const month = 'November';
const currency = 'SGD';
const amount = 80586.54;
const cards = [
  {
    id: 0,
    title: `Total sales in ${month}?`,
    content: `You have sales worth ${currency} ${amount} in the last 30 days.`,
  },
  {
    id: 1,
    title: 'Total sales this week?',
    content: 'You have not sold anything this week or you have not uploaded your invoices.',
  },
  {
    id: 2,
    title: 'Card #3',
    content: '#3 Lorem ipsum dolor sit amet',
  },
  {
    id: 3,
    title: 'Card #4',
    content: '#4 consectetur adipiscing elit',
  },
];


const Header = ({ title, description }) => (
  <div className="menu-header">
    <Row><Col s={12} className="header-title">{title}</Col></Row>
    <Row><Col s={12} className="header-description">{description}</Col></Row>
  </div>
);
Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};


// The main UI. The display order of cards are stored in the state.
class SalesMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pinnedCard: -1,
    };
  }

  onPinHandler = (id) => {
    const { pinnedCard } = this.state;
    if (id === pinnedCard) {
      this.setState({ pinnedCard: -1 });
    } else {
      this.setState({ pinnedCard: id });
    }
  }

  isCardPinned = (id) => {
    const { pinnedCard } = this.state;
    return id === pinnedCard;
  }

  createCard = ({ id, title, content }) => (
    <PinCard
      id={id}
      key={id}
      title={title}
      content={content}
      isPinned={this.isCardPinned(id)}
      onPinHandler={this.onPinHandler}
    />
  );

  render() {
    const { pinnedCard } = this.state;
    return (
      <div className="sales-menu">
        <Header title={entries[0].name} description={entries[0].description} />
        <hr />
        {cards.filter(c => c.id === pinnedCard).map(this.createCard)}
        {cards.filter(c => c.id !== pinnedCard).map(this.createCard)}
      </div>
    );
  }
}


// A card that supports pinning or unpinning.
// Only one card can be pinned at a time. When one card is pinned, others are automatically
//   unpinned and restored to the default order.
const PinCard = ({
  id, title, content, isPinned, onPinHandler,
}) => (
  <Row>
    <Col s={12}>
      <Card
        className="hoverable z-depth-2"
        title={title}
        actions={[
          isPinned
            ? <PinButton id={id} key={id} onPinHandler={onPinHandler} toPin={false} />
            : <PinButton id={id} key={id} onPinHandler={onPinHandler} toPin />,
        ]}
      >
        {content}
      </Card>
    </Col>
  </Row>
);
PinCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  onPinHandler: PropTypes.func.isRequired,
};


// A flat button that shows either pin or unpin according to the current pinning state.
const PinButton = ({ toPin, id, onPinHandler }) => (
  <button
    type="button"
    className="btn-flat indigo-text text-darken-2"
    onClick={() => onPinHandler(id)}
  >
    {toPin ? 'PIN IT' : 'UNPIN IT'}
  </button>
);
PinButton.propTypes = {
  id: PropTypes.number.isRequired,
  toPin: PropTypes.bool.isRequired,
  onPinHandler: PropTypes.func.isRequired,
};

export {
  PinCard,
};

export default SalesMenu;
