import AppInfo from '../app-info/app-info';
import { Component } from 'react';

import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John S.', salary: 300, inc: true, rise: true, id: 1},
                {name: 'Kate M.', salary: 1020, inc: false, rise: false, id: 2},
                {name: 'Sam K.', salary: 800, inc: false, rise: false, id: 3}
            ], 
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        let newEmployee = {
            name,
            salary,
            inc: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newEmployee];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (!term) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterSelect = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onValueChange = (id, value) => {
        // console.log(id, value);
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: value}
                }
                return item;
            })
        }))
    }

    // onToggleProp = (id, prop) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, [prop]: !item[prop]}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length,
            increase = this.state.data.filter(item => item.inc).length;
            const visibleData = this.filterSelect(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increase={increase} />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter}
                    onFilterSelect={this.onFilterSelect} />
                </div>
    
                <EmployeesList data={visibleData}
                onDelete={id => this.deleteItem(id)}
                onToggleProp={this.onToggleProp}
                onValueChange={this.onValueChange}
                />
    
                <EmployeesAddForm data={this.state.data}
                onAdd={this.addItem}/>
            </div>
            
        )
    }


}

export default App;