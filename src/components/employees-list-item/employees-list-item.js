import './employees-list-item.css';


const EmployeesListItem = (props) => {

        const {name, salary, onDelete, onToggleProp, onValueChange, inc, rise} = props;
        let classNames = "list-group-item d-flex justify-content-between";

        if (inc) {
            classNames += ' increase';
        }

        if (rise) {
            classNames += ' like';
        }
    
        return (
            <li className={classNames}>
                <span onClick={onToggleProp} data-toggle="rise" className="list-group-item-label">{name}</span>
                <input type="text"
                    className="list-group-item-input"
                    defaultValue={salary + '$'}
                    onChange={onValueChange} ></input>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button"
                    onClick={onToggleProp}
                    className="btn-cookie btn-sm"
                    data-toggle="inc" >
                        <i className="fas fa-cookie"></i>
                    </button>
    
                    <button type="button"
                    className="btn-trash btn-sm"
                    onClick={onDelete} >

                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        )
}

export default EmployeesListItem;