interface ICertificateSubject {
  ST: string;
  UID: string;
  SURNAME: string;
  C: string;
  T: string;
  "1.2.860.3.16.1.2": string;
  CN: string;
  L: string;
  "1.2.860.3.16.1.1": string;
  Name: string;
  O: string;
}

interface ISigner {
  serialNumber: string;
  X500Name: string;
  subjectName: ICertificateSubject;
  validFrom: string;
  validTo: string;
}

export interface ITimestamp {
  pkcs7b64: string;
  timestampedSignerList: ISigner[];
  status: number;
  message: string;
}
