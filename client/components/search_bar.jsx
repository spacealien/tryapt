import React from 'react';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        console.log(nextProps);
        this.setState({ term: nextProps.searchTerm });
    }


    onEnterPress(e) {
        e.preventDefault();
        return false;
    }

    onInputChange(term) {
        this.props.onSearchTermChange(term);
    }

    onBlur(e) {
        e.target.value='';
    }

    onFocus(e) {
        e.target.value = this.props.searchTerm;
    }

    render() {
        return (

            <form  onSubmit={(e) => this.onEnterPress(e)} >
                <input
                type="search"
                onChange={ (e) => { this.onInputChange(e.target.value)} } 
                onBlur={e => this.onBlur(e)}
                onFocus={e => this.onFocus(e)}
                />  
            </form>
        
        );
    }
}
export default SearchBar;