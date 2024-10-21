# install dependencies
npm i

# start app
npx react-native start --reset-cache --port=8082

# run-android
npx react-native run-android --port=8082

# Check error environment
npx react-native doctor

# Giải thích folder

- android: file gradle build 

- components: chứa các components

- pages: chứa các pages chính với nhiều component (Bên trong mỗi page phải truyền props là {navigation} để có thể chuyển trang)

- Sau khi thêm pages mới, thêm vào file App.js một Stack Screen mới:
`<Stack.Screen name="Home" component={Home} />`