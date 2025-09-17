export interface IOnlyOfficeConfig {
  document: {
    fileType: string; // masalan: "docx"
    title: string; // hujjat nomi
    key: string; // unikal hujjat kaliti
    url: string; // yuklab olish uchun URL
  };
  documentType: string; // masalan: "word"
  permissions: {
    download: boolean;
    print: boolean;
    edit: boolean;
  };
  editorConfig: {
    callbackUrl: string; // callback API manzili
    mode: string; // "edit" yoki "view"
    user: {
      name: string; // foydalanuvchi nomi yoki ID
      id: string; // foydalanuvchi ID
    };
  };
  token: string; // JWT token
  onlyofficeApiJs: string; // api.js manzili
}
