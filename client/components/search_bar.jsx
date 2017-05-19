import React from 'react';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    onEnterPress(e) {
        e.preventDefault();
        return false;
    }

    onInputChange(term) {
        this.setState({ term: term });
        this.props.onSearchTermChange(term);
    }
    onBlur(e) {
        e.target.value='';
    }
    onFocus(e) {
        e.target.value = this.state.term;
    }

    render() {
        return (
            <form  onSubmit={(e) => this.onEnterPress(e)} >
                <input
                type="search"
                onChange={event => this.onInputChange(event.target.value)}
                onBlur={e => this.onBlur(e)}
                onFocus={e => this.onFocus(e)}
                />  
            </form>
        );
    }

    /**
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div id="imaginary_container">
                            <div className="input-group stylish-input-group">
                                <input type="search" className="form-control" placeholder="Search" onChange={event => this.onInputChange(event.target.value)} />
                                <span className="input-group-addon">
                                    <button type="submit">
                                        <span className="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
     */
}
export default SearchBar;