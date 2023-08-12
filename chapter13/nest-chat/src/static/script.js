// socket.io 인스턴스생성
// 네임스페이스 추가
// 네임스페이스는 복잡한 프로그램을 만들 시에 반드시 필요하다고 할 수 있다.
const socket = io('http://localhost:3000/chat');

// 채팅방용 네임스페이스 설정
const roomSocket = io('http://localhost:3000/room');

// prompt 는 사용자에게 값을 받고 변수에 할당한다.
const nickname = prompt('닉네임을 입력해주세요.');

// console.log(socket);

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', {room, nickname});
}

roomSocket.on("rooms", (dataArr) => {
  console.log(dataArr);

  // 채팅방 갱신시 일단 리스트를 비움
  const roomDiv = document.querySelector('#rooms');

  while(roomDiv.firstChild)  {
    roomDiv.removeChild(roomDiv.firstChild);
  }

  dataArr.forEach((data) => {
    const chatView = document.createElement('li');
    const textNode = document.createTextNode(data);

    chatView.appendChild(textNode);

    const joinBtn = document.createElement('button');
    joinBtn.innerText = 'join';
    joinBtn.addEventListener('click', (data) => {
      console.log(data);
    });

    chatView.appendChild(joinBtn);

    roomDiv.append(chatView);
  });

})

function joinRoom(data) {

  console.log(data);

  return data;
}

// 전송 버튼 클릭시 입력된 글을 message 로 보냄
function sendMessage() {
  const message = document.querySelector('#message').value;
  const chatDiv = document.querySelector('#chat');

  const divEle = document.createElement('div');
  const messageNode = document.createTextNode(message);

  divEle.appendChild(messageNode);

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
