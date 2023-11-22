# Node.js 스트림(Stream)과 버퍼(Buffer)

https://real-dongsoo7.tistory.com/70

https://curryyou.tistory.com/440

## 스트림

1.입출력 데이터를 입출력 순서에 의해서 순차적으로 처리되는 데이터 열  
2.데이터를 이동시킬 수 있는 다리  
3.전송되어야할 크기만큼 바이트들이 모여 만들어진 통로  
4.통신을 목적으로한 바이트 단위의 집합

Node.js에서 스트림의 타입은 총 4가지가 있습니다.

- Writable : 데이터를 작성할 수 있는 스트림입니다. ex) fs.createWriteStream()
- Readable : 데이터를 읽어들일 수 있는 스트림입니다. ex) fs.createReadStream()
- Duplex : 데이터의 읽기(Readable)과 쓰기(Writable) 모두 가능합니다. (ex net.Socket)
- Transform - Duplex 스트림은 수정하거나 변환이 가능합니다. ex) zlib.createDeflate()
  부가적으로 이 모듈은 pipeline과 finished를 포함하고 있습니다.

Node.js Stream에서는 Buffer기능 또한 제공합니다.  
Writable 그리고 Readable 스트림은 내부 버퍼에 데이터를 저장 하며, writable.writableBuffer 혹은 readableBuffer를 통해 검색이 가능합니다.

## 버퍼

버퍼는 기본적으로 입출력 전송 속도차이에 대한 성능을 보완하기 위해 사용합니다.  
입력속도에 비해 출력속도가 느린경우 데이터를 임시 저장하는 공간을 말하며, 임시저장장치라고도 합니다.

예를들어 사용자는 1초에 100개의 데이터, 프로그램은 1초에 5개의 데이터를 처리 할 수있다고 가정해봅시다.  
프로그램에서 처리를 진행하는 동안 입력장치를 통해 들어오는 데이터는 대기를 해야하는 상황이 됩니다.  
이러한 상황을 방지하기 위해 입력받은 데이터를 버퍼라는 임시공간에 저장해두고 프로그램에서 처리할 수 있는 상황이 혹은 버퍼가 꽉차게 되거나  
개행문자가 입력되게 되면 버퍼에 저장된 데이터를 한 번에 전송하게 됩니다.

# Node.js Stream

https://the-amy.tistory.com/8
