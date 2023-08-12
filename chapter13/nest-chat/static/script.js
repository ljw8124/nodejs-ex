// socket.io 인스턴스생성
// 네임스페이스 추가
// 네임스페이스는 복잡한 프로그램을 만들 시에 반드시 필요하다고 할 수 있다.
const socket = io('http://localhost:3000/chat');

// prompt 는 사용자에게 값을 받고 변수에 할당한다.
const nickname = prompt('닉네임을 입력해주세요.');

// console.log(socket);

// 전송 버튼 클릭시 입력된 글을 message 로 보냄
function sendMessage() {
  const message = document.querySelector('#message').value;
  const chatDiv = document.querySelector('#chat');

  const divEle = document.createElement('div');
  const messageNode = document.createTextNode(message);

  divEle.append(messageNode);

  chatDiv.append();

  socket.emit('message', {message, nickname});
}

socket.on('connect', () => {
  console.log('chat server connect!');
});

socket.on('message', (message) => {
  const chatDiv = document.querySelector('#chat');

  const divEle = document.createElement('div');
  const messageNode = document.createTextNode(message);

  divEle.append(messageNode);
  chatDiv.appendChild(divEle);
});