export interface AppSettings {
  hotlicensekey: any;
  menuMode?: 'horizontal' | 'popup' | 'overlay' |'static';
  dir?: 'ltr' | 'rtl';
  language?: string;
  menuActive?: boolean;
  topbarMenuActive?: boolean;
}

export const defaults: AppSettings = {
  menuMode: 'horizontal',
  menuActive: true,
  topbarMenuActive: false,
  hotlicensekey: undefined
};
