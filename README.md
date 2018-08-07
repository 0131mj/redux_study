# 리덕스 공부



## 카운터 만들기



### 애플리케이션 구조

- actions : 액션타입, 액션 생성자 파일 저장
- components : 뷰만을 담당하는 presentational 컴포넌트 저장
- containers : store에 접근이 닿는 container컴포넌트 저장
- reducers: 스토어의 기본상태와, 상태의 업데이트를 담당하는 리듀서 파일 저장
- utils : 일부 컴포넌트들에서 공용되는 파일 저장



### Counter 컴포넌트 

뷰만을 담당하는 컴포넌트로, 아래와 같이 함수와  프로퍼티를 때려넣어서 하나의 엘리먼트를 리턴하도록 만들 수 있다. 

```react
const Counter = ({number, color, onIncrement, onDecrement, onSetColor}) => {
    return (
        <div 
            className="Counter" 
            onClick={onIncrement} 
            onContextMenu={
                (e) => { 
                    e.preventDefault(); 
                    onDecrement();
                }
            } 
            onDoubleClick={onSetColor}
            style={{backgroundColor: color}}>
                {number}
        </div>
    );
};
```



프롭타입스를 먼저 정의하고, defaultProps를 정의했다. 

#### PropType이란 무엇인가?

내생각에 프롭타입스라는 것은 프롭의 타입이 잘못들어오지 않도록 강제하는 기능 같다. 

##### 사용법

propTypes.object.isRequired

자료형을 먼저 선언해주고, 필수인지를 뒤에 쓴다. 



#### defaultProps란 무엇인가?



#### action

- 액션은 하나의 객체이다. 
- 모든 액션 객체는 type이라는 값을 지니고 있어야 한다. 
- 여기서 type이란, 일종의 액션을 구분해주는 식별자와 같다.

액션을 만들때 마다 객체를 그때그때 만들기가 힘들다는 말이 무슨말인가?



##### 액션 타입의 정의 

```javascript
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
```

관례적으로, 액션타입은 대문자로 쓴다. 과연 이게 뭐하는 짓인지, 잘 이해가 가지는 않는데 (그냥 텍스트가 타입이라서)  스트링값을 읽어서 변수명으로 지정해놓고 쫙 넣으면 안되나?

방법이 있는데 eval()을 쓰면된다. 하지만 이걸 매번 쓸수도 없고... 그냥 한번만 더쓰면되니 그냥 귀찮더라도 좀 쓰자. 뭔가 방법이 있을거 같긴하다. SETTER 뭐이런 라이브러리?

이렇게 힘들여서 노가다로 완성시켜 놓은... 타입은 리듀서에서도 또 써먹는다. 





#### reuducer

- 리듀서는 액션의 type에 따라 변화를 일으키는 함수이다. 
- 리듀서에는 초기상태가 정의되어 있어야 한다.  왜??? 리듀서는 '변화'를 일으키는 함수이기 때문이다. 이전 상태가 뭐가되었든 있긴 있어야 바꿀거 아닌가.

```javascript
import * as types from '../actions/ActionTypes'
```

이렇게 * 를 써서 부르면 types라는 하나의 객체에 저 액션타입스에 있는 놈들이 객체형태로 다 담긴다. 모든 형식이? 맞나?

##### 리듀서 함수

- state와 action을 파라미터로 가지는 함수,
- 내부에서 switch 문을 통해 action.type의 상태에 따라 다른 변화를 일으키면 된다. 

```javascript
import * as types from '../actions/ActionTypes'

const initialState = {
    color: 'black',
    number : 0
};

function counter(state = initialState, action) {
    switch (action.type) {
        case types.INCREMENT:
            return{
                ...state,
                number: state.number + 1
            };
        case types.DECREMENT:
            return{
                ...state,
                number: state.number - 1
            };
        case types.SET_COLOR:
            return{
                ...state,
                color:action.color
            };
        default:
            return state;
    }
}
```

되돌려주는 값은 나머지 스테이트와 변화된 값이다. 



#### store

- 스토어는 리덕스에서 가장 핵심적인 인스턴스
- 스토어 안에는 현재 상태를 내장하고 있고, 구독중인 함수들이 상태가 업데이트 될 때마다 다시 실행되게 해줌.

```javascript
// 리덕스 관련 불러오기
import { createStore } from 'redux'
import reducers from './reducers';

const store = createStore(reducers);
```

리덕스에서 createStore라는 함수를 땡겨온다. 

리듀서도아까 만든 곳에서 땡겨온다. 

근데 문법이... 그냥 폴더 전체에서 reducers라고 땡겨올수도 있나보다. 



#### provider

- 프로바이더는 react-redux 라이브러리에 내장되어있다.
- 프로바이더는 리액트 앱에 store를 손쉽게 연동할 수 있도록 도와준다. 
- 프로바이더로 연동할 컴포넌트를 감싸준 다음에, props로 store 값을 설정해준다. 

```react
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
```



#### container

- mapStateToProps : 상태를 연결
- mapDispatchToProps : 액션함수를 연결
- connect : 이 둘을 묶어준다. 

```javascript
const CounterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);
```

- 왜? 둘을 꼭 묶어야 하나? 이런식으로 되어야할 필연적인 이유가 있나?



### Reducer 쪼개기 : 서브리듀서 만들기

색상에 관련된 액션은 색상대로, 숫자에 대한 액션은 숫자대로 나눈다. 

redux 의 combineReducers 라는 녀석으로 이 둘을 묶는다.



---



## 멀티 카운터 만들기

#### 리덕스 개발자 도구

```react
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
```

윈도우에 리덕스 개발툴 익스텐션이 있다면, 이걸 실행하라는 코드임.



#### 리듀서에서 추가 삭제 구현

```react
counters: counter.slice(0, counters.length) -1
```

- 맨 마지막 카운터를 제외, 
- 이 예제는 버튼을 눌러서 맨마지막꺼를 제거하는 로직이기 때문에 이렇게 구현한 것이고, 다른 경우에는 제거할 인덱스를 받아서 밀어넣어줘야 함.



#### Proptypes

- 타입을 체크하기 위한 기능

---

예제는 velopert의 블로그를 참고했음.

https://velopert.com/3346