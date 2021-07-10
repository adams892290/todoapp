import React from 'react';
import { useDispatch } from "react-redux";
import { toggleCompletedAsync, deleteTodoAsync } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {

	const dispatch = useDispatch();

	const handleCompleted = () => {
		dispatch(toggleCompletedAsync({
			id,
			completed: !completed
		}));
	}

	const handleDelete = () => {
		dispatch(deleteTodoAsync({
			id
		}));
	}


	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed} onChange={handleCompleted}></input>
					{title}
				</span>
				<button className='btn btn-danger' onClick={handleDelete}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
