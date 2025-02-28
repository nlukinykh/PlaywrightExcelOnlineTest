export interface TestConfig {
  credentials: {
    email: string;
    password: string;
  };
  urls: {
    login: string;
    excelOnline: string;
  };
  timeouts: {
    navigation: number;
    element: number;
  };
}

export const config: TestConfig = {
  credentials: {
    email: process.env.EXCEL_EMAIL || "test@example.com",
    password: process.env.EXCEL_PASSWORD || "password123",
  },
  urls: {
    login: "https://www.office.com/login",
    excelOnline: "https://www.office.com/launch/excel",
  },
  timeouts: {
    navigation: 30000,
    element: 5000,
  },
};
