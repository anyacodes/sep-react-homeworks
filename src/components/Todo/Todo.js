import React, {Fragment, PureComponent} from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
    state = {
        inputValue: ''
    };

    getId() {
        const {savedData} = this.props;
        const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
        return biggest + 1;
    }

    handleChange = event => {
        this.setState({
            inputValue: event.target.value
        })
    };

    createNewRecordByEnter = event => {
        if(event.key === 'Enter'){
            this.createNewRecord();
        }
    };

    toggleRecordComplete = event => {

    };

    createNewRecord = () => {
        const {inputValue} = this.state;
        const {savedData, saveData} = this.props;
        console.log(this.props)

        if(inputValue !== ''){
            saveData([{
                id: this.getId(),
                text: inputValue,
                isComplete: false
            }, ...savedData]);
            this.setState({
                inputValue: ''
            });
        }
    };

    render() {
        const {savedData} = this.props;

        return (
            <Fragment>
                <Card title={"Список Дел"} >
                    {this.renderEmptyRecord()}
                    {savedData.map(this.renderRecord)}
                </Card>
            </Fragment>
        );
    }

    renderEmptyRecord() {
        return(
            <div className="todo-item todo-item-new">
                <input className="todo-input t-input" placeholder="Введите задачу" value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.createNewRecordByEnter} />
                <span className="plus t-plus" onClick={this.createNewRecord}>+</span>
            </div>
        );
    }

    renderRecord = record => {
        return (
            <div className="todo-item t-todo">
                <p className="todo-item__text">{record.text}</p>
                <span className="todo-item__flag t-todo-complete-flag"
                      data-todo-id={record.id}
                      onClick={this.toggleRecordComplete}>

                    [ ]
                </span>
            </div>
        )
    };
}

export default withLocalstorage('todo-app', [])(Todo);
