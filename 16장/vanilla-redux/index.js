import { createStore } from "redux";

// DOM reference 만들기
const divToggle = document.querySelector('.toggle'); // 해당 css에 해당하는 DOM 요소 선택
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// action(대문자) type, action함수 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference});
const decrease = () => ({ type: DECREASE });

// 초기값 설정
const initialState = {
    toggle: false,
    counter: 0,
};

// reducer함수 정의 state=undefined 일 때 initialState가 기본값으로 사용
function reducer(state=initialState, action) {
    switch (action.type) {
        case TOGGLE_SWITCH: 
            return {
                ...state, // 불변성 유지
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

// store 만들기
const store = createStore(reducer);

// render 함수 만들기
const render = () => {
    const state = store.getState();
    console.log(state);
    // 토글 처리
    if (state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    // 카운터 처리
    counter.innerText = state.counter;
}

render();
// 구독하기
store.subscribe(render);

// 액션발생시키기
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
    store.dispatch(decrease());
};
