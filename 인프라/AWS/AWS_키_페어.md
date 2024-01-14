# 키 페어 (Key-pair, Key pair)

https://inpa.tistory.com/entry/AWS-%F0%9F%93%9A-%ED%82%A4%ED%8E%98%EC%96%B4SSH-Key-%EB%B6%84%EC%8B%A4%EC%8B%9C-%EB%B3%B5%EA%B5%AC%ED%95%98%EB%8A%94-2%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95

키페어를 분실하면, 그 키페어를 다시 복구하는 방법은 없다.  
따라서 키페어를 분실하여 ssh 접속을 못하는 인스턴스에 등록된 키페어를 다른 것으로 교체해서 다시 접속하게 해주는 방법으로 복구해야 한다.

https://repost.aws/ko/knowledge-center/user-data-replace-key-pair-ec2

`Key-pair 란?클라우드 서버에 접속하기 위한 암호화 파일`로,  
`aws 인스턴스는 퍼블릭 키를 인스턴스에 저장하고, 사용자는 프라이빗 키를 저장`한다.

그리고 확장자가 pem인 파일과 ppk인 파일로 접속하는 형태이다.  
key-pair는 공개키(Public Key)와 비공개키(Private Key)를 이야기하며, 여기서 Public Key가 pem파일, Private Key가 ppk파일이 된다.
