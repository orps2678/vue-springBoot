import { createRouter, createWebHistory } from 'vue-router';
import PermissionsComponent from '../components/PermissionsComponent.vue';
import UsersComponent from '../components/UsersComponent.vue';
import DevicesComponent from '../components/DevicesComponent.vue';
import PushNotificationsComponent from '../components/PushNotificationsComponent.vue';
import SystemSettingsComponent from '../components/SystemSettingsComponent.vue';
import PermissionsFeature1 from '../components/permissions/PermissionsFeature1.vue';
import PermissionsFeature2 from '../components/permissions/PermissionsFeature2.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/permissions', component: PermissionsComponent },
      { path: '/users', component: UsersComponent },
      { path: '/devices', component: DevicesComponent },
      { path: '/push-notifications', component: PushNotificationsComponent },
      { path: '/system-settings', component: SystemSettingsComponent },
      { path: '/permissions/feature1', component: PermissionsFeature1 },
      { path: '/permissions/feature2', component: PermissionsFeature2 },
    ]
  });

export default router;

