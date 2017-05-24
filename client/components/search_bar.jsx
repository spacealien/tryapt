import React from 'react';

/**
 * This class defines the serachbar that is place inside the top menu 
 * in the EmployeeView.
 */

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    // This method prevents the page from reloading on enter button press.
    onEnterPress(e) {
        e.preventDefault();
        return false;
    }

    /**
     * Calls the callback methods with the updated searchterm.
     * The EmployeeView which recives the callback with the 
     * new searchTerm sends the searchterm to the List class
     */
    onInputChange(term) {
        this.props.onSearchTermChange(term);
    }

    // Method for hiding the search bar content whenever the user leaves the input field.
    // Hides the characters that is displaying whenever the expandable search bar is unexpanded.
    onBlur(e) {
        e.target.value = '';
    }

    // Method for displaying the searchterm whenever the user enters the input field again. 
    onFocus(e) {
        e.target.value = this.props.searchTerm;
    }

    render() {
        return (
            <form onSubmit={(e) => this.onEnterPress(e)} >
                <input
                    type="search"
                    onChange={(e) => { this.onInputChange(e.target.value) }}
                    onBlur={e => this.onBlur(e)}
                    onFocus={e => this.onFocus(e)}
                />
            </form>
        );
    }
}
export default SearchBar;