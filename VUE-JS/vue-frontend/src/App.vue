<template>
  <div id="app">
    <Employee>
      <router-view></router-view>
    </Employee>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Employee from './components/Employee.vue';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDHPB1GbwogpJVVjCDAmvSp2gtJ33QAwKo",
  authDomain: "tglpushtest.firebaseapp.com",
  projectId: "tglpushtest",
  storageBucket: "tglpushtest.appspot.com",
  messagingSenderId: "522978062641",
  appId: "1:522978062641:web:a85b496da1bcb56df8c010",
  measurementId: "G-FWR708X5YY"
};

// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

getToken(messaging, { vapidKey: 'BD5OfQqXb83MYhYn5PN80ckHsqonBuPSMQAy-3Uk3pbt5HZNv-Z_lAvChMijJ1sPbIbnkPU4mSEI6TEwaMzxIrY' }).then((currentToken) => {
  if (currentToken) {
    console.log('Token is:', currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

export default {
  name: 'App',
  components: {
    Employee
  },
  setup() {
    onMounted(() => {
      // 在这里处理与 Firebase 无关的逻辑
      // 这里是在组件挂载后执行的代码
      async function requestUserPermission() {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          // 在这里处理通知权限被授予的逻辑
          console.log('User granted permission for notifications');
        } else {
          // 在这里处理通知权限未被授予的逻辑
          console.warn('User didn\'t grant permission for notifications');
        }
      }

      requestUserPermission();

      // 在这里监听来自 Firebase Messaging 的消息
      // 并进行相应的处理
      // 注意：此部分已经被移除，因为与 Firebase 相关的代码已经被移除

    });
  }
}
</script>

<style>
/* ... your styles ... */
</style>
