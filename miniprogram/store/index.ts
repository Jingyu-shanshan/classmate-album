type Listener = () => void;

class Store {
  private state: any;
  private listeners: Listener[] = [];

  constructor(initialState: any) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }
}

// 创建全局状态
const initialState = {
  userInfo: null,
  isLoggedIn: false,
  theme: 'light',
};

export const store = new Store(initialState); 