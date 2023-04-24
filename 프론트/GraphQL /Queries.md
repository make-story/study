# GraphQL Queries 그래프QL 쿼리

https://graphql-kr.github.io/learn/queries/

# 단순쿼리

GraphQL Query

```
{
	user(id: "100") {
		name,
		email
}
```

The result data

```
{
	"user": {
		"id": "100",
		"name": "John Doe",
		"email": "john@gamil.com"
}
```

# 여러 리소스 반환 쿼리

GraphQL Query

```
{
	user(id: "100") {
		name,
		email,
		posts {
			title
		}
}
```

The result data

```
{
	"user": {
		"id": "100",
		"name": "John Doe",
		"email": "john@gamil.com",
		"posts": [
			{"title": "Post 1"},
			{"title": "Post 2"}
		]
}
```
