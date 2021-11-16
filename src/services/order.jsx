import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

function Order(props){

    function handleIconSort(){
        return (props.ordenacaoUp || props.ordenacaoDown) ? 'hidden' : '';
   
    }

    function handleIconUp(){
        return props.ordenacaoUp ? '' : 'hidden';
    }

    function handleIconDown(){
        return props.ordenacaoDown ? '' : 'hidden';
    }
    
    
    return(
       <>
        <FontAwesomeIcon
            icon={faSort}
            className={handleIconSort()}
            data-testid="fa-sort"
        />
        <FontAwesomeIcon
            icon={faCaretUp}
            className={handleIconUp()}
            data-testid="fa-sortUp"
        />
        <FontAwesomeIcon
            icon={faCaretDown}
            className={handleIconDown()}
            data-testid="sortD"
        />
       </>
    );
}

Order.propTypes = {
    ordenacaoUp: PropTypes.bool.isRequired,
    ordenacaoDown: PropTypes.bool.isRequired
    

}

export default Order;