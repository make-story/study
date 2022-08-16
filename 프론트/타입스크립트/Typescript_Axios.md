```javascript
export interface CategoryItem {
  name: string;
  imgUrl: string;
  children: CategoryItem[];
}

const getCategoryList = (params: any) => {
  return axios.get<CategoryItem[]>(`/menus/categories`).then(res => ({ data: res.data }));
};
```