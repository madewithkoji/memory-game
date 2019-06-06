import React from 'react';
import styled from 'styled-components';
import Koji from 'koji-tools';

// Helper functions
import shuffle from './helpers/shuffle.js';
import formatTime from './helpers/formatTime.js';
import handleScore from './helpers/handleScore.js';

// Bring in UI components
import Container from './components/Container';
import Title from './components/Title';
import Toolbar, { Time, Moves, Score } from './components/Toolbar';
import CardContainer from './components/CardContainer';
import Card from './components/Card';
import { RestartRow, RestartButton } from './components/RestartButton';
import { Modal, Row } from './components/HighScores';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [], // An array containing all the cards on the screen
            currentCardIndex: null, // The currently visible card
            resetTimer: null, // The timer to flip all the cards over
            startTime: null, // The time the user has started playing the game
            elapsedTime: 0, // The number of seconds since the user has started playing
            cardsFound: 0, // tracks the number of cards that have been turned over already
            moves: 0, // The number of moves the user has made
            score: 0, // A calculation of time and moves that is used for leaderboards
            highScores: [], // only exists at end of game when loaded, reset on new game
            boxSize: 40, // set in componentDidMount, gets the client screensize and adjusts
        };

        this.elapsedTimeInterval = null;
    }

    componentDidMount() {
        // Setup the board when we first load the game
        console.log(this.cardContainerRef.clientHeight);
        let boxSize = (Math.min(this.cardContainerRef.clientWidth, this.cardContainerRef.clientHeight) / 4) - 6;
        this.setState({ boxSize });
        this.setupBoard();
    }

    setupBoard() {
        // If there's an existing interval incrementing the number
        // of seconds the user has been playing, clear it
        if (this.elapsedTimeInterval) {
            clearInterval(this.elapsedTimeInterval);
            this.elapsedTimeInterval = null;
        }

        // Create two items for each match
        const cards = Object.keys(Koji.config.images)
            .filter(key => key.startsWith('match'))
            .reduce((acc, key) => {
                const card = {
                    item: Koji.config.images[key],
                    state: 'hidden',
                };

                // Push by destructuring to clone and avoid strong 
                // references to state in the objects
                acc.push({ ...card }, { ...card });

                return acc;
            }, []);
        
        // Shuffle the array of cards
        const shuffledCards = shuffle(cards);

        // Set the initial game state
        this.setState({
            cards: shuffledCards,
            currentCardIndex: null,
            resetTimer: null,
            startTime: null,
            elapsedTime: 0,
            cardsFound: 0,
            moves: 0,
            score: 0,
            highScores: [],
        });
    }

    // Hide all the cards that have not been marked as found
    hideAllCards() {
        this.setState((curState) => {
            curState.cards = curState.cards.map((card) => {
                if (card.cardState !== 'found') {
                    card.cardState = 'hidden';
                }
                return card;
            });
            curState.currentCardIndex = null;
            curState.resetTimer = null;
            return curState;
        });
    }

    // Handle when a user clicks a card
    onClickCardAtIndex(i) {
        // If there are already two cards visible,
        // wait until the timer flips them back over so we can't
        // see more than two cards at once
        if (this.state.resetTimer) {
            return;
        }

        // if the card is already matched, don't do anything
        if (this.state.cards[i].cardState === 'found') {
            return;
        }

        // If this is our first move, start the timer
        if (!this.state.startTime) {
            this.setState({ startTime: Date.now() });
            this.elapsedTimeInterval = setInterval(() => {
                this.setState({ elapsedTime: Math.round((Date.now() - this.state.startTime) / 1000) }, () => this.updateScore());
            }, 250);
        }

        // Add a move to the number of moves
        this.setState({ moves: this.state.moves + 1 }, () => this.updateScore());

        // If no card is visible, flip this one and return early
        const { currentCardIndex } = this.state; 
        if (currentCardIndex === null) {
            this.setState({
                currentCardIndex: i,
            });
            return;
        }

        // Don't let them find a match by clicking on the same card
        // twice
        if (currentCardIndex === i) {
            return;
        }
        
        // If there's already a card selected, compare it to the one
        // we just clicked
        const clickedCard = this.state.cards[i];
        const currentCard = this.state.cards[currentCardIndex];

        if (clickedCard.item === currentCard.item) {
            // If it's a match, set b - {e.name}oth cards states to found
            // and clear the current card index
            this.setState((curState) => {
                curState.cards[i].cardState = 'found';
                curState.cards[currentCardIndex].cardState = 'found';
                curState.currentCardIndex = null;
                curState.cardsFound += 2;
                return curState;
            }, () => {
                // cards have been found, update the score
                this.updateScore();

                // Check if they've won the game. If they have,
                // stop the timer.
                if (!this.state.cards.find(card => card.cardState !== 'found')) {
                    clearInterval(this.elapsedTimeInterval);
                    this.elapsedTimeInterval = null;

                    // now store a high score
                    this.updateScore(() => handleScore(this.state.score, '').then((resp) => {
                        this.setState({ highScores: resp.scores });
                    }));
                }
            });
        } else {
            // Otherwise, show the flipped card so the user can see both,
            // then start a timer to flip them back over.
            //
            // The user will not be able to click another match until the
            // cards have flipped back over.
            this.setState((curState) => {
                curState.cards[i].cardState = 'visible';
                curState.resetTimer = setTimeout(() => this.hideAllCards(), 1400);
                return curState;
            });
        }
    }

    updateScore(callback) {
        let score = Math.floor((this.state.cardsFound * ((this.state.cardsFound * 2) / (this.state.moves + this.state.elapsedTime))) * 100);
        this.setState({ score }, () => callback ? callback() : 0);
    }

	render() {
        const { currentCardIndex, elapsedTime, moves, score } = this.state;

		return (
            <Container>
                <Title>{Koji.config.metadata.title}</Title>

                <Toolbar>
                    <Time>{(moves > 0) ? formatTime(elapsedTime) : 'Click a tile to start'}</Time>
                    {moves > 0 && <Score>{score}</Score>}
                    {moves > 0 && <Moves>{moves} moves</Moves>}
                </Toolbar>

                <CardContainer ref={(ref) => this.cardContainerRef = ref}>
                    {this.state.cards.map(({ item, cardState }, i) => (
                        <Card
                            key={i}
                            item={item}
                            boxSize={this.state.boxSize}
                            isFlipped={currentCardIndex === i || cardState === 'visible'}
                            isFound={cardState === 'found'}
                            canClick={this.state.resetTimer === null}
                            onClick={() => this.onClickCardAtIndex(i)}
                        />
                    ))}
                </CardContainer>

                <RestartRow>
                    <RestartButton onClick={() => this.setupBoard()}>
                        {moves > 0 ? 'Restart game' : <span>&nbsp;</span>}
                    </RestartButton>
                </RestartRow>

                {this.state.highScores.length > 0 && (
                    <Modal onClose={() => this.setState({ highScores: [] })}>
                        {this.state.highScores.sort((a,b) => a.score < b.score).slice(0, 9).sort((a,b) => a.score < b.score).map((e, i) => (
                            <Row><strong>{i+1}:</strong> {e.score}</Row>
                        ))}
                    </Modal>
                )}
            </Container>
        );
	}
}

export default HomePage;
