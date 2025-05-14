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

let index = 0; // 블럭의 인덱스 번호 (0~4까지 입력)
let attempts = 0; //attempts는 줄(row) : 단어를 몇 줄 입력했는가 (몇 번째 줄인가)
//index : 해당 줄에서 몇 번째 칸

function appStart() {
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

    if (event.key === "Enter") {
      //key: Enter -> 문자열 표시
      handleEnterKey(); // -->
    } else if (index === 5) {
      //index-> 몇 번째 칸인지 추적
      return; // 5글자(index 04까지)를 모두 입력 후 추가입력 막음 -> 6번째 no return
    } else if (65 <= keyCode && keyCode <= 90) {
      //0~4 까지는
      thisBlock.innerText = key; // 블럭 안에 누른 키 표시
      index += 1; // 실행 후 블럭 인덱스 증가 (index + = 1)(index++)
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  //키보드를 누르면(keydown), handleKeyDown() 함수를 실행
  //"keydown" : 웹 브라우저에서 내장된 표준 이벤트 이름
}

appStart();
