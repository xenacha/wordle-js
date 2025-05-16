/* 
   5글자 단어 (존재하지 않는 단어도 ok) 
   6번 시도 가능 
   존재하면 노란색, 위치도 맞으면 초록색
   게임 종료 판단 
   
(추가) 상단에 게임 시간 표시 
(선택) 키보드에도 동일하게 표시 
(선택) 키보드 클릭으로 입력
*/

/* 자바스크립트 : 변수명 -> 카멜표기법 */

const 정답 = "APPLE";

let index = 0; // 블xxxxxx럭의 인덱스 번호 (0~4까지 입력)
let attempts = 0; //attempts는 줄(row) : 단어를 몇 줄 입력했는가 (몇 번째 줄인가)
//index : 해당 줄에서 몇 번째 칸

let timer;

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return gameover(); //6줄 까지 시도 가능 -> attemps = 6 : 7번째 -> nextLine X
    attempts += 1; //다음 줄
    index = 0; // 칸 순서 초기화 -> 첫째 칸부터
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임 종료 되었습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left: 45vw; background-color:white; width: 200; height: 200;";
    document.body.appendChild(div); //appendChile : 자식을 추가 - body 에 자식태그 추가
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown); //게임 종료 시 키보드 입력 X
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.block[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === "") {
        return; // 아무 처리도 안 함
      } else if (입력한_글자 === 정답_글자) {
        block.style.backgroundColor = "#6AAA64"; // 초록
        맞은_갯수 += 1; // 맞은 글자만 카운트
      } else if (정답.includes(입력한_글자)) {
        block.style.backgroundColor = "yellow"; // 노랑
      } else {
        block.style.backgroundColor = "orange"; // 오답
        block.style.color = "white";
      }
    }

    if (맞은_갯수 === 5)
      gameover(); // 5개 다 맞으면 게임종료(키보드 안먹어야 함)
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      // index 가 0보다 클 때
      const preBlock = document.querySelector(
        `.block[data-index='${attempts}${index - 1}']`
      ); //앞 전 블럭 선택
      preBlock.innerText = ""; //내용삭제
    }

    if (index !== 0) index -= 1; // index 줄이기
  };

  const handleKeyDown = (event) => {
    /* event(e) 가 addEventListner 아래 handleKeyDown 함수에 전달 */
    const key = event.key.toUpperCase(); // 눌린 키
    const keyCode = event.keyCode;
    /* console.log("키가 눌렸습니다! event =>", event); */
    /* console.log(event.key, event.keyCode); */

    const thisBlock = document.querySelector(
      //HTML 문서의 특정 요소 선택 -> 블락 하나의 변수(this block) 선언
      `.block[data-index='${attempts}${index}']` // 원하는 변수 입력 -> 벡틱 `` 안에 ${} 사용
      //→ 클래스 "block" 의 data-index 속성값이 "${attempts}${index}" 인 것
      // date-index {0}번째 row + {0}번째 칸
    );

    // index 가 5일 때만 입력
    /*     if (index === 5) {
      if (event.key === "Enter") handleEnterKey(); // 5번째 Enter 키 입력 ->
      else return;
    }
 */

    if (event.key === "Backspace") handleBackspace();

    //Backspace 눌렀을 떄 다른 동작 일어나지 않도록

    if (event.key === "Enter") {
      //key: Enter -> 문자열 표시

      if (index !== 5) {
        // 5칸을 채우지 않고 Enter -> 아무 결과 X
        return;
      }
      handleEnterKey(); // 5개 다 입력했을 때만 실행
    } else if (index === 5) {
      // 몇 번째 칸인지 추적(6번째)
      return; // 5글자 넘으면 추가입력 막음
    } else if (65 <= keyCode && keyCode <= 90) {
      //0~4 까지는
      thisBlock.innerText = key; // 블럭 안에 누른 키 표시
      index += 1; // 실행 후 블럭 인덱스 증가 (index + = 1)(index++)
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  //키보드를 누르면(keydown), handleKeyDown() 함수를 실행
  //"keydown" : 웹 브라우저에서 내장된 표준 이벤트 이름

  const starTimer = () => {
    const 시작_시간 = new Date(); // 시작 시간

    function setTime() {
      const 현재_시간 = new Date();
      const 경과_시간 = new Date(현재_시간 - 시작_시간); // 경과 시간 (밀리초 단위)

      const 분 = 경과_시간.getMinutes().toString(); // 분 -> toString : 문자열로 변환
      const 초 = 경과_시간.getSeconds().toString(); // 초

      const timerDiv = document.querySelector("#timer"); // id가 time인 요소 선택, (class 인 경우 . 으로 호출)
      timerDiv.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
      // `${변수}` -> 변수 숫자로 인식  // "" -> 문자열로 인식
    }

    //정답 맞추면 타이머 멈춤

    timer = setInterval(setTime, 1000); // 1초마다 setTime 함수 호출
    //setInterval 의 아이디?
  };

  starTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
