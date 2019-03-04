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
    cardId: 0,
    title: `Total sales in ${month}?`,
    content: `You have sales worth ${currency} ${amount} in the last 30 days.`,
  },
  {
    cardId: 1,
    title: 'Total sales this week?',
    content: 'You have not sold anything this week or you have not uploaded your invoices.',
  },
  {
    cardId: 2,
    title: 'Card #3',
    content: '#3 Lorem ipsum dolor sit amet',
  },
  {
    cardId: 3,
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

  onPinHandler = (cardId) => {
    const { pinnedCard } = this.state;
    if (cardId === pinnedCard) {
      this.setState({ pinnedCard: -1 });
    } else {
      this.setState({ pinnedCard: cardId });
    }
  }

  isCardPinned = (cardId) => {
    const { pinnedCard } = this.state;
    return cardId === pinnedCard;
  }

  createCard = ({ cardId, title, content }) => (
    <PinCard
      id={`pin-card-${cardId}`}
      key={cardId}
      cardId={cardId}
      title={title}
      content={content}
      isPinned={this.isCardPinned(cardId)}
      onPinHandler={this.onPinHandler}
    />
  );

  render() {
    const { pinnedCard } = this.state;
    return (
      <div className="sales-menu">
        <Header title={entries[0].name} description={entries[0].description} />
        <hr />
        {cards.filter(c => c.cardId === pinnedCard).map(this.createCard)}
        {cards.filter(c => c.cardId !== pinnedCard).map(this.createCard)}
      </div>
    );
  }
}


// A card that supports pinning or unpinning.
// Only one card can be pinned at a time. When one card is pinned, others are automatically
//   unpinned and restored to the default order.
const PinCard = ({
  cardId, title, content, isPinned, onPinHandler,
}) => (
  <Row key={cardId} className="pin-card">
    <Col s={12}>
      <Card
        className="hoverable z-depth-2"
        title={title}
        actions={[
          isPinned
            ? <PinButton cardId={cardId} key={cardId} onPinHandler={onPinHandler} toPin={false} />
            : <PinButton cardId={cardId} key={cardId} onPinHandler={onPinHandler} toPin />,
        ]}
      >
        {content}
      </Card>
    </Col>
  </Row>
);
PinCard.propTypes = {
  cardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  onPinHandler: PropTypes.func.isRequired,
};


// A flat button that shows either pin or unpin according to the current pinning state.
const PinButton = ({ toPin, cardId, onPinHandler }) => (
  <button
    id={`pin-button-${cardId}`}
    type="button"
    className="btn-flat indigo-text text-darken-2"
    onClick={() => onPinHandler(cardId)}
  >
    {toPin ? 'PIN IT' : 'UNPIN IT'}
  </button>
);
PinButton.propTypes = {
  cardId: PropTypes.number.isRequired,
  toPin: PropTypes.bool.isRequired,
  onPinHandler: PropTypes.func.isRequired,
};

export {
  PinCard,
};

export default SalesMenu;
