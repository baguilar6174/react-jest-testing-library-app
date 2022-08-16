import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TestingApp } from './TestingApp';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<TestingApp />
	</React.StrictMode>
);
