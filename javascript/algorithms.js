// ---------- ---------- ---------- ---------- 자료구조

/*
-
리스트
리스트는 순서가 있는 일련의 데이터 집합이다. 
리스트에 저장된 각 데이터 항목을 요소라 부른다.
JS에서는 모든 데이터형이 리시트의 요소가 될 수 있다.
데이터 저장순서가 중요하지 않거나, 저장된 데이터를 검색할 필요가 없을 때 요긴한 자료구조다.
-
사용예
var names = new List();
names.append('test1');
names.append('test2');
for(names.front(); names.currPos() < names.length(); names.next()) {
	console.log(names.getElement());
}
*/
	function List() {
		this.listSize = 0;
		this.pos = 0; // 현재위치(리스트 탐색에 사용)
		this.dataStore = []; // 리스트 요소를 저장할 빈 배열 초기화
	}

	// 새 요소를 리스트 끝에 추가
	List.prototype.append = function(element) {
		this.dataStore[this.listSize++] = element;
	};

	// 요소 찾기
	List.prototype.find = function(element) {
		for(var i=0; i<this.dataStore.length; ++i) {
			if(this.dataStore[i] == element) {
				return i;
			}
		}
		return -1;
	};

	// 리스트의 요소 삭제
	List.prototype.remove = function(element) {
		var foundAt = this.find(element);
		if(foundAt > -1) {
			this.dataStore.splice(foundAt, 1);
			--this.listSize; // 전체 리스트 크기 -1 
			return true;
		}
		return false;
	};

	// 리스트의 요소 수 반환
	List.prototype.length = function() {
		return this.listSize;
	};

	// 리스트를 문자열로 표현해 반환
	List.prototype.toString = function() {
		return this.dataStore;
	};

	// 기존 요소 위로 새 요소를 추가
	List.prototype.insert = function(element, after) {
		var insertPos = this.find(after);
		if(insertPos > -1) {
			this.dataStore.splice(insertPos+1, 0, element);
			++this.listSize;
			return true;
		}
		return false;
	};

	// 리스트의 모든 요소 삭제
	List.prototype.clear = function() {
		delete this.dataStore;
		this.dataStore.length = 0;
		this.listSize = this.pos = 0;
	};

	// 특정값이 있는지 확인
	List.prototype.contains = function(element) {
		for(var i=0; i<this.dataStore.length; ++i) {
			if(this.dataStore[i] == element) {
				return true;
			}
		}
		return false;
	};

	// 리스트 탐색
	List.prototype.front = function() {
		this.pos = 0;
	};
	List.prototype.end = function() {
		this.pos = this.listSize - 1;
	};
	List.prototype.prev = function() {
		if(this.pos > 0) {
			--this.pos;
		}
	};
	List.prototype.next = function() {
		if(this.pos < this.listSize-1) {
			++this.pos;
		}
	};
	List.prototype.currPos = function() {
		return this.pos;
	};
	List.prototype.moveTo = function(position) {
		this.pos = position;
	};
	List.prototype.getElement = function() {
		return this.dataStore[this.pos];
	};

/*
-
스택 LIFO(Last In First Out) 후입선출
스택은 요소 리스트로 구성되며 탑이라 불리는 리스트이 한쪽 끝으로만 요소에 접근할 수 있다.
스택의 후입선출이라는 특성 때문에 스택의 탑에 있지 않은 요소에는 접근할 수 없다.
스택의 밑바닥에 있는 요소에 접근하려면 모든 요소를 제거하는 수밖에 없다.
*/
	function Stack() {
		this.dataStore = [];
		this.top = 0; // 스택의 탑위치
	}

	// 요소 추가
	Stack.prototype.push = function(element) {
		this.dataStore[this.top++] = element;
	};
	
	// 탑 위치에 있는 요소를 반환한 다음 top 감소
	Stack.prototype.pop = function() {
		return this.dataStore[--this.top];
	};

	// 탑 위치에 있는 요소를 반환 (top 감소 안함)
	Stack.prototype.peek = function() {
		return this.dataStore[this.top-1];
	};

	// 요소 개수
	Stack.prototype.length = function() {
		return this.top;
	};

	// 전체요소 삭제
	Stack.prototype.clear = function() {
		this.top = 0;
	};

/*
-
큐 FIFO (First In First Out) 선입선출
리스트의 일종으로 끝부분으로 데이터가 삽입되고 앞부분에서는 데이터가 삭제되는 자료구조다.
큐는 일어난 순서대로 데이터를 저장하는 자료구조로 가장 나중에 들어간 데이터가 가장 먼저 처리되는 스택과 정반대 순서로 데이터를 처리한다.
큐는 선입선출 자료구조다.
큐에 요소를 삽입하는 동작은 인큐, 큐에서 요소를 삭제하는 동작은 데큐라고 한다.
인큐는 큐에 끝부분에 요소를 추가하며 데큐는 큐의 앞부분에서 요소를 삭제한다.
*/
	function Queue() {
		this.dataStore = [];
	}

	// 끝부분에 요소를 추가
	Queue.prototype.enqueue = function(element) {
		this.dataStore.push(element);
	};

	// 앞부분에서 요소를 삭제 (요소 반환)
	Queue.prototype.dequeue = function() {
		return this.dataStore.shift();
	};

	// 요소 확인 (앞부분)
	Queue.prototype.front = function() {
		return this.dataStore[0];
	};

	// 요소 확인 (끝부분)
	Queue.prototype.back = function() {
		return this.dataStore[this.dataStore.length-1];
	};

	// 모든 요소 출력
	Queue.prototype.toString = function() {
		var retStr = '';
		for(var i=0; i<dataStore.length; ++i) {
			retStr += this.dataStore[i];
		}
		return retStr;
	};

	// 마지막 큐가 비었는지 확인
	Queue.prototype.empty = function() {
		if(this.dataStore.length == 0) {
			return true;
		}else {
			return false;
		}
	};

/*
-
연결리스트 (첫번째 데이터 노드 - 두번째 데이터 노드 - ... )
JS배열은 객체이므로 C++이나 자바(더글라스 크락포드의 자바스크립트 핵심가이드 6장 참조)등의 배열에 비해 효율이 떨어진다.
노드라 불리는 객체가 모여 연결리스트를 구성한다.
각 노드는 객체 레퍼런스를 통해 리스트의 다른 노드와 연결된다.
다른 노드를 참조하는 레퍼런스를 링크라 한다.
연결 리스트의 마지막은 null로 끝나는데 이는 연결 리스트의 끝을 가리킨다.
많은 연결 리스트 구현에서는 헤더라 불리는 특별한 노드를 이용해 연결 리스트의 시작을 표현한다.

추가적으로 양방향 연결리스트, 순환형 연결리스트가 있음.
-
사용예
var cities = new LList();
cities.insert('Conway', 'head');
cities.insert('Russellville', 'Conway');
cities.insert('Alma', 'Russellville');
cities.display();
cities.remove('Russellville');
cities.display();
*/
	function Node(element) {
		this.element = element;
		this.next = null; // 리스트의 마지막은 null
	}

	// Linked List (연결리스트)
	function LList() {
		this.head = new Node('head'); // 연결리스트의 시작 head
	}

	// 노드 삽입
	// 노드를 추가하려면 어떤 노드를 추가할 것이고, 어느 노드의 뒤 혹은 앞에 추가할지를 지정해야 한다.
	// 기존 노도를 찾았으면 새 노드의 next 프로퍼티를 기존 노드의 next 프로퍼티 값으로 설정한다.
	LList.prototype.find = function(item) {
		var currNode = this.head;
		while(currNode.element != item) {
			currNode = currNode.next; // next(다음) 연결노드로 이동하며, 동일한 값이 있는 노드를 찾는다.
		}
		return currNode;
	};
	LList.prototype.insert = function(newElement, item) {
		var newNode = new Node(newElement);
		var current = this.find(item);
		newNode.next = current.next;
		current.next = newNode;
	};

	// 연결리스트 요소 출력
	LList.prototype.display = function() {
		var currNode = this.head;
		while(currNode != null) {
			console.log(currNode.next.element);
			currNode = currNode.next;
		}
	};

	// 요소 삭제
	// 연결리스트에서 노드를 삭제하려면 삭제하려는 바로 이전 노드를 찾아야 한다.
	// 이전 노드를 찾았으면 이전 노드의 next 프로퍼티를 삭제하려는 노드의 다음 노드로 설정해야 한다.
	LList.prototype.findPrevious = function(item) {
		var currNode = this.head;
		while(currNode != null && (currNode.next.element != item)) {
			currNode = currNode.next;
		}
		return currNode;
	};
	LList.prototype.remove = function(item) {
		var prevNode = this.findPrevious(item);
		if(prevNode.next != null) {
			// 삭제하려는 노드를 가리키지 않도록 이전 노드의 링크를 우회시켜 원하는 노드를 삭제
			prevNode.next = prevNode.next.next;
		}
	};

/*
-
딕셔너리 (JSON Object 처럼 key:value)
전화번호부에 이름과 전화번호로 데이터를 저장하는 것처럼 데이터를 키와 값쌍으로 저장하는 자료구조다.
키로 검색을 수향하며, 검색 결과로 값을 반환한다.
JS Object 클래스는 딕셔너리 형식으로 동작하게 설계되었다.
JS에서는 배열 역시 객체라는 사실을 기억하자.
*/
	function Dictionary() {
		this.datastore = new Array();
	}

	// 요소 추가
	Dictionary.prototype.add = function(key, value) {
		this.datastore[key] = value;
	};

	// 요소 검색
	Dictionary.prototype.find = function(key) {
		return this.datastore[key];
	};

	// 요소 삭제
	Dictionary.prototype.remove = function(key) {
		delete this.datastore[key];
	};

	// 모든 요소 출력
	Dictionary.prototype.showAll = function() {
		for(var key in this.datastore) {
			console.log(this.datastore[key]);
		}
	};

/*
-
해싱
데이터를 단시간에 삽입하거나 저장된 데이터를 가져올 때 주로 사용하는 기법이다.
해싱은 해시 테이블이라는 자료구조를 이용한다.
해싱을 이용하면 데이터를 빠르게 삽입하고, 삭제하고, 가져올 수 있지만, 최솟값이나 최댓값 찾기 등 검색 동작은 효율이 떨어진다.
검색이 필요한 상황이라면 이진 탐색 트리 사용하는 것이 좋다.
해시 테이블 자료구조는 배열을 이용한다.
이론적으로 해시 함수는 각 키를 자체 배열 요소로 저장한다.
*/
	function HashTable() {
		this.table = new Array();
	}

	// 해시 값
	HashTable.prototype.hash = function(string) {
		var H = 37;
		var total = 0;
		for(var i=0; i<string.length; ++i) {
			total += H * total + string.charCodeAt(i); // string.charCodeAt(index): index에 해당하는 문자의 unicode 값을 리턴
		}
		total = total % this.table.length;
		if(total < 0) {
			total += this.table.length-1;
		}
		return parseInt(total);
	};

	// 데이터 추가
	// 키를 해시한 다음 해시 함수의 계산 결과로 나온 위치를 이용해 테이블에 데이터를 저장
	HashTable.prototype.put = function(key, data) {
		var pos = this.hash(key);
		this.table[pos] = data;
	};

	// 데이터 출력
	HashTable.prototype.get = function(key) {
		return this.table[this.hash(key)];
	}

	// 데이터 전체 출력
	HashTable.prototype.showDistro = function() {
		var n = 0;
		for(var i=0; i<this.table.length; ++i) {
			if(this.table[i] != undefined) {
				console.log(this.table[i]);
			}
		}
	};

/*
-
집합
고유한 요소의 모임을 집합이라 하고, 집합의 요소를 멤버라 한다.
집합의 멤버는 정렬되어 있지 않으며, 집합의 멤버는 고유(유일)하다는 것이 집합의 중요한 두 가지 특징이다.
집합은 텍스트에서 고유의 단어 목록을 추출하는 등 고유한 요소로 이루어진 집합이 필요한 상황에서 유용하게 사용할 수 있는 자료구조다.
합집합, 교집합, 차집합

멤버가 하나도 없는 집합을 빈 집합이라고 부르고, 집합에 포함될 수 있는 모든 멤버를 포함하는 집합을 유니버스라 한다.
두 집합의 멤버가 정확하게 같을 때만 같은 집합으로 간주한다.
한 집합의 모든 멤버가 다른 집합에 포함되어 있을 때 이 집합을 다른 집합의 서브집합으로 간주한다.

합집합: 한 집합의 멤버와 다른 집합의 멤버를 합쳐 새로운 집합을 만든다.
교집합: 한 집합과 다른 집합 모두에 존재하는 멤버로 새로운 집합을 만든다.
차집합: 한 집합의 멤버 중 다른 집합에 존재하지 않는 멤버로만 새로운 집합을 만든다.
*/
	function Set() {
		this.dataStore = [];
	}

	Set.prototype.add = function(data) { // 값 추가
		if(this.dataStore.indexOf(data) < 0) { // -1: 검색값 없음
			this.dataStore.push(data);
			return true;
		}else {
			return false;
		}
	};

	Set.prototype.remove = function(data) { // 값 삭제
		var pos = this.dataStore.indexOf(data);
		if(pos > -1) {
			this.dataStore.splice(pos, 1);
			return true;
		}else {
			return false;
		}
	};

	Set.prototype.show = function() { // 값 전체보기
		return this.dataStore;
	};

	// 합집합
	// 특정 멤버가 집합에 포합되어 있는지 여부를 먼저 확인 (중복 삽입 방지)
	Set.prototype.contains = function(data) {
		if(this.dataStore.indexOf(data) > -1) {
			return true;
		}else {
			return false;
		}
	};
	Set.prototype.union = function(set) {
		var tempSet = new Set(); 
		for(var i=0; i<this.dataStore.length; ++i) {
			tempSet.add(this.dataStore[i]); // prototype.add: 값 추가
		}
		for(var i=0; i<set.dataStore.length; ++i) {
			if(!tempSet.contains(set.dataStore[i])) { // prototype.contains: 특정값 포함여부
				tempSet.dataStore.push(set.dataStore[i]); // Array push 기본메서드
			}
		}
		return tempSet;
	};

	// 교집합 
	// 두 집합 A, B에서 A와 B에 모두 있는 원소만 담는다.
	Set.prototype.intersect = function(set) {
		var tempSet = new Set();
		for(var i=0; i<this.dataStore.length; ++i) {
			if(set.contains(this.dataStore[i])) { // prototype.contains: 특정값 포함여부
				tempSet.add(this.dataStore[i]); // prototype.add: 값 추가
			}
		}
		return tempSet;
	};

	// 부분집합 - 먼저 인자로 제공한 집합의 크기가 비교 대상 집합의 크기보다 큰 지 확인한다. 
	// 두 집합 A, B에서 집합 A의 모든 원소가 집합 B에 포함될 때, A를 B의 부분집합이라 한다.
	Set.prototype.size = function() {
		return this.dataStore.length;
	};
	Set.prototype.subset = function(set) {
		if(this.size() > set.size()) { // prototype.size: 값 전체 개수
			return false;
		}else {
			for(var i=0; i<this.dataStore.length; ++i) {
				if(!set.contains(this.dataStore[i])) { // prototype.contains: 특정값 포함여부
					return false;
				}
			}
		}
		return true;
	};

	// 차집합
	// 두 집합 A, B에서 A의 원소 중 B의 원소를 뺀다.
	Set.prototype.difference = function(set) {
		var tempSet = new Set();
		for(var i=0; i<this.dataStore.length; ++i) {
			if(!set.contains(this.dataStore[i])) { // prototype.contains: 특정값 포함여부
				tempSet.add(this.dataStore[i]); // prototype.add: 값 추가
			}
		}
		return tempSet;
	};

/*
-
이진트리와 이진 검색 트리
데이터를 계층적으로 저장하는 비연속 형식의 자료구조로, 파일시스템에 파일을 저장하거나 정렬된 데이터 리스트 등 계층적인 데이터를 저장할 때 사용된다.
트리는 에지로 연결된 노드의 집합이다.
각각의 상자가 노드며 상자를 연결하는 선이 에지다.

트리의 최상위 노드를 루트노드라고 한다.
한 노드가 아래 노드와 연결되어 있을 때 위에 있는 노드를 부모노드라고 하며,
부모 노드의 아래에 있는 모든 노드를 자식노드라고 한다.
한 노드는 0개 이상의 노드와 연결될 수 있다.
자식 노드가 없는 노드를 리프노드라 부른다.

이진 트리는 모든 노드의 자식 노드 수가 2개 이하인 특수한 노드를 가리킨다.
이진 트리에서는 부모 노드의 자식 노드를 왼쪽노드와 오른쪽노드로 표현한다.

이진 검색 트리라는 조금 특별한 종류의 이진 트리에서는 자식 노드의 순서가 중요한 의미를 갖는다.
이진 검색 트리는 작은 값을 왼쪽 노드에, 큰 값을 오른쪽 노드에 저장한다.
이진 검색 트리(BST)를 구현하는 클래스를 만들어야 한다. 이진 검색 트리 클래스는 BST의 루트 노드를 의미하는 한 개의 데이터 멤버와 Node 객체를 포함한다.
*/
	function TreeNode(data, left, right) {
		this.data = data;
		this.left = left; // 왼쪽노드
		this.right = right; // 오른쪽노드
	}
	TreeNode.prototype.show = function() {
		return this.data;
	}

	function BST() {
		this.root = null; // 트리의 최상위 노드
	}
	BST.prototype.insert = function(data) {
		var n = new TreeNode(data, null, null);
		if(this.root == null) { // 최상위 노드가 비어있는지 확인
			this.root = n;
		}else {
			var current = this.root;
			var parent;
			while(true) {
				parent = current;
				if(data < current.data) {
					current = current.left;
					if(current == null) {
						parent.left = n;
						break;
					}
				}else {
					current = current.right;
					if(current == null) {
						parent.right = n;
						break;
					}
				}
			}
		}
	};

	// 이진 검색 트리 탐색
	/*
	// 전위 탐색
	1. 루트(최상위) 노드부터 시작해서 아래로 내려 오면서
 	2. 왼쪽 하위 트리를 방문하고 왼쪽 하위 트리의 방문이 끝나면
 	3. 오른쪽 하위 트리를 방문하는 방식
 	*/
	function preOrder(node) { // 최상위 노드를 먼저 찾기때문에 Pre
		if(!(node == null)) {
			console.log(node.show());
			preOrder(node.left);
			preOrder(node.right);
		}
	}
	/*
	// 중위 탐색
	1. 왼쪽 하위 트리부터 시작해서
 	2. 루트(부모)를 거쳐
 	3. 오른쪽 하위 트리를 방문하는 방법
	*/
	function inOrder(node) { // 최상위 노드를 중간에 찾기때문에 In
		if(!(node == null)) {
			inOrder(node.left);
			console.log(node.show());
			inOrder(node.right);
		}
	}
	/*
	// 후위 탐색
	1. 왼쪽 하위 트리부터 시작해서
 	2. 오른쪽 형제 노드를 방문 후
 	3. 루트(부모) 노드를 방문하는 방법
	*/
	function postOrder(node) { // 최상위 노드를 마지막에 찾기때문에 Post
		if(!(node == null)) {
			postOrder(node.left);
			postOrder(node.right);
			console.log(node.show());
		}
	}

	// 최솟값 최댓값 검색
	// 최솟값
	BST.prototype.getMin = function() {
		var current = this.root;
		while(!(current.left == null)) {
			current = current.left;
		}
		return current.data;
	};
	// 최댓값
	BST.prototype.getMax = function() {
		var current = this.root;
		while(!(current.right == null)) {
			current = current.right;
		}
		return current.data;
	};

	/*
	-
	사용예
	var nums = new BST();
	nums.insert(23);
	nums.insert(45);
	nums.insert(16);
	var min = nums.getMin();
	console.log(min);
	var max = nums.getMax();
	console.log(max);
	*/

	// 특정값 검색
	BST.prototype.find = function(data) {
		var current = this.root;
		while(current.data != data) {
			if(data < current.data) {
				current = current.left;
			}else {
				current = current.right;
			}
			if(current == null) {
				return null;
			}
		}
		return current;
	};




