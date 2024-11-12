import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.funbox.app',
  appName: 'FunBox',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    ScreenOrientation: {
      lockOrientation: 'portrait'
    }
  }
};

export default config;