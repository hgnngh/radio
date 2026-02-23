'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clicked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You clicked this.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ clicked: true }) },
            'Click!!!'
        );
    }
}

// Find the DOM container and render the component
const domContainer = document.querySelector('#react_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
