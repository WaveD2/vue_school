# VUE SCHOOL --- [WAVED]

##

```
npm clone https://github.com/WaveD2/vue_school.git

npm i

npm run dev
```

```
life cycle
1 . cài đặt dữ liệu (data observation)
2 . biên dịch template
3. kết nối Instance tới DOM
4. cập nhật DOM khi dữ liệu có sự thay đổi.
```

```
create : khởi tạo vue instance và biên dịch có data, compouted,..  < chưa tương tác được với DOM >
mounted : instance đã được mount. < tương tác được với DOM >
update : cập nhật componet khi dữ liệu thay đổi và yêu cầu cập hật dom
destroy : khi instance bj hủy bỏ
```

Directive là các thuộc tính đặc biệt mà Vuejs sử dụng được bắt đầu bằng v- và được gán cho giá trị là biểu thức javascript trừ v-for
