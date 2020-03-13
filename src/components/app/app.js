import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        searchText: '',
        todoData: [
            this.createTodoItem('Drink Tea'),
            this.createTodoItem('Build React App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(el => el.id === id);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            }
        })
    };

    toggleProperty = (id, propName) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(el => el.id === id);

            const oldItem = todoData[idx];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};

            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }
        });
    };

    onToggleImportant = (id) => {
        this.toggleProperty(id, 'important');
    };

    onToggleDone = (id) => {
        this.toggleProperty(id, 'done');
    };

    setSearchText = text => {
        this.setState({
            searchText: text
        })
    };

    filterTasksBySearchWord = (elem) => {
        const searchText = this.state.searchText.toLowerCase();

        if(searchText === '') return true;
        return elem.label.toLowerCase().indexOf(searchText) > -1
    };

    render() {
        const {todoData} = this.state;

        let filteredTasks = todoData
            .filter(this.filterTasksBySearchWord);

        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSetSearchText={this.setSearchText} />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos = {filteredTasks}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        )
    }
}