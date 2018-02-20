
import jest from 'jest';


const localStorageMock = {
	removeItem: jest.fn(),
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn()
};
global.localStorage = localStorageMock;


export default localStorageMock