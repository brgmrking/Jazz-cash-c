
export type TransactionType = 'SENT' | 'RECEIVED' | 'BILL' | 'LOAD';
export type TransactionStatus = 'SUCCESS' | 'FAILED' | 'PENDING';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  time: string;
  icon: string;
  recipientNumber?: string;
  status: TransactionStatus;
}

export interface User {
  phoneNumber: string;
  name: string;
  balance: number;
  isBalanceVisible: boolean;
  points: number;
  isAdmin: boolean;
  status: 'ACTIVE' | 'FROZEN';
}

export enum AppScreen {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  SEND_MONEY = 'SEND_MONEY',
  RECEIVE_MONEY = 'RECEIVE_MONEY',
  BILL_PAYMENT = 'BILL_PAYMENT',
  MOBILE_LOAD = 'MOBILE_LOAD',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE',
  SUCCESS = 'SUCCESS',
  SCAN_QR = 'SCAN_QR',
  MORE_SERVICES = 'MORE_SERVICES',
  REWARDS = 'REWARDS',
  ADMIN_PANEL = 'ADMIN_PANEL'
}
