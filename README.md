# 리덕스 공부







## 카운터 만들기



### 애플리케이션 구조

- actions : 액션타입, 액션 생성자 파일 저장
- components : 뷰만을 담당하는 presentational 컴포넌트 저장
- containers : store에 접근이 닿는 container컴포넌트 저장
- reducers: 스토어의 기본상태와, 상태의 업데이트를 담당하는 리듀서 파일 저장
- utils : 일부 컴포넌트들에서 공용되는 파일 저장



#### action

- 액션은 하나의 객체이다. 
- 모든 액션 객체는 type이라는 값을 지니고 있어야 한다. 
- 여기서 type이란, 일종의 액션을 구분해주는 식별자와 같다.



#### reuducer

- 리듀서는 액션의 type에 따라 변화를 일으키는 함수이다. 
- 리듀서에는 초기상태가 정의되어 있어야 한다. 



#### store

- 스토어는 리덕스에서 가장 핵심적인 인스턴스
- 스토어 안에는 현재 상태를 내장하고 있고, 구독중인 함수들이 상태가 업데이트 될 때마다 다시 실행되게 해줌.



#### provider

- 프로바이더는 react-redux 라이브러리에 내장되어있다.
- 프로바이더는 리액트 앱에 store를 손쉽게 연동할 수 있도록 도와준다. 
- 프로바이더로 연동할 컴포는트를 감싸준 다음에, props로 store 값을 설정해준다. 



#### container

- mapStateToProps : 상태를 연결
- mapDispatchToProps : 액션함수를 연결
- connect : 이 둘을 묶어준다. 

---

예제는 velopert의 블로그를 참고했음.

https://velopert.com/3346