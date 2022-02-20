# SSH? 
SSH란 Secure Shell Protocol,  
즉 네트워크 프로토콜 중 하나로 컴퓨터와 컴퓨터가 인터넷과 같은 Public Network를 통해 서로 통신을 할 때  
보안적으로 안전하게 통신을 하기 위해 사용하는 프로토콜입니다.   

대표적인 사용의 예는 다음과 같습니다.
- 데이터 전송  
- 원격 제어  


-----


# SSH 사용 이유?
FTP 나 Telnet 과 같은 다른 컴퓨터와 통신을 위해 사용되는 프로토콜도 있는데 SSH를 사용하는가를 생각해볼 수 있습니다.  
그 이유는 물론 "보안"입니다.  
만일 예로 언급한 두 프로토콜을 통해 민감한 정보(예를 들어 로그인 정보)를 주고받는다면 정보를 직접 네트워크를 통해 넘기기 때문에  
누구나 해당 정보를 열어볼 수 있어 보안에 상당히 취약합니다.  

## Private Key and Public Key
SSH는 다른 컴퓨터와 통신을 하기 위해 접속을 할 때 우리가 일반적으로 사용하는 비밀번호의 입력을 통한 접속을 하지 않습니다.  
기본적으로 SSH는 한 쌍의 Key를 통해 접속하려는 컴퓨터와 인증 과정을 거치게 됩니다.   

이 한 쌍의 Key는 다음과 같습니다.  
- Private Key
- Public Key

먼저 Public Key 는 단어 뜻 그대로 공개되어도 비교적 안전한 Key입니다.  
이 Public Key를 통해 메시지를 전송하기 전 암호화를 하게 됩니다. 
Public Key로는 암호화는 가능하지만 복호화는 불가능합니다.  

그리고 이와 쌍을 이루는 Private Key는 절대로 외부에 노출이 되어서는 안되는 Key로 본인의 컴퓨터 내부에 저장하게 되어있습니다.  
이 Private Key를 통해 암호화된 메시지를 복호화 할 수 있습니다.  

## SSH Key 만들기
https://velog.io/@hyeseong-dev/%EB%A6%AC%EB%88%85%EC%8A%A4-ssh%EB%9E%80  
1. macOS는 유닉스개열의 운영체제로 OpenSSH를 기본으로 포함하고 있기 대문에 ssh-keygen을 사용해 간단히 key 를 생성할 수 있다.  
```
$ ssh-keygen -t rsa
# -t옵션으로 어떤 타입의 암호화 방식을 사용할 것인지 지정할 수 있다.(default가 rsa)
```
2. 어디에 key를 생성하여 저장할지를 묻는다. 엔터를 누르면 기본경로에 저장된다.
```
Generating public/private rsa key pair.
Enter file in which to save the key (기본경로):
```
3. ssh를 사용할때 비밀번호를 사용할지를 묻는다. 당연히 비밀번호를 설정하면 설정하지 않는것 보단 더 안전하다. 이 과정이 끝나면 key가 생성된다.
```
Created directory '경로'
Enter passphrase (empty for no passphrase):
```

key를 확인하고 싶다면 저장한 경로로 이동하면 된다.
```
$ ls -al /경로/

total 16
drwx------   4 user  staff   128  6  7 15:07 .
drwxr-xr-x+ 31 user  staff   992  6  7 15:05 ..
-rw-------   1 user  staff  1876  6  7 15:07 id_rsa
-rw-r--r--   1 user  staff   403  6  7 15:07 id_rsa.pub
```
`id_rsa가 개인키 id_rsa.pub가 공개키`이다.  
권한을 보면 개인키는 사용자만이 읽고 쓸 수 있고(600), 공개키는 다른 사용자도 읽을 수 있는 권한(644)을 가지고있다.  
`접속하고자 하는 컴퓨터에 공개키을 등록`해 놓으면, 이후 SSH로 접근할때 개인키와 비교하여 인증한다.  