export interface CustomFabProps {
  start: Function
}

export interface QRCodeListProps {

}

export interface QRCodeListProps {
  codes: []
  pageRef: any
}

export interface QRCodeModalProps {
  dismiss: any, 
  code: any
}

export interface QRCodeScannedModalProps {
  dismiss: any
  code: any
  set: any
  scan: any
}

export interface QRWebModalProps {
  dismiss: any
  set: any
  scan: any
  error: any
  close: any
}